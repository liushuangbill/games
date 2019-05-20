import Role from "./Role.js"

export default class Ball extends Role {
  constructor(path, x, y) {
    super(path, x, y)
    this.speedX = 5
    this.speedY = 5
    this.fired = false
  }

  move(width, height) {
    const w = this.image.width
    const h = this.image.height
    if (this.x < 0 || this.x + w > width) {
      this.speedX *= -1
    }
    if (this.y < 0 || this.y + h > height) {
      this.speedY *= -1
    }
    if (this.fired) {
      this.x += this.speedX
      this.y += this.speedY
    }
  }

  fire() {
    this.fired = true
  }

  wheel(y) {
    // 修正
    this.y = y - this.image.height
    this.speedY *= -1
  }
}
