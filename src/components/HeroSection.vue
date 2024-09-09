<script>
export default {
    data() {
        return {

        }
    }
}
</script>


<template>

    <div class="hero">
        <section class="welcome-section">
            <div class="welcome-text">
                <h1 class="typewriter">Benvenuti nel nostro Studio Medico</h1>
                <p class="typewriter">I migliori professionisti medici per la vostra salute.</p>
            </div>
        </section>
    </div>

</template>


<style lang="scss" scoped>
@use "../style/partials/variables" as *;

.hero {
    margin-top: 100px;
    width: 100%;
    height: 600px;
    background-image: url(../assets/img/nursing3.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    align-items: end;
}

/* Sezione di benvenuto */
.welcome-section {
    background: url('path/to/your/background.jpg') no-repeat center center;
    background-size: cover;
    padding-top: 150px;
    color: rgba(10, 54, 157, 1);
    text-align: center;
    animation: slide-down 1s ease-out;

    .welcome-text {
        display: inline-block;
        padding: 20px;
    }
}

/* Animazione per la sezione di benvenuto */
@keyframes slide-down {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Effetto di scrittura per il testo della sezione di benvenuto */
.typewriter {
    overflow: hidden;
    border-right: 5px solid rgba(146, 180, 244, 1);
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: .15em;
    animation: typing 3.5s steps(40, end), blink-caret .75s;
}

@keyframes typing {
    from {
        width: 0
    }

    to {
        width: 100%
    }
}

@keyframes blink-caret {

    from,
    to {
        border-color: transparent
    }

    50% {
        border-color: rgba(146, 180, 244, 1);
    }
}

// media responsive

@media screen and (max-width: 768px) {

    .hero {
        max-height: 300px;
    }

    .typewriter {
        font-size: 1rem;
    }
}

@media screen and (max-width: 570px) {

    .hero {
        padding: 5px;
        align-items: center;
        background-attachment: local;
        position: absolute;
        top: 70px;

        .typewriter {
            font-size: .8rem;
        }
    }
}

@media screen and (max-width: 450px) {

    .welcome-text {
        padding: 0;

        .typewriter {
            font-size: .7rem;
        }
    }
}
</style>