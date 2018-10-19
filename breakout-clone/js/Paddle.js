import Role from "./Role";

export default class Paddle extends Role {
  constructor(path) {
    super(path)
    this.width = 200
    this.height = 50
  }

  moveX(speed) {
    this.x += speed
  }

  moveY(speed) {
    this.y += speed
  }
}
