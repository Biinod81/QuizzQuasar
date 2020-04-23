import axios from 'axios'

export function addPts (context) {
  context.commit('ADD_POINTS')
}
export function resetPts (context) {
  context.commit('RESET_POINTS')
}
export function nextQuestion (context) {
  context.commit('NEXT_QUESTION')
}
export function resetNumQuestion (context) {
  context.commit('RESET_NUM_QUESTION')
}
export function setNbQuestion (context, n) {
  context.commit('SET_NB_QUESTION', n)
}
export function setNbBouton (context, x) {
  context.commit('SET_NB_BOUTON', x)
}
// récupère tous les pays / capitales de restcountries
export function loadData (context) {
  return axios.get('https://restcountries.eu/rest/v2')
    .then(response => {
      for (let i = 0; i < 249; i++) {
        // permet de ne pas choisir les pays sans capitales (pour ne pas avoir de bouton vide)
        if (response.data[i].capital !== '') {
          context.commit('PUSH_CAPITALE', response.data[i].capital)
          context.commit('PUSH_PAYS', response.data[i].translations.fr)
        }
      }
    })
    .catch(error => {
      console.log(error)
    })
}
export function resetTab (context) {
  context.commit('RESET_TAB')
}
