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
                guest_name: "",
                guest_surname: "",
                guest_mail: "",
                message: "",
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
            this.submitted= false;
            this.formData.guest_name = "";
            this.formData.guest_surname = "";
            this.formData.guest_mail = "";
            this.formData.message = "";
        },
        submitForm() {
            console.log(this.formData);
            this.isLoading = true;
            this.submitted = true;
            axios
                .post(`http://127.0.0.1:8000/api/messages`, this.formData)
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
            this.formData.guest_name = "";
            this.formData.guest_surname = "";
            this.formData.guest_mail = "";
            this.formData.message = "";
        }
    }
};
</script>

<template>
    <div>
        <!-- Bottone per aprire il Modale -->
        <button type="button" class="btn ms_brown_btn" @click="showModal = true">
            Contattami
        </button>
       
        <!-- Modale -->
        <div v-if="showModal" class="modal fade show" tabindex="-1" role="dialog"
            aria-labelledby="contactHostModalLabel" style="display: block; background: rgba(0, 0, 0, 0.5)"
            @click.self="closeModal">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content"> 
                    <div class="modal-header justify-content-center">
                        <h5 class="modal-title text-secondary text-center w-100" id="contactHostModalLabel">
                            Lascia un messaggio. <br> Verrai contattato prima possibile
                        </h5>
                    </div>

                    <!-- Form del Modale -->

                    <div class="modal-body">
                        <form @submit.prevent="submitForm">

                            <!-- ID del dottore di riferimento -->
                            <input type="hidden" v-model="formData.doctor" />

                            <!-- Nome -->
                            <div class="form-group" style="text-align: justify">
                                <label class="my-1 text-secondary " for="guest_name">Inserisci il tuo nome*</label>
                                <input type="text" class="form-control" :class="{'is-invalid': submitted && errors.guest_name, 'is-valid': submitted && !errors.guest_name}" id="guest_name" v-model="formData.guest_name" required />
                                <div class="invalid-feedback" v-if="submitted && errors.guest_name">{{ errors.guest_name[0] }}</div>
                            </div>
                            <!-- /Nome -->

                             <!-- Cognome -->
                             <div class="form-group" style="text-align: justify">
                                <label class="my-1 text-secondary " for="guest_surname">Inserisci il tuo cognome*</label>
                                <input type="text" class="form-control" :class="{'is-invalid': submitted && errors.guest_surname, 'is-valid': submitted && !errors.guest_surname}" id="guest_surname" v-model="formData.guest_surname" required />
                                <div class="invalid-feedback" v-if="submitted && errors.guest_surname">{{ errors.guest_surname[0] }}</div>
                            </div>
                            <!-- /Cognome -->

                            <!-- Email -->
                            <div class="form-group" style="text-align: justify">
                                <label class="my-1 text-secondary " for="guest_mail">Inserisci la tua email*</label>
                                <input type="email" class="form-control" :class="{'is-invalid': submitted && errors.guest_mail, 'is-valid': submitted && !errors.guest_mail}" id="guest_mail" v-model="formData.guest_mail" required />
                                <div class="invalid-feedback" v-if="submitted && errors.guest_mail">{{ errors.guest_mail[0] }}</div>
                            </div>
                            <!-- /Email -->

                            <!-- Messaggio -->
                            <div class="form-group" style="text-align: justify">
                                <label class="my-1 text-secondary " for="message">Messaggio*</label>
                                <textarea class="form-control" :class="{'is-invalid': submitted && errors.message, 'is-valid': submitted && !errors.message}" id="message" v-model="formData.message" required></textarea>
                                <div class="invalid-feedback" v-if="submitted && errors.message">{{ errors.message[0] }}</div>
                            </div>
                            <!-- /Messaggio -->

                            <div class="mt-1 text-muted" style="text-align: justify">
                                <small>* Campi obbligatori</small>
                            </div>

                            <!-- Submit -->
                            <div class="d-flex gap-2 mt-2">
                                <button type="submit" class="btn btn-primary">Invia</button>
                                <button type="button" class="btn btn-danger" @click="closeModal" aria-label="Close">
                                    Annulla
                                </button>
                            </div>
                            <!-- /Submit -->
                        </form>
                    </div>
                    <!-- /Form del Modale -->
                </div>
            </div>
        </div>
        <!-- /Modale -->
    </div>
</template>

<style lang="scss" scoped>
.ms_brown_btn {
    background-color: rgba(146, 180, 244, 1);
    color: white;
}
@media screen and (max-width: 768px) {

button {
    font-size: 12px;
}

}
</style>