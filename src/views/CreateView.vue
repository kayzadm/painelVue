<template>
  <AppTemplate>
    <AppNavbar />
    <div class="cardArea">
      <AppMensagens :msg="msg" v-show="msg" :msgType="msgType" />
      <div class="card">
        <div class="subTitle">
          <font-awesome-icon :icon="['fas', 'plus']" class="iconSideBar" />
          <h4>Criar</h4>
        </div>
        <h1>Categorias</h1>
        <form @submit.prevent="createProduct">
          <div class="form-group">
            <div class="Course">
              <label for="nomeCategoria">Nome da categoria</label>
              <input
                id="nameCategory"
                type="text"
                placeholder="Nome da categoria"
                name="nomeCategoria"
                v-model="categoryName"
              />
            </div>
            <div class="CourseBtn">
              <button class="btn mr-1" @click="submitCategory">Enviar</button>
            </div>
          </div>
        </form>
      </div>
      <div class="card">
        <h1>Cursos</h1>
        <form @submit.prevent="createProduct">
          <div class="form-group">
            <div class="selectArea">
              <label for="SelectCategory">Escolha uma categoria</label>
              <select
                name="SelectCategory"
                class="form-select focus-custom"
                data-style="btn-primary"
                v-model="selectForm"
              >
                <option :value="0" disabled selected>
                  Qual é a categoria do seu curso?
                </option>
                <option
                  v-for="categoria in categorias"
                  :key="categoria.id"
                  :value="categoria.id"
                >
                  {{ categoria.name }}
                </option>
              </select>
            </div>
            <div class="Course image" id="fileInputWrapper">
              <label for="Image">Imagem do curso</label>
              <label
                for="fileInput"
                class="file-input-wrapper"
                :style="{ backgroundImage: 'url(' + previewSrc + ')' }"
              >
                <input
                  class="inputCourse"
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  @change="handleCourseChange"
                  :disabled="isCourseSelected"
                />
              </label>
            </div>
            <div class="Course">
              <label for="nome">Nome do curso</label>
              <input
                class="inputCourse"
                type="text"
                placeholder="Nome"
                name="nome"
                v-model="nameCourse"
                :disabled="isCourseSelected"
              />
            </div>
            <div class="Course">
              <label for="description">Descrição do curso</label>
              <textarea
                class="inputCourse"
                type="text"
                name="description"
                placeholder="Ex: Curso voltado para .........."
                v-model="descriptionCourse"
                :disabled="isCourseSelected"
                @input="updateCharCount('descriptionCourse')"
                maxlength="255"
              />
              <p>{{charCourse}}/{{maxLengthCourse}}</p>
            </div>
            <div class="Course">
              <label for="Author">Autor do curso</label>
              <input
                class="inputCourse"
                type="text"
                name="Author"
                placeholder="Nome do autor"
                v-model="authorCourse"
                :disabled="isCourseSelected"
              />
            </div>
            <div class="CourseBtn">
              <button
                class="btn mr-1 inputCourse"
                @click="submitButtonCourses"
                :disabled="isCourseSelected"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="card">
        <h1>Aulas</h1>
        <form @submit.prevent="createProduct">
          <div class="form-group">
            <div class="selectArea">
              <label for="SelectCategory">Escolha um curso</label>
              <select
                name="SelectCategory"
                class="form-select focus-custom"
                data-style="btn-primary"
                v-model="selectedCourse"
              >
                <option :value="0" disabled selected>
                  Escolha o curso que deseja adicionar uma aula
                </option>
                <option v-for="course in courses" :key="course.id" :value="course.id">
                  {{ course.name }}
                </option>
              </select>
            </div>
            <div class="Course">
              <label for="videoInput">Video da aula</label>
              <div class="LessonsFile">
                <input
                  class="form-control file-custom inputLesson"
                  type="file"
                  name="videoInput"
                  id="videoInput"
                  accept="video/*"
                  @change="handleLessonsChange"
                  :disabled="isLessonSelected"
                />
                <video v-if="videoUrl" :src="videoUrl" controls>
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              </div>
              <label for="nome">Nome da aula</label>
              <input
                class="inputLesson"
                type="text"
                placeholder="Nome"
                name="nome"
                v-model="nameLessons"
                :disabled="isLessonSelected"
              />
            </div>
            <div class="Course">
              <label for="description">Descrição da aula</label>
              <textarea
                class="inputLesson"
                type="text"
                name="description"
                placeholder="Ex: Essa aula fala sobre..........."
                v-model="lessonsInformation"
                :disabled="isLessonSelected"
                @input="updateCharCount('informationLessons')"
                maxlength="2000"
              />
              <p>{{charLessons}}/{{maxLengthLessons}}</p>
            </div>
            <div class="Course">
              <label for="Author">Número da aula</label>
              <input
                class="inputLesson"
                type="number"
                name="Author"
                placeholder="Numero de sequencia"
                v-model="sequenceLessons"
                :disabled="isLessonSelected"
              />
            </div>

            <div class="CourseBtn">
              <button
                class="btn mr-1 inputLesson"
                @click="submitButtonLessons"
                :disabled="isLessonSelected"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </AppTemplate>
