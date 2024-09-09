<script>
import { RouterLink } from "vue-router";
import { store } from "../store.js";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    backToTheTop() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<template>
  <header>
    <nav>
      <ul>
        <li class="box-img">
          <router-link :to="{ name: 'home' }">
            <img
              src="../assets/img/logo-1.png"
              alt="logo B-Doctors"
              @click="backToTheTop()"
            />
          </router-link>
        </li>
        <li id="title">
          <a href="#footer">Contattaci</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@use "../style/partials/variables" as *;

header {
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: $celtic-blue;
    z-index: 9999;

    .test{
        list-style-type: none;
    }

    nav {
        width: 100%;
        padding: 20px;
        padding-right: 27px;
        height: 100%;

        ul {
            display: flex;
            justify-content: space-between;
            align-items: center;


            .box-img {
                display: flex;
                justify-content: start;

                img {
                    //height: 60px;
                    //display: block;
                    max-width: 45%;
                    //aspect-ratio: 1;
                }
            }

            #title {
                list-style-type: none;

                a {
                    text-decoration: none;
                    color: white;
                    position: relative;
                    display: inline-block;

                    &::after {
                        content: '';
                        position: absolute;
                        left: 0;
                        bottom: -5px;
                        width: 0;
                        height: 3px;
                        background-color: $columbia-blue;
                        transition: width 0.5s ease-in-out;
                    }

                    &:hover::after {
                        width: 100%;
                    }
                }

            }
        }
    }

/* Breakpoint 1024px */
@media (max-width: 1024px) {

nav{

height: 100%;
display: flex;
justify-content: space-between;
align-items: center;
padding-right: 27px;

ul {
    padding: 0%;
    margin: 0;
    padding-right: 21px;
    width: 100%;
}

}

}

/* Breakpoint 768px */
@media (max-width: 768px) {

    nav{

    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;

    ul {
        padding: 0%;
        margin: 0;
        padding-right: 21px;
        width: 100%;
  }

}

}

    /* Breakpoint 450px */
@media (max-width: 450px) {
 nav{

    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 20px;

    ul {
        padding: 0%;
        margin: 0;
        padding-right: 10px;
    }
  }

}
}
</style>
