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
