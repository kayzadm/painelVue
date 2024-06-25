<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="popup">
      <p class="text-delete">{{ message }}</p>
      <div class="modalBtn">
        <button class="deleteBtn" @click="confirm">Comfirmar</button>
        <button class="editBtn" @click="cancel">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    message: String,
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>
<style>
.text-delete {
  color: #ccc;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup {
  border-radius: 20px;
  font-weight: bold;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  height: 200px;
  background: #0c3231db
}
.modalBtn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.modalBtn button {
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  width: 100px;
  height: 40px;
  padding: 10px;
}
</style>
