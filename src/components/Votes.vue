<script>
import axios from "axios";
import { store } from "../store";

export default {
    props: {
        doctor: Number,
    },
    data() {
        return {
            showModal: false,
            formData: {
                doctor_id: this.doctor,
                rating_id: 0,
            },
            store,
            isLoading: false,
            errors: {},
            submitted: false
        };
    },
    methods: {
        closeModal() {
            this.showModal = false;
            this.submitted = false;
            this.clearFields(); // Pulisci i campi quando si chiude il modale
        },
        submitForm() {
            this.submitted = true; // Imposta submitted a true quando l'utente invia il form

            // Verifica se la valutazione non è stata selezionata
            if (this.formData.rating_id === 0) {
                this.errors = { rating_id: ['Si prega di inserire almeno una stella.'] };
                return; // Esce dalla funzione per evitare la chiamata API
            } else {
                this.errors = {}; // Pulisci gli errori precedenti, se presenti
            }

            console.log(this.formData);
            this.isLoading = true;

            axios
                .post(`http://127.0.0.1:8000/api/ratings`, this.formData)
                .then((resp) => {
                    if (resp.data.success) {
                        this.clearFields();
                        this.closeModal();
                        this.store.successMessage = true;
                        setTimeout(() => {
                            this.store.successMessage = false;
                        }, 3000);
                    }
                })
                .catch((err) => {
                    if (err.response.status === 422) {
                        this.errors = err.response.data.errors;
                    }
                    console.log(this.errors);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        clearFields() {
            this.formData.rating_id = 0;
        },
        // Metodo per impostare la valutazione cliccando sulle stelle
        setRating(rating) {
            this.formData.rating_id = rating;
        },
        // Metodo per calcolare la media delle valutazioni
        getAverageRating(ratings) {
            if (!ratings.length) return 0;
            const sum = ratings.reduce((acc, rating) => acc + rating, 0);
            return (sum / ratings.length).toFixed(2);
        }
    },
};
</script>

<template>
    <div>
        <button type="button" class="btn ms_brown_btn" @click="showModal = true">
            Lascia un voto
        </button>

        <div v-if="showModal" class="modal fade show" tabindex="-1" role="dialog"
            aria-labelledby="contactHostModalLabel" style="display: block; background: rgba(0, 0, 0, 0.5)"
            @click.self="closeModal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-secondary" id="contactHostModalLabel">
                            Lascia un voto
                        </h5>

                    </div>

                    <div class="modal-body">
                        <form @submit.prevent="submitForm">
                            <input type="hidden" v-model="formData.doctor_id" />
                            <div class="mb-3">
                                <label class="form-label text-secondary" for="rating_id">Inserisci il tuo voto*</label>
                                <!-- Sezione per la valutazione con stelle -->
                                <div class="star-rating"> 
                                    <i v-for="star in 5" :key="star" 
                                       :class="['fa-star', star <= formData.rating_id ? 'fas' : 'far']" 
                                       @click="setRating(star)"></i> <!-- Aggiunge/stacca stelle in base al rating -->
                                </div>
                                <!-- Sezione per la valutazione con stelle -->
                                
                                <!-- Mostra l'errore di valutazione se presente -->
                                <div class="invalid-feedback d-block" v-if="submitted && errors.rating_id">{{ errors.rating_id[0] }}</div>
                            </div>
                            <div class="mt-1 text-muted">
                                <small>* Campi obbligatori</small>
                            </div>
                            <div class="d-flex gap-2 mt-2">
                                <button type="submit" class="btn btn-primary" :disabled="isLoading">Invia</button>
                                <button type="button" class="btn btn-danger" @click="closeModal" aria-label="Close">
                                    Annulla
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<style lang="scss" scoped>
.ms_brown_btn {
    background-color: rgba(146, 180, 244, 1);
    color: white;
}

// Un po di tile per le stelle 
.star-rating { 
    font-size: 1.5rem;
    color: gold;
    cursor: pointer;
}

.star-rating .fa-star {
    margin: 0 0.1rem;
}

@media screen and (max-width: 768px) {
    button {
        font-size: 12px;
        margin: 0;
        padding: 2px 10px;
    }
}
</style>
