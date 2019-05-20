import Role from "./Role.js"

export default class Paddle extends Role {
  constructor(path, x, y, speed = 5) {
    super(path, x, y)
    this.speed = speed
  }

  moveLeft() {
    this.x -= this.speed
  }

  moveRight() {
    this.x += this.speed
  }

  moveUp() {
    this.y -= this.speed
  }

  moveDown() {
    this.y += this.speed
  }
}
