import state from './state.js'
import * as el from './elements.js'
import { reset } from './actions.js'
import { kitchenTimer } from './sounds.js'

export function countdown(){

  clearTimeout(state.countdownId)

  if(!state.isRunning){
    return
  }

  let minutes = Number(el.minutes.textContent)
  let seconds = Number(el.seconds.textContent)

  seconds--

  if(seconds < 0){
    seconds = 59
    minutes--
  }

  if(minutes < 0){
    reset()
    kitchenTimer.play()
    return
  }

  updateDisplay(minutes, seconds)

  // executa uma função depois de determinado tempo
  state.countdownId = setTimeout(() => countdown(), 1000)
}

export function updateDisplay(minutes, seconds){
  minutes = minutes ?? state.minutes /*nullish coalesing operator  ele observa minutes, caso ele seja null pega o state.minutes e bota no lugar */
  seconds = seconds ?? state.seconds

  // .padStart o que voce quer ver primeiro

  el.minutes.textContent = String(minutes).padStart(2, "0")
  el.seconds.textContent = String(seconds).padStart(2, "0")
}