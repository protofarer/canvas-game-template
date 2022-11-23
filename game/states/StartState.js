import BaseState from './BaseState'
import Snek from '../ents/mobs/Snek'
import ModalButton from '../ui/ModalButton'
import { recycle } from '../utils/helpers'

export class StartState extends BaseState {
  modes = ['Normal', 'Other']
  mode = 0
  stateName = 'start'

  constructor(game) {
    super()
    console.log(`Entered StartState`, )
    
    this.game = game
    this.game.panel.panelContainer.style.setProperty('visibility', 'hidden')

    // TODO adapt to whether user is on mobile or desktop
    this.handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          this.mode = (++this.mode) % this.modes.length
          break
        case 'ArrowUp':
          this.mode = (
              --this.mode < 0 ? this.modes.length - 1 : this.mode
            ) % this.modes.length
          break
        case 'Enter':
          if (this.modes[this.mode] === 'Other') {
            this.game.stateMachine.change('playOther', {
              level: 's',
              score: 0
            })
          } else if (this.modes[this.mode] === 'Normal') {
            this.game.stateMachine.change('play', {
              level: 1,
              score: 0
            })
          }
          break
      }
    }
    document.addEventListener('keydown', this.handleKeyDown)

    const normalButtData = {
      origin: { 
        x: this.game.canvas.width * 0.35, 
        y: this.game.canvas.height * 0.35, 
      },
      base: { w: 125, },
      label: 'Play!',
    }
    this.normalButt = new ModalButton(
      null,
      this.game.ctx,
      normalButtData,
      () => this.game.stateMachine.change('play', {
        level: 1,
        score: 0
      }),
      { once: true }
    )
    this.normalButt.show()

    const otherButtData = {
      origin: { 
        x: this.game.canvas.width * 0.35, 
        y: this.game.canvas.height * 0.45, 
      },
      base: { w: 125, },
      label: 'Other Mode',
    }
    this.otherButt = new ModalButton(
      null,
      this.game.ctx,
      otherButtData,
      () => this.game.stateMachine.change('playOther', {
        score: 0
      }),
      { once: true }
    )
    this.otherButt.show()
  }

  update() {
  }

  render() {
    this.game.ctx.beginPath()
    this.game.ctx.fillStyle = 'hsla(135, 70%, 35%)'
    this.game.ctx.fillRect(
      0, 0, 
      this.game.canvas.width, this.game.canvas.height
    )

    this.normalButt.render()
    this.otherButt.render()
    this.game.ctx.font = '16px Arial'
    this.game.ctx.fillStyle = 'darkred'
    this.game.ctx.fillText('- portrait orientation only', 55, 100)
    this.game.ctx.fillText('- A = turn left, D = turn right', 55, 125)
    this.game.ctx.font = '12px Mono'
    this.game.ctx.fillText('version text', 10, 550)
    this.game.world.render()
  }

  exit() {
    document.removeEventListener('keydown', this.handleKeyDown)

    // ! TODO removeEventListener in class Button not working as intended
    this.normalButt.removeClickListener()
    this.otherButt.removeClickListener()
    // ! workaround
    this.otherButt.path = new Path2D()
    this.otherButt.path = new Path2D()
    this.game.panel.panelContainer.style.setProperty('visibility', 'visible')
  }
}