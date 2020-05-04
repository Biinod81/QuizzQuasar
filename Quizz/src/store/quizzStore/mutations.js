// ajoute un point au score du joueur
export function ADD_POINTS (state) {
  state.scoreJoueur++
}
// remet le score du joueur à 0
export function RESET_POINTS (state) {
  state.scoreJoueur = 0
}
// augmente le numéro de la question
export function NEXT_QUESTION (state) {
  state.numQuestion++
}
// remet le numéro de la quesiotn à 0
export function RESET_NUM_QUESTION (state) {
  state.numQuestion = 1
}
// choisi le nombre de questions souhaité
export function SET_NB_QUESTION (state, n) {
  state.NBQuestion = n
}
// choisi le nombre de boutons souhaité
export function SET_NB_BOUTON (state, x) {
  state.NbBTN = x
}
// ajoute le pays au tableau tabPays
export function PUSH_PAYS (state, p, i) {
  state.tabPays.push(p)
}
// ajoute la capitale au tableau tabCapitales
export function PUSH_CAPITALE (state, c, i) {
  state.tabCapitales.push(c)
}
// vide les tableaux
export function RESET_TAB (state) {
  state.tabPays = []
  state.tabCapitales = []
}
// choisi le nombre de boutons souhaité
export function TOGGLE_RULE_DIALOG_SHOWING (state, x) {
  state.isRuleDialogAlreadyShown = true
}
