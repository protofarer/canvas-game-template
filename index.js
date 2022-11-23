import Game from './game/Game.js'

export const ENV = new (function() {
  this.MODE = import.meta.env ? import.meta.env.MODE : 'production'
}) ()

export function newGame() {
  new Game()
}

newGame()