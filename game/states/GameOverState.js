import BaseState from './BaseState'
import Snek from '../ents/mobs/Snek'
import SnekEndDialog from '../ui/SnekEndDialog'

/**
 * 
 * @property {Number} score - number of items snek has swallowed
 */
export class GameOverState extends BaseState {
  stateName = 'gameOver'

  constructor(game, params) {
    super()
    this.game = game
    const data = {
      level: params?.level ?? 'null',
      score: params?.score ?? 'null',
      isVictory: params?.isVictory
    }

    this.endDialog = new SnekEndDialog(this.game, data)
    this.endDialog.show()
    this.game.panel.render()
  }

  update() {
  }

  render() {
    this.endDialog.render()
  }

  exit() {
  }
}