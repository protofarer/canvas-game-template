import Disc from './Disc'
import CONSTANTS from './Constants'
import Panel from './Panel'
import EndDialog from './EndDialog'
import initSounds from './audio'

export default class Game {
  constructor (container, debugMode=false) {
    this.container = container

    this.debugMode = debugMode
    this.debugDiscPositionMarker = ''

    this.canvas = document.createElement('canvas')
    this.canvas.id = 'gameCanvas'
    this.container.appendChild(this.canvas)

    this.ctx = this.canvas.getContext('2d')

    this.board = this.debugMode
      ? CONSTANTS.BOARD_INIT_DEBUG
      : CONSTANTS.BOARD_INIT_PROD

    
    this.mouseCoords = { 
      canvas: {
        x: 0, y: 0
      },
      board: {
        x: 0, y: 0
      },
      client: {
        x: 0, y: 0
      },
      square: {
        col: 0, row: 0
      }
    }

    this.msg = ''
    this.turnCount = 1
    this.phase = CONSTANTS.PHASE_PLAY    // new, playing, end

    this.boardHeight = 800
    this.boardWidth = 800

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

    this.canvas.width = this.boardWidth
    this.canvas.height = this.boardHeight

    this.rect = this.canvas.getBoundingClientRect()

    this.setupEventListeners()

    this.pointerCoords = { 
      canvas: {
        x: 0, y: 0
      },
      board: {
        x: 0, y: 0
      },
      client: {
        x: 0, y: 0
      },
      square: {
        col: 0, row: 0
      }
    }
    this.ongoingTouches = new Array()
  }


  nextTurn() {
    this.checkEndCondition()
    this.turnCount++
    this.msg = ''
  }

  setupEventListeners() {
    const handlePointerStart = (e) => {
      this.ongoingTouches.push(this.copyTouch(e))
    }

    const handlePointerMove = (e) => {
      // Scrolled window is not supported
      
      // Mouse coordinates relative to canvas
      this.pointerCoords.canvas.x = e.clientX - this.rect.left // + window.scrollX
      this.pointerCoords.canvas.y = e.clientY - this.rect.top // + window.scrollY

      // Mouse coordinates relative to play area
      this.pointerCoords.board.x = e.clientX - this.rect.left - this.playAreaOffset.x // + window.scrollX
      this.pointerCoords.board.y = e.clientY - this.rect.top - this.playAreaOffset.y // + window.scrollYA

      // Mouse coordinates relative to window
      this.pointerCoords.client.x = e.clientX // + window.scrollX
      this.pointerCoords.client.y = e.clientY // + window.scrollY
          
      // Calculate row,col from mouse coords
      this.pointerCoords.square.col = Math.floor((parseFloat((this.pointerCoords.board.x)/100,2).toFixed(2)))
      this.pointerCoords.square.row = Math.floor(parseFloat((this.pointerCoords.board.y)/100,2).toFixed(2))
    }

    const handlePointerEnd = (e) => {
      const idx = this.ongoingTouchIndexById(e.pointerId)
      this.ongoingTouches.splice(idx, 1)
    }

    function handlePointerCancel(e) {
      console.log(`pointercancel: id = ${e.pointerId}`, )
      const idx = this.ongoingTouchIndexById(e.pointerId)
      this.ongoingTouches.splice(idx, 1)
    }

    this.canvas.addEventListener('pointerdown', handlePointerStart, false)
    this.canvas.addEventListener('pointerup', handlePointerEnd, false)
    this.canvas.addEventListener('pointercancel', handlePointerCancel, false)
    this.canvas.addEventListener('pointermove', handlePointerMove, false)
    console.info('EventHandlers initialized')
  }

  ongoingTouchIndexById(idToFind) {
    for (let i = 0; i < this.ongoingTouches.length; i++) {
      let id = this.ongoingTouches[i].identifier

      if (id == idToFind) {
        return i
      }
    }
    return -1
  }

  copyTouch(touch) {
    return { identifier: touch.pointerId, pageX: touch.clientX, pageY: touch.clientY }
  }

  checkEndCondition() {
    console.log('End Game Condition Check')
  }

  end() {
    // Initiate end game phase
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