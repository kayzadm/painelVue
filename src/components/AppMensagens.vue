<template>
  <div id="response" v-if="msg" :class="[alertClass]">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: "AppMensagens",
  props: {
    msgType: {
      type: String,
      default: "",
    },
    msg: {
      type: String,
      default: "",
    },
  },
  computed: {
    alertClass() {
      return {
        'success': this.msgType === 'success',
        'danger': this.msgType === 'danger',
        'warning': this.msgType === 'warning',
        'info': this.msgType === 'info',
      }
    }
  }
};
</script>
<style>
#response {
  color: #EEE;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 30%;
  position: fixed;
  z-index: 1000;
  padding: 10px;
}
#response p {
  margin: 0;
  font-weight: 600
}
.success {
  background-color: rgb(0, 255, 0, 0.6) !important;
}
.danger {
  background-color: rgb(255, 0, 0, 0.6) !important;
}
</style>
