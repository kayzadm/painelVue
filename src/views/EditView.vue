<template>
  <AppTemplate>
    <AppNavbar />
    <div class="cardArea">
      <div class="card">
        <div class="subTitle">
          <font-awesome-icon :icon="['fas', 'pen']" class="iconSideBar" />
          <h4>Editar</h4>
        </div>
        <h1>Cursos </h1>
        <form @submit.prevent="createProduct">
          <div class="form-group">
            <div class="selectArea">
              <label for="SelectCategory">Escolha um Curso</label>
              <select
                name="SelectCategory"
                class="form-select focus-custom"
                data-style="btn-primary">
                <option value="" disabled selected>Qual curso gostaria de editar?</option>
              </select>
            </div>
            <div class="Course">
              <label for="nome" >Nome do curso</label>
              <input type="text" placeholder="Nome" name="nome" />
            </div>
            <div class="Course">
              <label for="description">Descrição do curso</label>
              <textarea type="text" name="description" placeholder="Ex: Curso voltado para .........."/>
            </div>
            <div class="Course">
              <label for="Author" >Autor do curso</label>
              <input type="text" name="Author" placeholder="Nome do autor" />
            </div>
            <div class="Course">
              <label for="Image">Imagem do curso</label>
              <input class="form-control file-custom" type="file" name="Image" />
            </div>
            <div class="CourseBtn">
              <button class="btn  mr-1">
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
                data-style="btn-primary">
                <option value="" disabled selected>Escolha o curso que deseja adicionar uma aula</option>
              </select>
            </div>
            <div class="Course">
              <label for="nome" >Nome da aula</label>
              <input type="text" placeholder="Nome" name="nome" />
            </div>
            <div class="Course">
              <label for="description">Descrição da aula</label>
              <textarea type="text" name="description" placeholder="Ex: Essa aula fala sobre..........."/>
            </div>
            <div class="Course">
              <label for="Author" >Número da aula</label>
              <input type="number" name="Author" placeholder="Numero de sequencia"/>
            </div>
            <div class="Course">
              <label for="Image">Video da aula</label>
              <input class="form-control file-custom" type="file" name="Image"/>
            </div>
            <div class="CourseBtn">
              <button class="btn  mr-1">
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
import AppNavbar from "@/components/AppNavbar.vue";
import AppTemplate from "./templates/AppTemplate.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "EditView",
  components: {
    FontAwesomeIcon,
    AppNavbar,
    AppTemplate,
  },
  data() {
    return {
      faUserSecret: faUserSecret,
    }
  }
};
</script>
<style>
@import url("../assets/css/CreateView.css");
</style>