</template>
<script>
// @ is an alias to /src
import AppMensagens from "@/components/AppMensagens.vue";
import AppNavbar from "@/components/AppNavbar.vue";
import AppTemplate from "./templates/AppTemplate.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default {
  name: "CourseView",
  components: {
    FontAwesomeIcon,
    AppNavbar,
    AppTemplate,
    AppMensagens,
  },
  data() {
    return {
      nameCourse: null,
      descriptionCourse: null,
      authorCourse: null,
      imageCourse: null,
      categorias: [],
      courses: [],
      selectForm: 0,
      faUserSecret: faUserSecret,
      previewSrc: "",
      videoUrl: null,
      msg: "",
      msgType: "",
      categoryName: null,
      fileLessons: null,
      selectedCourse: 0,
      nameLessons: null,
      lessonsInformation: null,
      sequenceLessons: null,
      courseDescription: "",
      charCourse: 0,
      maxLengthCourse: 255,
      charLessons: 0,
      maxLengthLessons: 2000,
    };
  },
  computed: {
    isCourseSelected() {
      return this.selectForm === 0;
    },
    isLessonSelected() {
      return this.selectedCourse === 0;
    },
  },
  watch: {
    descriptionCourse(newVal) {
      this.charCourse = newVal.length;
    },
    lessonsInformation(newVal) {
      this.charLessons = newVal.length;
    },
  },
  mounted() {
    document.title = 'CRIAR'
    this.buscarCategorias();
    this.buscarCursos();
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    updateCharCount(field) {
      if (field === "descriptionCourse") {
        if (this.descriptionCourse.length > this.maxLengthCourse) {
          this.descriptionCourse = this.descriptionCourse.substring(
            0,
            this.maxLengthCourse
          );
        }
      } else if (field === "lessonsInformation") {
        if (this.lessonsInformation.length > this.maxLengthLessons) {
          this.lessonsInformation = this.lessonsInformation.substring(
            0,
            this.maxLengthLessons
          );
        }
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    async submitCategory() {
      try {
        document.getElementById("nameCategory").disabled = true;
        var apiUrl = this.$apiUrl;
        const token = this.getCookie("token");
        const data = {
          name: this.categoryName,
          active: 1,
        };
        const response = await axios.post(`${apiUrl}/categories`, data, {
          headers: { Authorization: "Bearer " + token },
        });
        if (response.data.errors) {
          this.msgType = "danger";
          this.msg = "";
          for (const [field, messages] of Object.entries(response.data.errors)) {
            this.msg += `${field}: ${messages.join(", ")}\n`;
          }
          document.getElementById("nameCategory").disabled = false;
          setTimeout(() => {
            this.msg = "";
          }, 5000);
        } else {
          if (response.data.success) {
            this.msgType = "success";
            this.msg += response.data.success;
            setTimeout(() => {
              this.msg = "";
              this.msgType = "";
              window.location.reload(true);
            }, 3000);
          }
        }
      } catch (error) {
        console.error("Erro ao enviar POST:", error);
        if (error) {
          this.msgType = "danger";
          this.msg = "";
          this.msg += error;

          setTimeout(() => {
            this.msg = "";
          }, 5000);
        }
      } finally {
        document.getElementById("nameCategory").disabled = false;
      }
    },
    handleCourseChange(event) {
      this.imageCourse = event.target.files[0];
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async submitButtonCourses() {
      // const token = this.getCookie('token');
      try {
        const inputCourse = document.querySelectorAll(".inputCourse");
        inputCourse.forEach((inputCourses) => {
          inputCourses.disabled = true;
        });
        var apiUrl = this.$apiUrl;
        const token = this.getCookie("token");
        const formData = new FormData();
        formData.append("category_id", this.selectForm);
        formData.append("name", this.nameCourse);
        formData.append("description", this.descriptionCourse);
        formData.append("author", this.authorCourse);
        formData.append("image", this.imageCourse);

        const response = await axios.post(`${apiUrl}/courses`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        });
        if (response.data.errors) {
          this.msgType = "danger";
          this.msg = "";
          for (const [field, messages] of Object.entries(response.data.errors)) {
            this.msg += `${field}: ${messages.join(", ")}\n`;
          }
          inputCourse.forEach((inputCourses) => {
            inputCourses.disabled = false;
          });
          setTimeout(() => {
            this.msg = "";
          }, 5000);
        } else {
          if (response.data.success) {
            this.msgType = "success";
            this.msg += response.data.success;
            setTimeout(() => {
              this.msg = "";
              this.msgType = "";
              window.location.reload(true);
            }, 3000);
          }
        }
      } catch (error) {
        console.error("Erro ao enviar POST:", error);
        if (error) {
          this.msgType = "danger";
          this.msg = "";
          this.msg += error;

          setTimeout(() => {
            this.msg = "";
          }, 5000);
        }
      } finally {
        const inputCourse = document.querySelectorAll(".inputCourse");
        inputCourse.forEach((inputCourses) => {
          inputCourses.disabled = false;
        });
      }
    },
    handleLessonsChange(event) {
      this.fileLessons = event.target.files[0];
      const file = event.target.files[0];
      if (file) {
        this.videoUrl = URL.createObjectURL(file);
      }
    },
    async submitButtonLessons() {
      // const token = this.getCookie('token');
      try {
        const inputLesson = document.querySelectorAll(".inputLesson");
        inputLesson.forEach((inputLessons) => {
          inputLessons.disabled = true;
        });
        var apiUrl = this.$apiUrl;
        const token = this.getCookie("token");
        const formData = new FormData();
        formData.append("course_id", this.selectedCourse);
        formData.append("name", this.nameLessons);
        formData.append("information", this.lessonsInformation);
        formData.append("sequence", this.sequenceLessons);
        formData.append("video", this.fileLessons);

        const response = await axios.post(`${apiUrl}/lessons`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        });
        if (response.data.errors) {
          this.msgType = "danger";
          this.msg = "";
          for (const [field, messages] of Object.entries(response.data.errors)) {
            this.msg += `${field}: ${messages.join(", ")}\n`;
          }
          inputLesson.forEach((inputLessons) => {
            inputLessons.disabled = false;
          });
          setTimeout(() => {
            this.msg = "";
          }, 3000);
        } else {
          // window.location.reload(true)
          if (response.data.success) {
            this.selectedCourse = 0;
            this.nameLessons = "";
            this.lessonsInformation = "";
            this.sequenceLessons = "";
            const fileInput = document.getElementById("videoInput");
            fileInput.type = "text";
            fileInput.type = "file";
            this.videoUrl = null;
            this.msgType = "success";
            this.msg = response.data.success;

            setTimeout(() => {
              this.msg = "";
              this.msgType = "";
            }, 3000);
          }
        }
      } catch (error) {
        console.error("Erro ao enviar POST:", error);
        if (error) {
          this.msgType = "danger";
          this.msg = "";
          this.msg += error;

          setTimeout(() => {
            this.msg = "";
          }, 5000);
        }
      } finally {
        const inputLesson = document.querySelectorAll(".inputLesson");
        inputLesson.forEach((inputLessons) => {
          inputLessons.disabled = false;
        });
      }
    },

    async buscarCategorias() {
      var apiUrl = this.$apiUrl;
      // const token = this.getCookie('token');
      const token = this.getCookie("token");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      try {
        const resposta = await axios.get(`${apiUrl}/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.categorias = resposta.data;
      } catch (erro) {
        console.error("Houve um erro ao buscar as categorias:", erro);
      }
    },
    async buscarCursos() {
      // const token = this.getCookie('token');
      var apiUrl = this.$apiUrl;
      const token = this.getCookie("token");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      try {
        const resposta = await axios.get(`${apiUrl}/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(resposta.data.courses)) {
          // console.log(resposta.data.courses)
          this.courses = resposta.data.courses;
        } else {
          console.error("Resposta de cursos não é um array:", resposta);
        }
      } catch (erro) {
        console.error("Houve um erro ao buscar os cursos:", erro);
      }
    },
  },
};
</script>
<style>
@import url("../assets/css/CreateView.css");
</style>
