import Game from './Game.js'

export const ENV = new (function() {
  this.MODE = import.meta.env ? import.meta.env.MODE : 'production'
}) ()

export function newGame() {
  new Game(container)
}

newGame()