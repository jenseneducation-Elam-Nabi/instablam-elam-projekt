<template>
  <div id="app" :class="{ 'set-dark-mode' :  isToggled }">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { mapState } from "vuex";
export default {
  name: "app",
  components: {
    Header,
    Footer
  },
  computed: { ...mapState(["isToggled"]) }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body,
input,
::placeholder {
  font-family: "Open Sans", sans-serif;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 47%,
    rgba(148, 187, 233, 1) 100%
  );
}
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: space-between;

  &.set-dark-mode {
    background-color: rgb(145, 159, 160);
  }
}
</style>
