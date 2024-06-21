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
            <th>Nome do Autor</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aula in paginatedAulas" :key="aula.id">
            <td>{{ aula.nomeCurso }}</td>
            <td>{{ aula.nomeAula }}</td>
            <td>{{ aula.numeroAula }}</td>
            <td>{{ aula.nomeAutor }}</td>
            <td>{{ aula.descricao }}</td>
            <td>
              <button @click="editarAula(aula.id)">Editar</button>
              <button @click="deletarAula(aula.id)">Deletar</button>
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
import AppNavbar from "@/components/AppNavbar.vue";
import AppTemplate from "./templates/AppTemplate.vue";

export default {
  name: "TableView",
  components: {
    AppNavbar,
    AppTemplate,
  },
  data() {
    return {
      aulas: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.aulas.length / this.itemsPerPage);
    },
    paginatedAulas() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.aulas.slice(start, end);
    },
  },
  methods: {
    fetchAulas() {
      fetch("/api/aulas")
        .then((response) => response.json())
        .then((data) => {
          this.aulas = data;
        });
    },
    editarAula(id) {
      console.log(`Editar aula com ID: ${id}`);
    },
    deletarAula(id) {
      console.log(`Deletar aula com ID: ${id}`);
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  mounted() {
    this.fetchAulas();
  },
};
</script>
<style>
@import url("../assets/css/TableView.css");
</style>
