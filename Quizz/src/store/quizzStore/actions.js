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
export function loadDataAction () {
  return axios.get('https://restcountries.eu/rest/v2')
    .then(response => {
      for (let i = 0; i < 249; i++) {
        if (response.data[i].capital === '') {
          console.log('Pas de capitale')
        } else {
          this.tabCapitales.push(response.data[i].capital)
          this.tabPays.push(response.data[i].translations.fr)
        }
      }
    })
    .catch(error => {
      console.log(error)
    })
}
