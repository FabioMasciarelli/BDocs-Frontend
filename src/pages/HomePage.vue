<script>
import axios from "axios";
import { store } from "../store.js";
import DoctorCard from "../components/DoctorCard.vue";
import SearchBar from "../components/SearchBar.vue";
import HeroSection from "../components/HeroSection.vue";
import PreFooter from "../components/PreFooter.vue";

export default {
  components: {
    DoctorCard,
    SearchBar,
    HeroSection,
    PreFooter,
  },

  data() {
    return {
      specializations: [],
      ratings: [],
      doctors: null,
      store,
      selectSpecialization: "",
      selectRating: "",
      activeDoctors: [],
      nonActiveDoctors: [],
    };
  },

  created() {
    this.getDoctors();
    this.getSpecialization();
    this.getRating();
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    getDoctors() {
      const params = {};
      if (this.selectSpecialization !== "") {
        params.specialization_id = this.selectSpecialization;
      }
      if (this.selectRating !== "") {
        params.average_rating = this.selectRating; // Assicurati che il parametro sia corretto
      }
      axios
        .get(`${this.store.apiBaseURL}/api/doctors`, {
          params,
        })
        .then((resp) => {
          this.doctors = resp.data.results;

          // Filtra i dottori con sponsorizzazioni attive e non attive
          this.activeDoctors = this.doctors.filter(doctor => 
            doctor.active_sponsorships && doctor.active_sponsorships.length > 0
          );
          this.nonActiveDoctors = this.doctors.filter(doctor => 
            !doctor.active_sponsorships || doctor.active_sponsorships.length === 0
          );

          console.log(
            "Dottori con sponsorizzazioni attive:",
            this.activeDoctors
          );
          console.log(
            "Dottori senza sponsorizzazioni attive:",
            this.nonActiveDoctors
          );
          this.$nextTick(() => {
            this.handleScroll();
          });
        })
        .catch((error) => {
          console.error("Errore fetch dottori:", error);
        });
    },
    getSpecialization() {
      axios.get(`${this.store.apiBaseURL}/api/specializations`).then((resp) => {
        console.log(resp);
        this.specializations = resp.data.results;
      });
    },
    getRating() {
      axios.get(`${this.store.apiBaseURL}/api/ratings`).then((resp) => {
        console.log(resp);
        this.ratings = resp.data.results;
      });
    },
    handleScroll() {
      const elements = document.querySelectorAll(".fade-in");
      const windowHeight = window.innerHeight;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 200) {
          el.classList.add("visible");
        } else {
          el.classList.remove("visible");
        }
      });
    },
  },
};
</script>

