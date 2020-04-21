import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import quizzStore from './quizzStore'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // then we reference it
      quizzStore
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: false
  })

  return Store
}
