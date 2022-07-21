export class snek {
  stats = {
    r: 5,
  }
  state = {
    headCoords: { x: 400, y: 400 },
    direction: 0,
  }

  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.initEventListeners()
  }

  initEventListeners() {
    const handleKeyDown = (e) => {
    }
    document.addEventListener('keydown', handleKeyDown)
  }

  drawSnake() {
    this.ctx.save()
    this.ctx.translate(this.headPosition.x, this.headPosition.y)
    this.ctx.beginPath()
    this.ctx.arc(0, 0, this.snekRadius, 0, 2 * Math.PI)
    this.ctx.lineWidth = 2
    this.ctx.strokeStyle = 'green'
    this.ctx.stroke()
    this.ctx.restore()
  }
}
