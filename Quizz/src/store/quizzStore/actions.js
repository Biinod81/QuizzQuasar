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
