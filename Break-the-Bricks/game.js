export class Game {
  constructor(selector) {
    this.canvas = this.e(selector)
    this.ctx = canvas.getContext("2d")
    this.width = window.innerWidth * 0.8
    this.height = window.innerHeight * 0.8
    this.canvas.width = this.width
    this.canvas.height = this.height

    // paddle
    this.paddleImg = new Image()
    this.paddleImg.src = "img/paddle.png"
    this.paddleX = this.width * 0.5 - 20
    this.paddleY = this.height * 0.8
    this.toLeft = false
    this.toRight = false
    this.speed = 5
  }

  init() {
    this.addControl()
    // paddle
    this.paddleImg.onload = () => {
      this.startAnimation()
    }
  }

  e(selector, all = false) {
    return all
      ? document.querySelectorAll(selector)
      : document.querySelector(selector)
  }

  draw(img, x, y) {
    this.ctx.drawImage(img, x, y)
  }

  addControl() {
    window.addEventListener("keydown", e => {
      const k = e.key
      _handle(k, true)
    })
    window.addEventListener("keyup", e => {
      const k = e.key
      _handle(k, false)
    })

    const _handle = (key, flag) => {
      if (key === "ArrowLeft") {
        this.toLeft = flag
      } else if (key === "ArrowRight") {
        this.toRight = flag
      }
    }
  }

  startAnimation() {
    const animate = () => {
      // update x y
      if (this.toLeft) {
        this.paddleX -= this.speed
      }
      if (this.toRight) {
        this.paddleX += this.speed
      }
      // clear
      this.ctx.clearRect(0, 0, this.width, this.height)
      // redraw
      this.draw(this.paddleImg, this.paddleX, this.paddleY)

      window.requestAnimationFrame(animate)
    }
    return window.requestAnimationFrame(animate)
  }
}
