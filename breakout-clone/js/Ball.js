import Role from "./Role";

export default class Ball extends Role {
  constructor(path) {
    super(path)
    this.fired = false
    this.speedX = 5
    this.speedY = 10
    this.x = 0
    this.y = 0
  }

  move() {
    if (this.fired) {
      if (this.y < 0 || this.y > this.canvasHeight - this.height) {
        this.restoration()
        this.veerY()
      }
      if (this.x < 0 || this.x > this.canvasWidth - this.width) {
        this.restoration()
        this.veerX()
      }
      this.y -= this.speedY
      this.x -= this.speedX
    }
  }

  fire() {
    this.fired = true
  }

  veerX() {
    this.speedX = -this.speedX
    if (this.speedX >= 0) {
      this.speedX = this.random()
    } else {
      this.speedX = -this.random()
    }
  }

  veerY() {
    this.speedY = -this.speedY
    if (this.speedY >= 0) {
      this.speedY = this.random()
    } else {
      this.speedY = -this.random()
    }
  }

  // 与板碰撞后的复位
  restorationPaddle(role) {
    const yT = this.y,
      yB = this.y + this.height,
      xL = this.x,
      xR = this.x + this.width
    const roleyT = role.y,
      roleyB = role.y + role.height,
      rolexL = role.x,
      rolexR = role.x + this.width

    if (Math.abs(yT - roleyB) < Math.abs(yB - roleyT)) {
      this.y = roleyB
      return
    } else if (Math.abs(yT - roleyB) > Math.abs(yB - roleyT)) {
      this.y = roleyT - this.height
      return
    }
    if (Math.abs(xL - rolexR) < Math.abs(xR - rolexL)) {
      this.x = rolexR
      return
    } else if (Math.abs(xL - rolexR) > Math.abs(xR - rolexL)) {
      this.x = rolexL - this.width
      return
    }
  }

  // 与边界碰撞后的复位
  restoration() {
    if (this.y < 0) {
      this.y = 0
    }
    if (this.y > this.canvasHeight - this.height) {
      this.y = this.canvasHeight - this.height
    }
    if (this.x < 0) {
      this.x = 0
    }
    if (this.x > this.canvasWidth - this.width) {
      this.x = this.canvasWidth - this.width
    }
  }
}
