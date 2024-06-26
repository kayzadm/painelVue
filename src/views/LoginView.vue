<template>
  <AppLogin>
    <template v-slot:menu>
      <div class="loginSection">
        <div class="cardLogin">
          
          <div class="logoLogin">
            <img src="../assets/logo-2.png" alt="" />
          </div>
          <form id="form" @submit.prevent="login">
            <div class="mensage">
              <AppMensagens :msg="msg" v-show="msg" :msgType="msgType"/>
            </div>
            <div class="emailLogin">
              <label for="email">Email:</label>
              <input type="text" name="email" id="email" v-model="email" placeholder="Email" />
            </div>
            <div class="passwordLogin">
              <label for="password">Senha:</label>
              <input type="password" name="password" id="password" v-model="senha" placeholder="Senha" />
            </div>
            <div class="buttonLogin">
              <button type="submit" id="loginBtn">Enviar</button>
            </div>
          </form>
          
        </div>
      </div>
    </template>
  </AppLogin>
</template>
<script>
import AppMensagens from "@/components/AppMensagens.vue";
import AppLogin from "@/views/templates/appLogin";
import $ from "jquery";

export default {
  name: "loginView",
  components: {
    AppMensagens,
    AppLogin,
  },
  data() {
    return {
      msg: null,
      email: "",
      senha: "",
    };
  },
  methods: {
    setTokenCookie(token) {
      const d = new Date();
      d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
      const expires = "expires=" + d.toUTCString();
      document.cookie = "token=" + token + ";" + expires + ";path=/";
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
    login() {
      var apiUrl = this.$apiUrl;
      const data = {
        username: this.email,
        password: this.senha
      };

      $.ajax({
        type: 'POST',
        url: `${apiUrl}/auth`,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        xhrFields: {
          withCredentials: true
        },
        beforeSend: () => {
          this.msg = '';
          $("#loginBtn").val('validando...');
        },
        success: (response) => {
          $("#loginBtn").val('entrar');
          $("#loginBtn").removeAttr("disabled");
          if (!response.errors && !response.message) {
            this.setTokenCookie(response.token)
            this.$router.push({ name: 'home' });
          } else {
            this.handleErrors(response);
          }
        },
        error: () => {
          alert('Erro ao enviar formulário, por favor contate nosso suporte: (11)94952-2579 E-mail: console.tech@outlook.com');
          $("#loginBtn").val('entrar');
          $("#loginBtn").removeAttr("disabled");
        }
      });
    },
    handleErrors(response) {
      let errorMsg = '';
      this.msgType = "danger";

      if (typeof response.message === 'string') {
        errorMsg += response.message
      } else if (Array.isArray(response.message)) {
        response.message.forEach((msg) => {
          errorMsg += msg;
        });
      }
      if (response.errors) {
        Object.values(response.errors).forEach((errArray) => {
          errArray.forEach((err) => {
            errorMsg += err;
          });
        });
      }
      this.msg = errorMsg;
      setTimeout(() => {
        this.msg = '';
      }, 3000);
    }
  },
  mounted() {
    document.title = 'LOGIN'
    var apiUrl = this.$apiUrl;
    const token = this.getTokenCookie();
    if (token) {
      $.ajax({
        type: 'GET',
        url: `${apiUrl}/user`,
        headers: { 'Authorization': 'Bearer ' + token },
        success: (response) => {
          if (response.active == 0) {
            alert('Ops! Sua conta está desativada. Entre em contato conosco para ativar');
          } else {
            this.$router.push({ name: 'home' });
          }
        }
      });
    }
  }
};
</script>
<style>
.mensage {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
  
}
.loginSection {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: #222 !important;
}
.cardLogin {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 400px;
  background-color: #333;
  box-shadow: 5px 5px 10px 5px rgb(0, 0, 0, 0.2);
  border-radius: 5px;
}
.logoLogin {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #111;
}
.logoLogin img {
  max-width: 100%;
  max-height: 100%;
}
#form {
  gap: 20px;
  padding: 20px;
  width: 100%;
  height: calc(100% - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.emailLogin,
.passwordLogin {
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #ccc;
}
.emailLogin input,
.passwordLogin input {
  border: none;
  outline: none;
  background-color: #000;
  color: #00bcb5;
  border-radius: 5px;
  padding: 8px;
  width: 100%;
  box-shadow: 5px 5px 10px 5px rgb(0, 0, 0, 0.2);
}
.emailLogin input::placeholder,
.passwordLogin input::placeholder {
  color: rgb(0, 188, 181, 0.5);
}
.buttonLogin {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.buttonLogin button {
  background-color: #00bcb5;
  color: #eee;
  border-radius: 15px;
  box-shadow: 5px 5px 10px 5px rgb(0, 0, 0, 0.2);
  width: 50%;
  padding: 10px;
  border: none;
  outline: none;
}
.buttonLogin button:hover {
  background-color: #09fce0;
}
</style>
