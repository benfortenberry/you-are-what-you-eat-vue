<template>
  <div class="modal" v-if="value">
    <div class="modal-content">
      <div class="grid-container">
        <div class="grid-row">
          <div class="grid-col-6">
            <h3>
              <font-awesome-icon icon="trash" />&nbsp;Delete Entry
            </h3>
          </div>
          <div class="grid-col-6 text-right">
            <button
              @click="closeModal()"
              class="usa-button text-right usa-button--unstyled margin-top-1"
            >
              <font-awesome-icon icon="times" />
            </button>
          </div>
        </div>

        <div class="grid-row">
          <div class="grid-col-12">
            <p>Are you sure want to delete this entry?</p>
          </div>
        </div>

        <div class="grid-row margin-top-1">
          <div class="grid-col-12 text-right">
            <button @click="confirmDelete()" class="usa-button">
              <font-awesome-icon icon="check" />&nbsp;Yes
            </button>
            <button
              @click="closeModal()"
              class="usa-button margin-right-0 usa-button--outline"
            >Cancel</button>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  name: "ConfirmModal",
  props: {
    value: {
      required: true
    }
  },
  data() {
    return {
      firstOpen: true
    };
  },
  methods: {
    confirmDelete() {
      this.$emit("confirm");
    },
    closeModal() {
      this.$emit("toggle");
      this.firstOpen = true;
    },
    hide() {
      if (this.firstOpen) {
        this.firstOpen = false;
      } else {
        this.firstOpen = true;
        this.$emit("toggle");
      }
    }
  },
  directives: {
    ClickOutside
  },
  components: {},
  mounted() {
    this.popupItem = this.$el;
  }
};
</script>

  <style lang="css" scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  max-width: 500px;
}
</style>
