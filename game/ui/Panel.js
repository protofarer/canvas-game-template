import Constants from '../Constants'
/** Informational and Player Controls panel external to canvas element 
 * @class
 * @property {HTMLDivElement} panelContainer - Panel's top level container
 * @property {HTMLDivElement} expbar - displays Snek's exp graphically
 * @property {HTMLDivElement} infobox - container for informational elements
 * @property {HTMLDivElement} score - displays score for current level
 * @property {HTMLDivElement} level - displays Snek's level
 * @property {HTMLDivElement} gameInfo - displays Snek's exp numerically
*/
export default class Panel {
  panelContainer = document.createElement('div')

  infobox = document.createElement('div')
  infoA = document.createElement('div')
  score = document.createElement('div')

  touchContainer = document.createElement('div')
  leftButt = document.createElement('button')
  rightButt = document.createElement('button')
  actionButt = document.createElement('button')

  constructor(game) {
    this.game = game
    this.panelContainer.id = 'panel'
    this.panelContainer.className = 'layerUI'

    this.infobox.id = 'infobox'
    this.panelContainer.appendChild(this.infobox)
  
    this.infoA.id = 'infoA'
    this.infoA.className = 'infoSubBox'
    this.infobox.appendChild(this.infoA)

    this.score.id = 'info-score'
    this.infoA.appendChild(this.score)

    this.touchContainer.id = 'touch-box'
    this.panelContainer.appendChild(this.touchContainer)

    this.leftButt.id = 'left-butt'
    this.leftButt.className = 'touch-control'
    this.leftButt.innerText = 'L'
    this.touchContainer.appendChild(this.leftButt)

    this.actionButt.id= 'action-butt'
    this.actionButt.className = 'touch-control'
    this.actionButt.innerText = 'A'
    this.touchContainer.appendChild(this.actionButt)
  
    this.rightButt.id = 'right-butt'
    this.rightButt.className = 'touch-control'
    this.rightButt.innerText = 'R'
    this.touchContainer.appendChild(this.rightButt)

    // before init, for debug
    this.score.innerText = '$score'
  }

  render() {
    this.score.innerHTML = `Score: ${this.game.stateMachine.current?.score}`
  }
}