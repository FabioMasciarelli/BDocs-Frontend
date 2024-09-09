<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import HomePage from './pages/HomePage.vue'

export default {
  components: {
    HomePage,
    Header,
    Footer,
  },
  data() {
    return {

    }
  },

}
</script>

<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<style scoped lang="scss"></style>
