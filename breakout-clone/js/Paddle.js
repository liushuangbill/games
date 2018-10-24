import Role from "./Role";

export default class Paddle extends Role {
  constructor(path) {
    super(path)
    this.width = 160
    this.height = 40
    this.x = this.canvasWidth * 0.5 - this.width * 0.5
    this.y = this.canvasHeight * 0.8
  }

  moveX(speed) {
    this.x += speed
  }

  moveY(speed) {
    this.y += speed
  }
}
