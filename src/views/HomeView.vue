<template>
  <AppTemplate>
    <AppNavbar />
    <div class="HomeCard">
      <div class="card">
        <div class="card-body">
          <div class="cardText">
            <p>Iniciar a criação do curso</p>
          </div>
          <div class="cardBtn">
            <button>
              <router-link to="/create" exact>
                <span v-if="!isActive">Crie seu curso</span>
              </router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </AppTemplate>
</template>

<script>
// @ is an alias to /src
import AppNavbar from "@/components/AppNavbar.vue";
import AppTemplate from "./templates/AppTemplate.vue";

export default {
  name: "HomeView",
  components: {
    AppNavbar,
    AppTemplate,
  },
};
</script>
<style>
@import url("../assets/css/HomeView.css");
</style>
