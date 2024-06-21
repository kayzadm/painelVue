<template>
  <ul class="Profile">
    <li class="dropdownProfile" @click="toggleDropdownProfile">
      <a href="#" class="dropbtnProfile" >
        <font-awesome-icon :icon="['fas', 'user']"/>
      </a>
      <div v-if="isDropdownOpen" class="profileMenu   ">
        <!-- <div class="nameProfile">Leo</div> -->
        <a href="" class="optionProfile">
          <font-awesome-icon :icon="['fas', 'user']"/>
          <span>Perfil</span>
        </a>
        <hr>
        <a href="" class="optionProfile text-danger">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']"/>
          <span>Logout</span>
        </a>
      </div>
    </li>
  </ul>
  <nav :class="{ active: isActive }">
    
    <div ref="sidebar" class="sidebar" :class="{ active: isActive }">
      <button class="menuBtn">
        <font-awesome-icon
          :icon="['fas', currentIcon]"
          class="menuIcon"
          @click="sideBarBtn"
        />
      </button>
      <div class="logo">
        <img :src="logoSrc" alt="logo" :class="{ active: isActive }" />
      </div>
      <ul>
        
        <li :class="{ LinkActive: Active(['/']) }">
          <router-link to="/" exact>
            <font-awesome-icon :icon="['fas', 'table']" class="iconSideBar" />
            <span v-if="!isActive">Home</span>
          </router-link>
        </li>
        <li @click="toggleDropdown">
          <a
            href="#"
            class="dropDownBtn"
            :class="{ LinkActive: Active(['/create', '/edit']) }"
          >
            <font-awesome-icon :icon="['fas', 'bars-progress']" class="iconSideBar" />
            <span v-if="!isActive">Gerenciar</span>
            <font-awesome-icon
              :icon="['fas', dropdownIcon]"
              v-if="!isActive"
              class="dropIcon"
            />
          </a>
          <ul v-if="dropdownActive" class="dropdown">
            <li>
              <router-link to="/create">
                <font-awesome-icon :icon="['fas', 'square-plus']" class="iconSideBar" />
                <span v-if="!isActive">Criar</span>
              </router-link>
            </li>
            <li><router-link to="/edit">
              <font-awesome-icon :icon="['fas', 'pen']" class="iconSideBar" />
              <span v-if="!isActive">Editar</span>

            </router-link></li>
          </ul>
        </li>
        <li :class="{ LinkActive: Active(['/table']) }">
          <router-link to="/table" exact>
            <font-awesome-icon :icon="['fas', 'tv']" class="iconSideBar" />
            <span v-if="!isActive">Data Table</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "HelloWorld",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      isDropdownOpen: false,
      user: null,
      faUserSecret: faUserSecret,
      isActive: false,
      currentIcon: "caret-left",
      logoNormal: require("@/assets/logo-2.png"),
      logoMinimized: require("@/assets/ICONE-PHD.png"),
      dropdownActive: false,
      dropdownIcon: "caret-right",
    };
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
    logoSrc() {
      return this.isActive ? this.logoMinimized : this.logoNormal;
    },
  },
  methods: {
    toggleDropdownProfile() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    Active(routes) {
      return routes.includes(this.$route.path);
    },
    sideBarBtn() {
      this.isActive = !this.isActive;
      this.currentIcon = this.currentIcon === "caret-left" ? "caret-right" : "caret-left";
    },
    toggleDropdown() {
      this.dropdownActive = !this.dropdownActive;
      this.dropdownIcon =
        this.dropdownIcon === "caret-right" ? "caret-down" : "caret-right";
      
    },
  },
};
</script>
<style scoped>
@import url("../assets/css/appNavbar.css");
</style>
