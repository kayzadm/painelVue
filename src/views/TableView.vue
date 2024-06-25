<template>
  <AppTemplate>
    <AppNavbar />
    <div class="cardTable">
      <table class="dataTable">
        <ConfirmationModal
          v-if="isModalVisible"
          :isVisible="isModalVisible"
          message="Você tem certeza que deseja deletar esta aula?"
          @confirm="deleteLesson"
          @cancel="hideModal"
        />
        <thead>
          <tr>
            <th>Nome do Curso</th>
            <th>Nome da Aula</th>
            <th>Número da Aula</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lesson in paginatedAulas()" :key="lesson.id">
            <td>{{ lesson.courseName }}</td>
            <td>{{ lesson.name }}</td>
            <td>{{ lesson.sequence }}</td>
            <td>{{ lesson.information }}</td>
            <td>
              <router-link to="/edit" class="editBtn"
                >Editar
                <font-awesome-icon
                  :icon="['fas', 'pen']"
                  class="iconSideBar"
                  style="font-size: 12px; margin-left: 3px"
                />
              </router-link>
              <button @click="showModal(lesson.id)" :id="lesson.id" class="deleteBtn">
                Deletar
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  class="iconSideBar"
                  style="font-size: 12px; margin-left: 3px"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages() }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages()">
          Próxima
        </button>
      </div>
    </div>
  </AppTemplate>
</template>

<script>
// @ is an alias to /src
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import AppNavbar from "@/components/AppNavbar.vue";
import AppTemplate from "./templates/AppTemplate.vue";
import axios from "axios";
import ConfirmationModal from "../components/popUp.vue";

export default {
  name: "TableView",
  components: {
    ConfirmationModal,
    AppNavbar,
    FontAwesomeIcon,
    AppTemplate,
  },
  data() {
    return {
      isModalVisible: false,
      lessons: [],
      itemsPerPage: 5,
      currentPage: 1,
      lessonID: null,
    };
  },
  computed: {},
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
    totalPages() {
      return Math.ceil(this.lessons.length / this.itemsPerPage);
    },
    paginatedAulas() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.lessons.slice(start, end);
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages()) {
        this.currentPage++;
      }
    },
    async fetchData() {
      try {
        var apiUrl = this.$apiUrl;
        const token = this.getCookie("token");

        // Fetch lessons
        const lessonsResponse = await axios.get(`${apiUrl}/lessons`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const lessons = lessonsResponse.data.lessons; // Assumindo que lessonsResponse.data é um array de lições

        // Fetch courses
        const coursesResponse = await axios.get(`${apiUrl}/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const courses = coursesResponse.data.courses; // Assumindo que coursesResponse.data é um array de cursos

        // Map course names to lessons
        const lessonsWithCourseName = lessons.map((lesson) => {
          const course = courses.find((course) => course.id === lesson.course_id);

          return {
            ...lesson,
            courseName: course ? course.name : "Unknown",
          };
        });

        this.lessons = lessonsWithCourseName;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    showModal(id) {
      this.lessonID = id;
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    async deleteLesson() {
      var apiUrl = this.$apiUrl;
      const token = this.getCookie("token");
      try {
        await axios.delete(`${apiUrl}/lessons/${this.lessonID}`, {
          headers: { Authorization: "Bearer " + token },
        });

        this.hideModal();
        this.lessons = this.lessons.filter((lesson) => lesson.id !== this.lessonID);
      } catch (error) {
        console.error("Erro ao deletar a aula:", error);
        alert("Falha ao deletar a aula.");
        this.hideModal();
      }
      this.hideModal();
    },
  },

  mounted() {
    this.fetchData();
  },
};
</script>
<style>
@import url("../assets/css/TableView.css");
</style>
