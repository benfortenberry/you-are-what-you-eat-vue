<template>
  <div class="modal" v-if="value">
    <div class="modal-content" v-click-outside="hide">
      <loading :active.sync="isLoading" :is-full-page="true"></loading>
      <div class="grid-container">
        <div class="grid-row">
          <div class="grid-col-6">
            <h3 v-if="edit">
              <font-awesome-icon icon="pen" />&nbsp;Edit Entry
            </h3>
            <h3 v-else>
              <font-awesome-icon icon="plus" />&nbsp;Add Entry
            </h3>
          </div>
          <div class="grid-col-6 text-right">
            <button @click="hide()" class="usa-button text-right usa-button--unstyled margin-top-1">
              <font-awesome-icon icon="times" />
            </button>
          </div>
        </div>
        <form v-on:submit.prevent @submit="saveData()">
          <div class="grid-row">
            <div class="grid-col-12">
              <label class="usa-label margin-top-0" for="input-type-text">What did you eat?</label>
              <textarea
                class="usa-textarea"
                ref="foodDesc"
                required
                id="input-type-textarea"
                name="input-type-textarea"
                v-model="foodDesc"
              ></textarea>
            </div>
          </div>
          <div class="grid-row">
            <div class="grid-col-12">
              <label class="usa-label margin-top-1" for="input-type-text">When?</label>
              <flat-pickr
                class="usa-input"
                @on-open="toggleDatePicker"
                @on-close="toggleDatePicker"
                :config="config"
                id="input-type-text"
                name="input-type-text"
                v-model="foodDate"
              ></flat-pickr>
            </div>
          </div>
          <div class="grid-row margin-top-1">
            <div class="grid-col-12 text-right">
              <button type="submit" class="usa-button">
                <font-awesome-icon icon="check" />&nbsp;Save
              </button>
              <button @click="hide()" class="usa-button margin-right-0 usa-button--outline">Cancel</button>
            </div>
          </div>
        </form>

        <br />
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import fireDb from "@/fireDb";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VueMoment from "vue-moment";
import moment from "moment";

export default {
  name: "AddEditModal",
  props: {
    value: {
      required: true
    },
    edit: {
      required: true
    },
    entry: {
      required: false
    }
  },
  data() {
    return {
      firstOpen: true,
      isLoading: false,
      datePickerOpen: false,
      foodDate: null,
      foodDesc: null,
      config: {
        enableTime: true,
        dateFormat: "Y-m-d h:i K",
        altInput: true,
        altFormat: "F j, Y h:i K",
        defaultDate: new Date(),
        position: "auto"
      }
    };
  },
  watch: {
    entry: function(val) {
      if (val) {
        this.foodDate = val.date_time;
        this.foodDesc = val.description;
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("refresh");
      this.firstOpen = true;
    },
    toggleDatePicker() {
      this.datePickerOpen = !this.datePickerOpen;
    },
    saveData() {
      if (!this.entry) {
        if (!this.foodDate) {
          this.foodDate = moment()
            .format()
            .toString();
        } else {
          this.foodDate = moment(this.foodDate, "YYYY-MM-DD h:mm A").format();
        }

        this.isLoading = true;
        fireDb
          .modifyEntries()
          .add({
            user: this.user.uid,
            date_time: this.foodDate,
            description: this.foodDesc
          })
          .then(ref => {
            this.isLoading = false;
            this.foodDesc = null;
            this.foodDate = null;

            this.closeModal();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        if (!this.foodDate) {
          this.foodDate = moment()
            .format()
            .toString();
        } else {
          this.foodDate = moment(this.foodDate, "YYYY-MM-DD h:mm A").format();
        }

        this.isLoading = true;
        fireDb
          .modifyEntries()
          .doc(this.entry.id)
          .update({
            user: this.user.uid,
            date_time: this.foodDate,
            description: this.foodDesc
          })
          .then(ref => {
            this.isLoading = false;
            this.foodDesc = null;
            this.foodDate = null;

            this.closeModal();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    hide() {
      if (this.firstOpen) {
        this.$refs.foodDesc.focus();
        this.firstOpen = false;
      } else if (!this.datePickerOpen) {
        this.entry = null;
        this.$emit("toggle");
        this.firstOpen = true;
      }
    }
  },
  directives: {
    ClickOutside
  },
  components: {
    flatPickr,
    Loading
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  },
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

.usa-combo-box__input,
.usa-input,
.usa-textarea,
.usa-range,
.usa-select {
  /* max-width: unset !important; */
}
/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  /* padding: 20px; */
  max-width: 500px;
}
</style>
