import store from "."

const state = {
    scoreJoueur: 0
}

const getters = {
    getScoreJoueur: state => state.scoreJoueur
}

const mutations = {
    ADD_POINT: (state) => {
        state.scoreJoueur++
    },
    RESET_SCORE: (state) => {
        state.scoreJoueur = 0
    }
}

const actions = {
    addPoint: (state) => {
        store.commit('ADD_POINT')
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}