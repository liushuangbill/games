import Role from "./Role";

export default class Paddle extends Role {
  constructor(path) {
    super(path)
    this.width = 160
    this.height = 40
  }

  moveX(speed) {
    this.x += speed
  }

  moveY(speed) {
    this.y += speed
  }
}
