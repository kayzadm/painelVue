<template>
  <AppTemplate>
    <AppNavbar />
    <div class="cardArea">
      <AppMensagens :msg="msg" v-show="msg" :msgType="msgType" />
      <div class="card">
        <div class="subTitle">
          <font-awesome-icon :icon="['fas', 'pen']" class="iconSideBar" />
          <h4>Editar</h4>
        </div>
        <h1>Categorias</h1>
        <form @submit.prevent="createProduct">
          <div class="form-group">
            <div class="selectArea">
              <label for="SelectCategory">Nome da categoria</label>
              <select
                name="SelectCategory"
                class="form-select focus-custom"
                data-style="btn-primary"
                v-model="selectFormEdit"
              >
                <option :value="0" disabled selected>
                  Qual categoria gostaria de editar?
                </option>
                <option
                  v-for="categoriaEdit in categoriasEdit"
                  :key="categoriaEdit.id"
                  :value="categoriaEdit.id"
                >
                  {{ categoriaEdit.name }}
                </option>
              </select>
            </div>
            <div class="Course">
              <label for="nome">Nome da categoria</label>
              <input
                type="text"
                id="nameCategoryEdit"
                placeholder="Novo nome"
                name="nome"
                v-model="categoryNameEdit"
                :disabled="isCategorySelected"
              />
            </div>
            <div class="CourseBtn">
              <button
                class="btn mr-1"
                @click="submitButtonCategoriesEdit"
                :disabled="isCategorySelected"
              >
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="card">
        <h1>Cursos</h1>
        <form @submit.prevent="createProduct">
          <div class="form-group">
            <div class="selectArea">
              <label for="SelectCategory">Escolha um Curso</label>
              <select
                name="SelectCategory"
                class="form-select focus-custom"
                data-style="btn-primary"
                v-model="selectedCourseEdit"
                @change="handleCourseChangeEdit()"
              >
                <option :value="0" disabled selected>
                  Qual curso gostaria de editar?
                </option>
                <option
                  v-for="courseEdit in coursesEdit"
                  :key="courseEdit.id"
                  :value="courseEdit.id"
                >
                  {{ courseEdit.name }}
                </option>
              </select>
            </div>
            <!-- <div class="Course image" id="fileInputWrapper">
              <label for="Image">Imagem do curso</label>
              <label
                for="fileInput"
                class="file-input-wrapper"
                :style="{ backgroundImage: 'url(' + previewSrc + ')' }"
              >
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  @change="handleCourseChange"
                />
              </label>
            </div> -->
            <div class="Course">
              <label for="nome">Nome do curso</label>
              <input
                class="inputCourseEdit"
                type="text"
                placeholder="Nome"
                name="nome"
                v-model="nameCourseEdit"
                :disabled="isCourseSelected"
              />
            </div>
            <div class="Course">
              <label for="description">Descrição do curso</label>
              <textarea
                class="inputCourseEdit"
                type="text"
                name="description"
                placeholder="Ex: Curso voltado para .........."
                v-model="descriptionCourseEdit"
                :disabled="isCourseSelected"
                @input="updateCharCount('descriptionCourseEdit')"
                maxlength="255"
              />
              <p>{{charCourseEdit}}/{{maxLengthCourseEdit}}</p>
            </div>
            <div class="Course">
              <label for="Author">Autor do curso</label>
              <input
                class="inputCourseEdit"
                type="text"
                name="Author"
                placeholder="Nome do autor"
                v-model="authorCourseEdit"
                :disabled="isCourseSelected"
              />
            </div>
            <div class="CourseBtn">
              <button
                class="btn mr-1 inputCourseEdit"
                @click="submitButtonCoursesEdit"
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
                v-model="lessonFormSelectEdit"
                @change="handlLessonsChangeEdit"
              >
                <option :value="0" disabled selected>
                  Escolha o curso que deseja adicionar uma aula
                </option>
                <option
                  v-for="lessonEdit in lessonsEdit"
                  :key="lessonEdit.id"
                  :value="lessonEdit.id"
                >
                  {{ lessonEdit.name }}
                </option>
              </select>
            </div>
            <div class="Course">
              <!-- <label for="videoInput">Video da aula</label>
              <div class="LessonsFile">
                <input
                  class="form-control file-custom"
                  type="file"
                  name="videoInput"
                  id="videoInput"
                  accept="video/*"
                  @change="handleLessonsChange"
                />
                <video v-if="videoUrl" :src="videoUrl" controls>
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              </div> -->
              <label for="nome">Nome da aula</label>
              <input
                class="inputLessonEdit"
                type="text"
                placeholder="Nome"
                name="nome"
                v-model="nameLessonsEdit"
                :disabled="isLessonsSelected"
              />
            </div>
            <div class="Course">
              <label for="description">Descrição da aula</label>
              <textarea
                class="inputLessonEdit"
                type="text"
                name="description"
                placeholder="Ex: Essa aula fala sobre..........."
                v-model="informationLessonsEdit"
                :disabled="isLessonsSelected"
                @input="updateCharCount('informationLessonsEdit')"
                maxlength="2000"
              />
              <p>{{charLessonsEdit}}/{{maxLengthLessonsEdit}}</p>
            </div>
            <div class="Course">
              <label for="Author">Número da aula</label>
              <input
                class="inputLessonEdit"
                type="number"
                name="Author"
                placeholder="Numero de sequencia"
                v-model="sequenceLessonsEdit"
                :disabled="isLessonsSelected"
              />
            </div>

            <div class="CourseBtn">
              <button
                class="btn mr-1 inputLessonEdit"
                @click="submitButtonLessonsEdit"
                :disabled="isLessonsSelected"
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
  name: "EditView",
  components: {
    FontAwesomeIcon,
    AppNavbar,
    AppTemplate,
    AppMensagens,
  },
  data() {
    return {
      authorCourseEdit: null,
      descriptionCourseEdit: null,
      nameLessonsEdit: null,
      sequenceLessonsEdit: null,
      informationLessonsEdit: null,
      msg: "",
      msgType: "",
      nameCourseEdit: null,
      faUserSecret: faUserSecret,
      previewSrc: "",
      videoUrl: null,
      categoriasEdit: [],
      lessonFormSelectEdit: 0,
      selectFormEdit: 0,
      selectedCourseEdit: 0,
      categoryNameEdit: null,
      coursesEdit: [],
      lessonsEdit: [],
      courseDescriptionEdit: '',
      charCourseEdit: 0,
      maxLengthCourseEdit: 255,
      lessonsInformationEdit: '',
      charLessonsEdit: 0,
      maxLengthLessonsEdit: 2000
    };
  },
  computed: {
    isCategorySelected() {
      return this.selectFormEdit === 0;
    },
    isCourseSelected() {
      return this.selectedCourseEdit === 0;
    },
    isLessonsSelected() {
      return this.lessonFormSelectEdit === 0;
    },
  },
  watch: {
    descriptionCourseEdit(newVal) {
      this.charCourseEdit = newVal.length;
    },
    informationLessonsEdit(newVal) {
      this.charLessonsEdit = newVal.length;
    }
  },
  mounted() {
    document.title = 'EDITAR'
    this.buscarCategoriasEdit();
    this.buscarCursosEdit();
    this.buscarLessonsEdit();
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    updateCharCount(field) {
      if (field === 'descriptionCourseEdit') {
        if (this.descriptionCourseEdit.length > this.maxLengthCourseEdit) {
          this.descriptionCourseEdit = this.descriptionCourseEdit.substring(0, this.maxLengthCourseEdit);
        }
      } else if (field === 'informationLessonsEdit') {
        if (this.informationLessonsEdit.length > this.maxLengthLessonsEdit) {
          this.informationLessonsEdit = this.informationLessonsEdit.substring(0, this.maxLengthLessonsEdit);
        }
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleCourseChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    handleLessonsChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.videoUrl = URL.createObjectURL(file);
      }
    },
    async submitButtonCategoriesEdit() {
      try {
        const token = this.getCookie("token");
        document.getElementById("nameCategoryEdit").disabled = true;
        var apiUrl = this.$apiUrl;
        
        // const token = localStorage.getItem("token");
        const data = {
          name: this.categoryNameEdit,
        };
        const id = this.selectFormEdit;
        
        const response = await axios.put(`${apiUrl}/categories/${id}`, data, {
          headers: { Authorization: "Bearer " + token },
        });
        if (response.data.errors) {
          this.msgType = "danger";
          this.msg = "";
          for (const [field, messages] of Object.entries(response.data.errors)) {
            this.msg += `${field}: ${messages.join(", ")}\n`;
          }
          document.getElementById("nameCategoryEdit").disabled = false;
          setTimeout(() => {
            this.msg = "";
          }, 3000);
        } else {
          if (response.data.success) {
            this.msgType = "success";
            this.msg = response.data.success;

            setTimeout(() => {
              this.msg = "";
              this.msgType = "";
              window.location.reload(true);
            }, 3000);
          }
        }
      } catch (error) {
        console.error("Erro ao enviar PUT:", error);
        if (error) {
          this.msgType = "danger";
          this.msg = "";
          this.msg += error;

          setTimeout(() => {
            this.msg = "";
          }, 5000);
        }
      } finally {
        document.getElementById("nameCategoryEdit").disabled = false;
      }
    },
    async submitButtonCoursesEdit() {
      try {
        const inputCourseEdit = document.querySelectorAll(".inputCourseEdit");
        inputCourseEdit.forEach((inputCoursesEdit) => {
          inputCoursesEdit.disabled = true;
        });
        var apiUrl = this.$apiUrl;
        const token = this.getCookie("token");
        // const token = localStorage.getItem("token");

        const idCourse = this.selectedCourseEdit;
        const data = {
          name: this.nameCourseEdit,
          description: this.descriptionCourseEdit,
          author: this.authorCourseEdit,
        };
        
        const response = await axios.put(`${apiUrl}/courses/${idCourse}`, data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (response.data.errors) {
          this.msgType = "danger";
          this.msg = "";
          for (const [field, messages] of Object.entries(response.data.errors)) {
            this.msg += `${field}: ${messages.join(", ")}\n`;
          }
          inputCourseEdit.forEach((inputCoursesEdit) => {
            inputCoursesEdit.disabled = false;
          });
          setTimeout(() => {
            this.msg = "";
          }, 3000);
        } else {
          if (response.data.success) {
            this.msgType = "success";
            this.msg = response.data.success;

            setTimeout(() => {
              this.msg = "";
              this.msgType = "";
              window.location.reload(true);
            }, 3000);
          }
        }
      } catch (error) {
        console.error("Erro ao criar curso:", error);
        if (error) {
          this.msgType = "danger";
          this.msg = "";
          this.msg += error;

          setTimeout(() => {
            this.msg = "";
          }, 5000);
        }
      } finally {
        const inputCourseEdit = document.querySelectorAll(".inputCourseEdit");
        inputCourseEdit.forEach((inputCoursesEdit) => {
          inputCoursesEdit.disabled = false;
        });
      }
    },
    async submitButtonLessonsEdit() {
      
      try {
        const inputLessonEdit = document.querySelectorAll(".inputLessonEdit");
        inputLessonEdit.forEach((inputLessonsEdit) => {
          inputLessonsEdit.disabled = true;
        });
        var apiUrl = this.$apiUrl;
        const token = this.getCookie("token");
        // const token = localStorage.getItem("token");
        const idLessons = this.lessonFormSelectEdit;
        const data = {
          name: this.nameLessonsEdit,
          information: this.informationLessonsEdit,
          sequence: this.sequenceLessonsEdit,
        };
        
        const response = await axios.put(`${apiUrl}/lessons/${idLessons}`, data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (response.data.errors) {
          this.msgType = "danger";
          this.msg = "";
          for (const [field, messages] of Object.entries(response.data.errors)) {
            this.msg += `${field}: ${messages.join(", ")}\n`;
          }
          inputLessonEdit.forEach((inputLessonsEdit) => {
          inputLessonsEdit.disabled = false;
        });
          setTimeout(() => {
            this.msg = "";
          }, 3000);
        } else {
          if (response.data.success) {
            this.msgType = "success";
            this.msg = response.data.success;

            setTimeout(() => {
              this.msg = "";
              this.msgType = "";
              window.location.reload(true);
            }, 2000);
          }
        }
      } catch (error) {
        console.error("Erro ao criar curso:", error);
        if (error) {
          this.msgType = "danger";
          this.msg = "";
          this.msg += error;

          setTimeout(() => {
            this.msg = "";
          }, 5000);
        }
      } finally {
        const inputLessonEdit = document.querySelectorAll(".inputLessonEdit");
        inputLessonEdit.forEach((inputLessonsEdit) => {
          inputLessonsEdit.disabled = false;
        });
      }
    },

    async buscarCategoriasEdit() {
      var apiUrl = this.$apiUrl;
      // const token = localStorage.getItem("token");
      const token = this.getCookie('token');
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      try {
        const resposta = await axios.get(`${apiUrl}/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.categoriasEdit = resposta.data;
      } catch (erro) {
        console.error("Houve um erro ao buscar as categorias:", erro);
      }
    },
    async buscarCursosEdit() {
      const token = this.getCookie('token');
      var apiUrl = this.$apiUrl;
      // const token = localStorage.getItem("token");
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
          this.coursesEdit = resposta.data.courses;
        } else {
          console.error("Resposta de cursos não é um array:", resposta);
        }
      } catch (erro) {
        console.error("Houve um erro ao buscar os cursos:", erro);
      }
    },
    handleCourseChangeEdit() {
      const selectedCourseEdit = this.coursesEdit.find(
        (courseEdit) => courseEdit.id === this.selectedCourseEdit
      );
      if (selectedCourseEdit) {
        this.nameCourseEdit = selectedCourseEdit.name;
        this.descriptionCourseEdit = selectedCourseEdit.description;
        this.authorCourseEdit = selectedCourseEdit.author;
      }
    },
    async buscarLessonsEdit() {
      const token = this.getCookie('token');
      var apiUrl = this.$apiUrl;
      // const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }
      try {
        const resposta = await axios.get(`${apiUrl}/lessons`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.lessonsEdit = resposta.data.lessons;
      } catch (erro) {
        console.error("Houve um erro ao buscar os cursos:", erro);
      }
    },
    handlLessonsChangeEdit() {
      const lessonFormSelectEdit = this.lessonsEdit.find(
        (lessonEdit) => lessonEdit.id === this.lessonFormSelectEdit
      );
      if (lessonFormSelectEdit) {
        this.nameLessonsEdit = lessonFormSelectEdit.name;
        this.sequenceLessonsEdit = lessonFormSelectEdit.sequence;
        this.informationLessonsEdit = lessonFormSelectEdit.information;
      }
    },
  },
};
</script>
<style>
@import url("../assets/css/CreateView.css");
</style>
