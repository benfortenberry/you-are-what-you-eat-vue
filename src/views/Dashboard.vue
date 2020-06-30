<template>
  <div>
    <loading :active.sync="isLoading" :is-full-page="true"></loading>
    <add-edit-modal
      v-model="modalOpen"
      :edit="editMode"
      :entry="editEntry"
      @toggle="modalOpen = !modalOpen"
      @refresh="refresh"
    ></add-edit-modal>
    <confirm-modal v-model="modalConfirmOpen" @confirm="deleteEntry()" @toggle="toggleConfirm()"></confirm-modal>
    <div id="nav">
      <header class="usa-header usa-header--basic usa-header--megamenu">
        <div class="usa-nav-container">
          <div class="usa-navbar">
            <div class="usa-logo" id="basic-mega-logo">
              <div class="grid-row v-center">
                <div class="grid-col-6">
                  <em class="usa-logo__text">
                    <font-awesome-icon icon="utensils" class="margin-right-1" />You Are What You Eat
                  </em>
                </div>
                <div class="grid-col-6 text-right">
                  <div v-if="user" class="user-profile">
                    <div>
                      <br />
                      <button @click="logOut" class="usa-button usa-button--outline">
                        <font-awesome-icon icon="sign-out-alt" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
    <div v-if="user" class="grid-container">
      <div class="grid-row v-center">
        <div class="grid-col-8 v-center">
          <div class="user-profile v-center padding-top-1">
            <h4 class="margin-top-2">
              <img :src="user.photoURL" class="v-center" width="40" />
              <span class="margin-left-1">{{user.displayName}}'s meals:</span>
            </h4>
          </div>
        </div>

        <div
          class="grid-col-4 text-right"
          v-infinite-scroll="nextPage"
          infinite-scroll-distance="1000"
          infinite-scroll-disabled="disableInfinite"
          infinite-scroll-immediate-check="false"
          infinite-scroll-throttle-delay="500"
        >
          <button @click="openModal(false)" class="usa-button margin-top-2">
            <font-awesome-icon icon="plus" />
          </button>
        </div>
      </div>
      <div class="grid-row v-center" v-if="noEntries">
        <p>No entries yet! Add your first meal now.</p>
      </div>
      <div class="grid-row v-center food-entry" v-for="entry in entryList" :key="entry.id">
        <div class="grid-col-8">
          <h5 class="margin-bottom-0 margin-top-5px">{{formatDate(entry.date_time)}}</h5>
          <p class="usa-intro margin-top-0 margin-bottom-0">{{entry.description}}</p>
        </div>
        <div class="grid-col-4 text-right">
          <button @click="openModal(true, entry)" class="usa-button usa-button--base">
            <font-awesome-icon icon="pen" />
          </button>

          <button @click="confirmDelete(entry.id)" class="usa-button usa-button--secondary">
            <font-awesome-icon icon="trash" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import fireDb from "@/fireDb";
import AddEditModal from "@/components/AddEditModal";
import ConfirmModal from "@/components/ConfirmModal";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import VueMoment from "vue-moment";
import moment from "moment";

export default {
  name: "Dashboard",
  components: {
    AddEditModal,
    ConfirmModal,
    Loading
  },
  created() {
    if (!this.user) {
      this.$router.push({ name: "Login" });
    } else {
      this.getEntries(this.user.uid);
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    disableInfinite() {
      if (this.isLoading || !this.hasNext) {
        true;
      }
    }
  },
  data() {
    return {
      isLoading: true,
      modalOpen: false,
      hasNext: true,
      modalConfirmOpen: false,
      editMode: false,
      editEntry: null,
      deleteId: null,
      last: null,
      noEntries: false,
      first: null,
      entryList: []
    };
  },
  methods: {
    logOut() {
      fireDb.logout();
    },
    formatDate(date) {
      return moment(date).format("dddd, MMMM Do YYYY, h:mm a");
    },
    nextPage() {
      this.isLoading = true;

      if (this.hasNext) {
        this.getNextEntries(this.user.uid);
      } else {
        this.isLoading = false;
      }
    },
    toggleConfirm() {
      this.modalConfirmOpen = !this.modalConfirmOpen;
    },
    confirmDelete(id) {
      this.deleteId = id;
      this.toggleConfirm();
    },
    deleteEntry() {
      this.modalConfirmOpen = false;

      fireDb
        .modifyEntries()
        .doc(this.deleteId)
        .delete()
        .then(ref => {
          this.entryList.splice(
            this.entryList.findIndex(x => x.id === this.deleteId),
            1
          );

          this.deleteId = null;
          this.isLoading = true;
          this.getEntries(this.user.uid);
        });
    },
    refresh() {
      this.isLoading = true;
      this.hasNext = true;
      this.getEntries(this.user.uid);

      this.modalOpen = false;
      this.editMode = false;
    },
    getNextEntries(userId) {
      let entries = [];
      if (this.last && this.isLoading) {
        fireDb
          .entriesNextPage(userId, this.last)
          .get()
          .then(querySnapshot => {
            this.last = querySnapshot.docs[querySnapshot.docs.length - 1];

            querySnapshot.forEach(doc => {
              entries.push({
                id: doc.id,
                description: doc.data().description,
                user: doc.data().user,
                date_time: doc.data().date_time
              });
            });

            this.isLoading = false;

            this.entryList.push(...entries);
            this.hasNext = false;
            if (entries.length == 20) {
              this.hasNext = true;
            }
          })
          .catch(error => {
            this.isLoading = false;
          });
      }
    },
    getEntries(userId, page) {
      let entries = [];

      fireDb
        .getEntries(userId)
        .get()
        .then(querySnapshot => {
          this.last = querySnapshot.docs[querySnapshot.docs.length - 1];

          querySnapshot.forEach(doc => {
            entries.push({
              id: doc.id,
              description: doc.data().description,
              user: doc.data().user,
              date_time: doc.data().date_time
            });
          });

          this.isLoading = false;

          // let entriesCopySorted = entries.sort((a, b) => {
          //   const aDate = moment(a.date_time, "dddd, MMMM Do YYYY, h:mm A");
          //   const bDate = moment(b.date_time, "dddd, MMMM Do YYYY, h:mm A");

          //   return bDate - aDate;
          // });

          this.entryList = entries;

          if (this.entryList.length == 0) {
            this.noEntries = true;
          } else {
            this.noEntries = false;
          }
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
        });
    },
    openModal(edit, entry) {
      this.editMode = edit;
      this.editEntry = entry;
      this.modalOpen = !this.modalOpen;
    }
  }
};
</script>

<style scoped>
.usa-header--basic .usa-navbar {
  position: relative;
  width: 100%;
}

.v-center {
  align-items: center;
  vertical-align: middle;
}

.user-profile button {
  margin-bottom: 5px;
}

.user-profile img {
  width: 40px;
  border-radius: 100%;
}

.margin-bottom-0 {
  margin-bottom: 0;
}
.margin-top-0 {
  margin-top: 0;
}

.margin-top-2 {
  margin-top: 2px;
}

.food-entry {
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
}
</style>