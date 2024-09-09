<script>
import { store } from "../store.js";
import axios from "axios";
export default {
    data() {
        return {
            store,
        }
    },
    
}
</script>

<template>
    <footer id="footer">
        <div class="footer-top">
            <div class="contact-us text-center">
                <div class="box-img">
                    <img src="../assets/img/logo-1.png" alt="Logo B-Doctors" class="img-fluid" />
                </div>
                <h3 class="ms-3 " >Sei un professionista?</h3>
                <h3 >Contattaci</h3>
               <a :href="`${store.apiBaseURL}/register`" target="_blank" class="text-decoration-underline" style="text-decoration: none; color:white; font-size: 1.5rem;"> Unisciti a noi</a>
               <span>Oppure</span>
               <a :href="`${store.apiBaseURL}`" target="_blank" class="text-decoration-underline" style="text-decoration: none; color:white; font-size: 1.5rem;">Accedi</a>
                <div class="contacts">
                    <div class="cellphone">
                    
                        <a href="tel:+443384893124">+(44) 3384893124</a>
                        <a href="tel:+442482457890">+(44) 2482457890</a>
                    </div>
                    <ul class="social">
                        <li>
                            <a href="https://x.com/?lang=it">
                                <i class="fa-brands fa-x-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/simone.bonvecchio/?locale=it_IT">
                                <i class="fa-brands fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/">
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- <div class="form-contact">
                <h4>Aiutaci a migliorare la tua esperienza</h4>

                <form action="">
                    <input type="text" id="name" placeholder="Inserisci il tuo nome" aria-label="name">

                    <input type="email" id="email" placeholder="Inserisci una mail valida" aria-label="email">

                    <textarea id="message" aria-label="message" placeholder="Come possiamo migliorare?"></textarea>

                    <div id="submit">
                        <button type="submit">Invia</button>
                    </div>
                </form>
            </div> -->
        </div>
        <div class="footer-bottom">
            <h4>© 2024 B-Doctors. All Rights Reserved.</h4>
        </div>
    </footer>
</template>

<style scoped lang="scss">
@use "../style/partials/variables" as *;

footer {
    width: 100%;

    .footer-top {
        color: white;
        background-color: $celtic-blue;
        padding: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;

        .contact-us {
            width: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .box-img {
                width: 100%;
                display: flex;
                justify-content: center;
                text-align: center;

                img {
                    width: 55%;
                    margin-bottom: 20px;
                }
            }

            .contacts {
                margin-top: 20px;

                .cellphone {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    margin-bottom: 40px;

                    a {
                        text-decoration: none;
                        color: white;
                    }
                }
            }

            .social {
                padding-left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;

                li {
                    margin-left: 0;
                    list-style-type: none;

                    a {
                        text-decoration: none;
                        color: white;
                        font-size: 1.6rem;
                    }
                }
            }
        }

        .form-contact {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;

            form {
                width: 100%;
                gap: 30px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;

                input {
                    color: white;
                    width: 100%;
                    border: 0;
                    border-bottom: 1px solid white;
                    background-color: transparent;

                }

                :focus {
                    border-color: transparent;
                }

                ::placeholder {
                    text-align: start;
                    color: white;
                }

                textarea {
                    color: white;
                    outline: none;
                    resize: none;
                    width: 100%;
                    background-color: transparent;
                    border: 0;
                    border-bottom: 1px solid white;
                }

                button {
                    color: $celtic-blue;
                    padding: 6px 12px;
                    border: 0;
                    border-radius: 12px;
                }
            }
        }
    }

    .footer-bottom {
        height: 50px;
        background-color: black;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;

        h4 {
            font-size: .9rem;
        }
    }

    @media screen and (max-width: 992px) {
        .footer-top {
            flex-direction: column;
            align-items: center;
            text-align: center;

            .contact-us {
                width: 80%;
            }

            .box-img img {
                width: 75%;
            }
        }
    }

    @media screen and (max-width: 576px) {
        .footer-top {
            .contact-us {
                width: 100%;
            }

            .box-img img {
                width: 100%;
            }
        }
    }
}
</style>
