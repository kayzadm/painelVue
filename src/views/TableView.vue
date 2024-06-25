<template>
  <AppTemplate>
    <AppNavbar />
    <div class="cardTable">
      <table class="dataTable">
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
          <tr v-for="lesson in paginatedAulas" :key="lesson.id">
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
              <router-link to="/" class="deleteBtn"
                >Deletar
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  class="iconSideBar"
                  style="font-size: 12px; margin-left: 3px"
              /></router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="pagination">
        <button @click="previousPage">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage">Próxima</button>
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

export default {
  name: "TableView",
  components: {
    AppNavbar,
    FontAwesomeIcon,
    AppTemplate,
  },
  data() {
    return {
      lessons: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.lessons.length / this.itemsPerPage);
    },
    paginatedAulas() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.lessons.slice(start, end);
    },
  },
  methods: {
    async fetchData() {
      try {
        var apiUrl = this.$apiUrl;
        const token = localStorage.getItem("token");

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
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style>
@import url("../assets/css/TableView.css");
</style>
