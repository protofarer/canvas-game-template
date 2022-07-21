export class snek {
  stats = {
    r: 5,
  }
  state = {
    headCoords: { x: 400, y: 400 },
    direction: 0,
    slitherSpeed: 5,
  }

  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.initEventListeners()
  }

  initEventListeners() {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'd':
          this.state.direction += 1
          break
        case 'a':
          this.state.direction -= 1
          break
        default:
          break
      }
    }
    document.addEventListener('keydown', handleKeyDown)
  }

  step() {
    this.headCoords.x += this.slitherSpeed * Math.cos(this.direction)
    this.headCoords.y += this.slitherSpeed * Math.sin(this.direction)
    this.drawSnake()
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