<template>

    <!-- HERO SECTION -->
    <HeroSection />

    <!-- SEARCH BAR SPECIALIZATION -->
    <div
      class="m-5 d-flex align-items-center justify-content-evenly query fade-in query-2"
    >
      <h6 class="m-0 media-h6">
        Scegli i nostri dottori in base alle loro prestazioni
      </h6>
      <div class="d-flex justify-content-center custom-select">
        <select
          id=""
          aria-label="seleziona specializzazione"
          v-model="selectSpecialization"
          @change="getDoctors"
        >
          <option value="">Tutte le specializzazioni</option>
          <option
            :value="specialization.id"
            v-for="specialization in specializations"
            :key="specialization.id"
          >
            {{ specialization.title }}
          </option>
        </select>
      </div>
    </div>
    <!-- /SEARCH BAR SPECIALIZATION-->

    <!-- SEARCH BAR RATING-->
    <div
      class="m-5 d-flex align-items-center justify-content-evenly query fade-in"
    >
      <h6 class="m-0 media-h6">Scegli i nostri dottori in base ai loro voti</h6>
      <div class="d-flex justify-content-center custom-select">
        <select
          id=""
          aria-label="seleziona votazione"
          v-model="selectRating"
          @change="getDoctors"
        >
          <option value="">Tutti i voti</option>
          <option :value="rating.id" v-for="rating in ratings" :key="rating.id">
            {{ rating.rating }}
          </option>
        </select>
      </div>
    </div>
    <!-- /SEARCH BAR RATING-->

    <div class="container mt-5 mb-5">
      <h1 class="text-center mb-3 typewriter-doc media-h1">I nostri Dottori</h1>
      <p class="text-center mb-5 typewriter-doc media-p">
        Il nostro team di medici altamente qualificati è qui per prendersi cura
        di voi.
      </p>

      <div v-if="doctors" class="doctors-grid">
        <div >
          <div
            v-if="activeDoctors.length === 0 && nonActiveDoctors.length === 0"
            class="w-100">
            <div class="alert alert-warning" role="alert">
              Ci dispiace, ma non abbiamo trovato alcun dottore che corrisponda ai tuoi
              criteri di ricerca.
              <ul>
                <li>Prova a selezionare una specializzazione diversa.</li>
                <li>Prova a selezionare una valutazione diversa.</li>
                <li>Rimuovi alcuni filtri per vedere un maggior numero di risultati.</li>
              </ul>
            </div>
          </div>
          <div v-else>
            <div v-if="activeDoctors.length > 0" class="active-doctors-section">
              <!-- <h2 class="text-center mb-4">Sponsorizzati</h2> -->
              <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 ms_sponsorized rounded">
                <div class="col fade-in " v-for="doctor in activeDoctors" :key="doctor.id">
                  <DoctorCard :doctor="doctor" />
                </div>
              </div>
            </div>

            <!-- Dottori senza sponsorizzazioni attive -->
            <div v-if="nonActiveDoctors.length > 0" class="non-active-doctors-section">
              <!-- <h2 class="text-center mb-4">Dottori Senza Sponsorizzazioni Attive</h2> -->
              <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
                <div
                  class="col fade-in"
                  v-for="doctor in nonActiveDoctors"
                  :key="doctor.id">
                  <DoctorCard :doctor="doctor" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dottori con sponsorizzazioni attive -->
      </div>
        <div v-else>
          <div class="loader">
            <span class="loader-text">caricamento</span>
            <span class="load"></span>
          </div>
        </div>
     
    </div>
    <PreFooter />

</template>

<style scoped lang="scss">
@use "../style/partials/variables" as *;

/* Effetto di scrittura per il testo della i nostri dottori */
.typewriter-doc {
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s;
  color: rgba(10, 54, 157, 1);
}

@keyframes typing {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }

  50% {
    border-color: rgba(146, 180, 244, 1);
  }
}

.card-img-top {
  object-fit: cover;
  height: 200px;
  border-radius: 10px;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.card-text ul {
  padding-left: 20px;
  list-style: disc;
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.loader-text {
  margin-right: 10px;
}

.load {
  border: 2px solid $egyptian-blue;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

//.ms_sponsorized {
  //background-image: linear-gradient(
    //to left bottom,
   // #fff5cc,
   // #ffd700,
   // #ffc107,
   // #ffb14e,
   // #ffd700
 // );
//}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

html {
  scroll-behavior: smooth;
}

// Tentativo di fade-in delle cards
.fade-in {
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.fade-in.visible {
  opacity: 1;
}

// Tentativo di fae in delle cards

//Select custom
select {
  border-radius: 10px;
  padding: 10px;
  border: 2px solid $glaucous;
  color: $glaucous;
}

h6 {
  color: rgb(10, 54, 157);
}

// responsive media

.media-p {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

@media (min-width: 768px) {
  .col {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .active-doctors-section {
    margin-bottom: 60px;
  }
}

/* Media Queries per aggiustamenti extra */
@media (max-width: 576px) {
  .col {
    padding: 0.5rem;
  }
  .media-h1 {
    font-size: 1.7rem;
  }
  .media-p {
    font-size: 0.9rem;
  }
  .media-h6 {
    font-size: 0.9rem;
    text-align: center;
  }
}

@media screen and (max-width: 450px) {
  .query {
    flex-direction: column;
    

    .media-h6 {
      padding-bottom: 8px;
    }
  }
  .query-2 {
    margin-top: 400px !important;
  }
}


</style>
