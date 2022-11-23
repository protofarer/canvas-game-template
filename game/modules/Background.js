import Constants from '../Constants'
/** 
 * Background canvas renders at bottom-most layer in canvas stack 
 * @class
 */
export default class Background {
  canvas = document.createElement('canvas')
  constructor(container, fillStyle='') {
    this.container = container
    this.canvas.id = 'layerBackground'
    this.canvas.width = Constants.CANVAS_WIDTH
    this.canvas.height = Constants.CANVAS_HEIGHT
    this.fillStyle = fillStyle
    
    this.container.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')
    this.draw()
  }

  draw() {
    this.ctx.fillStyle = this.fillStyle
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}