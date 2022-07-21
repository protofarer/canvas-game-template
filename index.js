import Game from './Game.js'
import CONSTANTS from './Constants.js'
import externalUI from './init.js'
import DebugGUI from './DebugGUI.js'

export const ENV = new (function() {
  this.MODE = import.meta.env ? import.meta.env.MODE : 'production' 
})()

// **********************************************************************
// * Setup Document
// **********************************************************************

document.title = 'Snake!'
const container = document.createElement('div')
container.id = 'container'
document.body.appendChild(this.container)


// **********************************************************************
// ********************   Setup Game: PHASE_SETUP
// **********************************************************************


// DEF debugMode true: debug board arrangement with debugOverlay
// DEF debugMode false: production board arrangement w/o debugOverlay
// DEF debugOverlay: debug gui + overlay
// 1. reset to normal play: no debug
// 2. reset to normal play with debug gui + overlay
// 3. reset to debugMode, all debug on

let initDebugMode = window.location.hash === '#debugmode' ? true : false

// **********************************************************************
// ********************   Play Game: PHASE_PLAY
// **********************************************************************

export function startNewGame(debugMode=false) {
  let game = new Game(container, debugMode)

  let debugGUI = import.meta.env.DEV ? new DebugGUI(game) : null

  let loopID = requestAnimationFrame(draw())
  function draw(t) {
    game.clr()
    game.step()

    loopID = requestAnimationFrame(draw)

    debugGUI ?? debugGUI.calcFPS(t)

    // Enter PHASE_END via game.checkEndCondition()
    if (game.phase === CONSTANTS.PHASE_END) {
      cancelAnimationFrame(loopID)
      game.end()
    }
  }

}
startNewGame(initDebugMode)

export function resetGame(toDebug=false) {
  const currURL = new URL(window.location.href)
  if (import.meta.env.DEV) {
    currURL.hash = toDebug ? '#debugmode' : '#nodebug'
  }
  location.replace(currURL.toString())
  location.reload()
}