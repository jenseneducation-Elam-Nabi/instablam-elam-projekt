<template>
  <footer>
    <button v-if="isActive" class="bell" @click="toggleNotification" title="Stäng av notisar">
      <i class="fas fa-bell"></i>
    </button>
    <button class="bell" v-else title="Sätt på notisar" @click="toggleNotification">
      <i class="far fa-bell"></i>
    </button>
    <!-- Change background color switch -->
    <i class="fas fa-toggle-off" v-if="!isToggled" @click="toggleBackground"></i>
    <i class="fas fa-toggle-on" v-else @click="toggleBackground"></i>
    <p>Copyright &copy;2020 | Created by Elam Nabi</p>
  </footer>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "footerComponent",
  data() {
    return {
      isActive: false
    };
  },
  computed: { ...mapState(["isToggled"]) },
  methods: {
    toggleNotification() {
      this.isActive = !this.isActive;
    },
    toggleBackground() {
      this.$store.commit("TOGGLE_BG_COLOR");
    }
  }
};
</script>

<style lang="scss" scoped>
footer {
  padding: 2rem 0;
  margin-top: 2rem;
  text-align: center;
  border-top: 1px solid #eee;

  .bell {
    border: none;
    outline: none;
    font-size: 2rem;
    cursor: pointer;
    background: none;
    transition: 0.3s;
    margin-bottom: 1rem;
  }
}

@media screen and (min-width: 1440px) {
  footer > #bell {
    &:hover {
      transform: scale(1.5);
    }
  }
}
</style>
