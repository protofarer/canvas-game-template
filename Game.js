import CONSTANTS from './Constants'
import Panel from './Panel'
import EndDialog from './EndDialog'

export default class Game {
  constructor (container, debugMode=false) {
    this.container = container

    this.debugMode = debugMode
    this.debugDiscPositionMarker = ''

    this.canvas = document.createElement('canvas')
    this.canvas.id = 'gameCanvas'
    this.canvas.width = this.canvas.height = 800
    this.container.appendChild(this.canvas)

    this.ctx = this.canvas.getContext('2d')

    this.board = this.debugMode
      ? CONSTANTS.BOARD_INIT_DEBUG
      : CONSTANTS.BOARD_INIT_PROD
    
    this.msg = ''
    this.turnCount = 1
    this.phase = CONSTANTS.PHASE_PLAY    // new, playing, end

    this.endDialog = new EndDialog(this)

    const panelOffset = {
      x: this.boardWidth,
      y: 0
    }

    const panelDims = {
      w: 200,
      h: this.boardHeight + 2 * this.baseThickness
    }

    this.panel = new Panel(
      panelOffset,
      panelDims,
      this
    )
  }

  step() {
    this.drawAll()
    this.checkEndCondition()
    this.turnCount++
  }

  checkEndCondition() {
    console.log('IN checkEndCondition()')
  }

  end() {
    // exec end game phase
    console.log(`IN end()`, )
    this.endDialog.show()
  }

  clr() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawAll() {
    this.panel.draw()

    if (this.debugOverlay) {
      this.canvas.style.border = '1px solid red'
    } else {
      this.canvas.style.border = 'none'
    }
  }
}