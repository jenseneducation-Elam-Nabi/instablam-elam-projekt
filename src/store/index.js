import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isToggled: false
  },
  mutations: {
    TOGGLE_BG_COLOR(state) {
      state.isToggled = !state.isToggled
      console.log(state.isToggled)
    }
  },
  actions: {
  },
  modules: {
  }
})
