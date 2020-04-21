export function ADD_POINTS (state) {
  state.scoreJoueur++
}
export function RESET_POINTS (state) {
  state.scoreJoueur = 0
}
export function NEXT_QUESTION (state) {
  state.numQuestion++
}
export function RESET_NUM_QUESTION (state) {
  state.numQuestion = 1
}
export function SET_NB_QUESTION (state, n) {
  state.NBQuestion = n
}
export function SET_NB_BOUTON (state, x) {
  state.NbBTN = x
}
