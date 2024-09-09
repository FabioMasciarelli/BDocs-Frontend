<script>
import axios from "axios";
import { store } from "../store.js";
import CardProfile from "../components/CardProfile.vue";
import PreFooter from "../components/PreFooter.vue";

import Message from "../components/Message.vue";

import { format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';

export default {
  components: {
    CardProfile,
    PreFooter,
  
    Message,
  },

  data() {
    return {
      doctor: null,
      store,
      // attivo il loader
      isLoading: true,
      showReview: false
    };
  },
  computed: {
  
    averageRating() {
      // Calcola la media dei voti se i voti sono disponibili
      if (this.doctor.ratings && this.doctor.ratings.length > 0) {
        const total = this.doctor.ratings.reduce((sum, rating) => sum + rating.rating, 0);
        return Math.round(total / this.doctor.ratings.length);
      }
      return 0;
    },
    orderedReviews() {
      return [...this.doctor.reviews].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }
  },
  created() {
    const id = this.$route.params.id;
    axios
      .get(`${store.apiBaseURL}/api/doctors/${id}`)
      .then((resp) => {
        console.log(resp);
        this.doctor = resp.data.results;
        // tolgo il loader
        this.isLoading = false;
        console.log(this.doctor);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  },
  methods: {
    formatDate(dateString) {
      // Converti la data da stringa MySQL in un oggetto Date
      return format(new Date(dateString), 'dd MMMM yyyy, HH:mm', { locale: it });
    },

    toggleReview() {
      this.showReview = !this.showReview  
    }
  }
};
</script>

<template>
  <div class="d-flex justify-content-center" v-if="isLoading">
    <div class="loader"></div>
  </div>
  <div v-if="!isLoading">
    <div class="container-fluid cont-top">
      <div class="row align-items-center ms_style">
        <div class="card mb-3" style="max-width: 1000px">
          <div class="row g-0">
            <div class="col-md-6 col-card-img">
              <img
                :src="
                  doctor.photo
                    ? `${store.imageUrl}/${doctor.photo}`
                    : `https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg`
                "
                class="card-img-top"
                alt="Doctor Photo"
                style="max-width: 100%"
              />
            </div>
            <div class="col-md-6 align-content-center card-testo">
              <!-- Stelline sopra la foto -->
              <div class="rating-stars">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="star"
                  :class="{ filled: star <= averageRating }"
                >
                  ★
                </span>
              </div>
              <!-- /stelline sopra la foto -->
              <div class="card-body">
                <h1>{{ doctor.user.name }} {{ doctor.user.surname }}</h1>
                <span>Specializzazione </span>
                <div class="d-inline">
                  <span
                    class="text-secondary"
                    v-for="(specialization, index) in doctor.specializations"
                    :key="specialization.id"
                  >
                    <template v-if="index > 0"> e </template>
                    <strong>{{ specialization.title }}</strong>
                  </span>
                  <br />
                  <span> Tipo di prestazione: </span>
                  <span class="text-secondary"
                    ><strong>{{ doctor.performance }}</strong></span
                  >
                </div>
                <div class="mt-2">
                  <p class="m-0">
                    <i class="fa-solid fa-location-dot"></i>
                    {{ doctor.studio_address }}
                  </p>
                  <p class="m-0">
                    <i class="fa-solid fa-address-card"></i>
                    {{ doctor.user.email }}
                  </p>
                  <p class="m-0">
                    <i class="fa-solid fa-phone"></i> {{ doctor.phone_number }}
                  </p>
                  <a
                    :href="`${store.apiBaseURL}/storage/${doctor.CV}`"
                    target="_blank"
                    class="text-primary"
                  >
                    Guarda il CV
                  </a> 
                  <button class="btn btn-primary mt-2 d-block" @click="toggleReview">Mostra Recensioni</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="alert alert-success ms-alert-success" v-if="store.successMessage">
        Il tuo messaggio è stato inviato con successo
      </div>
      
    </transition>

    <!-- vista recensioni -->
   

    <div>
    <div v-if="showReview">
      <div v-if="doctor.reviews.length > 0">
        <!-- Contenitore delle recensioni con classe condizionale -->
        <div :class="{'scroll-container': doctor.reviews.length > 3}" style="width: 50%; margin: 0 auto">
          <div class="card" style="width: 70%; margin: 10px auto;" v-for="(review, index) in orderedReviews" :key="review.id">
            <div class="card-body">
              <div class="d-flex mb-4 border-bottom justify-content-between align-items-center">
                <h5 class="card-title my_name"> <i class="fa-solid fa-circle-user"></i> {{ review.guest_name }}</h5>
                <span class="text-secondary" style="font-size: 12px;">  {{ formatDate(review.updated_at) }}</span>
              </div>
              <h6>Ha recensito</h6>
              <p class="card-text">
                "{{ review.review }}".
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center">Nessuna recensione presente</p>
      </div>
    </div>
  </div>

    <div class="container cont-card">
      <CardProfile :doctor="doctor" />
    </div>
   

    <div class="d-none">
      <Review :doctor="doctor.user.id" />
    </div>
    <div class="d-none">
      <Message :doctor="doctor.user.id" />
    </div>
    <div class="d-none">
      <Votes :doctor="doctor.user.id" />
    </div>
  </div>
  <PreFooter />
</template>

<style scoped lang="scss">
@use "../style/partials/variables" as *;

// custom scrollbar
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: $columbia-blue;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: $glaucous;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: $egyptian-blue;
}

.scroll-container {
  max-height: 400px; /* Imposta l'altezza massima desiderata */
  overflow-y: auto; /* Abilita lo scroll verticale */
}

.my_name{
  text-transform: capitalize;
}

.cont-top {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)),
    url(../assets/img/nursing4.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;

}
img{
  width: 70%;
  margin-left: 30%;
}

/* Stelline sopra la foto */
.rating-stars {
  display: flex;
  margin-left: 15px;
}

.star {
  font-size: 20px;
  color: grey;
  margin-right: 2px;
}

.star.filled {
  color: gold;
}

img {
  mix-blend-mode: multiply;
}

.ms_style {
  justify-content: center;
  margin-top: 100px;
  padding-top: 10px;

  .card {
    border: none;
    background-color: transparent;
    padding-top: 50px;
  }
}

.user-picture {
  max-width: 200px;
  margin: 0 auto;
}

span {
  font-weight: 900;
  font-style: italic;
}

.cont-card {
  margin: 0 auto;
  margin-bottom: 50px;
}

// Bottone messaggio, animazioni custom in entrata e uscita
.ms-alert-success {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(212, 237, 218, 0.9);
  padding: 15px 30px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// loader
.loader {
  width: 150px;
  margin: 200px 0;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid lightblue;
  border-right-color: rgb(8, 0, 255);
  animation: l2 1s infinite linear;
}

@keyframes l2 {
  to {
    transform: rotate(1turn);
  }
}

/* Breakpoint 1024px */
@media (max-width: 1024px) {
  .cont-top {
    background-attachment: scroll;
  }

  .ms_style .card {
    padding-top: 30px;
  }

  .profile-header {
    flex-direction: column;
    align-items: center;
  }

  .card-body {
    text-align: start;
    font-size: 1.5rem;
  }

  .card-img-top {
    width: 70%;
    margin: 0;
    padding: 0;
  }

  .col-card-img {
    display: flex;
    align-items: start;
    margin: 0;
    padding: 0;
    justify-content: flex-end;
  }

  button {
    width: 50%;
    font-size: 1.2rem;
  }
}

/* Breakpoint 768px */
@media (max-width: 768px) {
  .ms_style .card {
    padding-top: 20px;
  }

  .profile-header {
    flex-direction: column;
    align-items: center;
  }

  .card-body {
    text-align: start;
    padding-top: 0;
    font-size: medium;
  }

  .card-img-top {
    width: 70%;
    margin: 0;
    padding: 0;
  }

  .col-card-img {
    display: flex;
    align-items: start;
    margin: 0;
    padding: 0;
    justify-content: flex-end;
  }

  button {
    margin-top: 1px !important;
    width: 47%;
    font-size: 0.8rem;
  }
}


/* Breakpoint 576px */
@media (max-width: 576px) {
  .ms_style .card {
    padding-top: 15px;
  }

  .profile-header {
    flex-direction: column;
    align-items: center;
  }

  .card-body {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .card-img-top {
    width: 60%;
    margin: 0 auto;
  }

  .btn {
    margin-top: auto;
    align-self: center;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
}

/* Breakpoint 450px */
@media (max-width: 450px) {
  .cont-top {
    padding: 5px;
  }

  .profile-photo {
    width: 80px;
    height: 80px;
  }

  .profile-details {
    text-align: center;
  }

  .ms_style .card {
    padding-top: 10px;
  }

  .card-body {
    text-align: center;
  }

  .card-img-top {
    width: 50%;
    margin: 0 auto;
  }

  .rating-stars {
    justify-content: center;
  }

  button {
    margin: auto !important;
    margin-top: 8px !important;
  }
}
</style>
