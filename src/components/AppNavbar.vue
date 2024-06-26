<template>
  <ul class="Profile">
    <li class="dropdownProfile" @click="toggleDropdownProfile">
      <a href="#" class="dropbtnProfile">
        <font-awesome-icon :icon="['fas', 'user']" />
      </a>
      <div v-if="isDropdownOpen" class="profileMenu">
        <div class="nameProfile">{{user.name}}</div>
        <a href="" class="optionProfile">
          <font-awesome-icon :icon="['fas', 'user']" />
          <span>Perfil</span>
        </a>
        <hr />
        <a @click="logout" href="#" class="optionProfile text-danger">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
          <span>Logout</span>
        </a>
      </div>
    </li>
  </ul>
  <div id="response" class="response"></div>
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
        <li :class="{ LinkActive: Active(['/home']) }">
          <router-link to="/home" exact>
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
            <li>
              <router-link to="/edit">
                <font-awesome-icon :icon="['fas', 'pen']" class="iconSideBar" />
                <span v-if="!isActive">Editar</span>
              </router-link>
            </li>
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
import axios from 'axios';

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
    deleteTokenCookie() {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    getUserData() {
      const token = this.getTokenCookie();
      var apiUrl = this.$apiUrl;
      if (token) {
        axios.get(`${apiUrl}/user`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
          .then(response => {
            this.user = response.data;
          })
          .catch(error => {
            console.error('Erro ao obter os dados do usuário:', error);
          });
      } else {
        this.$router.push({ name: 'login' });
        this.deleteTokenCookie()  
      }
    },
    getTokenCookie() {
      const name = "token=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    logout() {
      const token = this.getCookie('token')
      var apiUrl = this.$apiUrl;
      axios.post(`${apiUrl}/destroy`, {}, {
        
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then(response => {
          console.log(response)
          this.deleteTokenCookie();
          this.$router.push({ name: 'login' });
        })
        .catch(error => {
          console.error('Erro ao fazer logout:', error);
        });
    },
    toggleDropdownProfile() {
      this.isDropdownOpen = !this.isDropdownOpen;
      if (this.isDropdownOpen) {
        document.addEventListener('click', this.handleOutsideClick);
      } else {
        document.removeEventListener('click', this.handleOutsideClick);
      }
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
  mounted() {
    this.getUserData();
  }
};
</script>
<style scoped>
@import url("../assets/css/appNavbar.css");
</style>
