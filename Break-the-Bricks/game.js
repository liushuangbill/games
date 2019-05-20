export class Game {
  constructor(selector) {
    this.canvas = this.e(selector)
    this.ctx = canvas.getContext("2d")
    this.width = window.innerWidth * 0.4
    this.height = window.innerHeight * 0.5
    this.canvas.width = this.width
    this.canvas.height = this.height
    // 注册按键行为
    this.actions = {}
    // 记录是否按键
    this.keydowns = {}
  }

  init() {
    this.addControl()
    this.startAnimation()
  }

  e(selector) {
    return document.querySelector(selector)
  }

  drwaImage(role) {
    this.ctx.drawImage(role.image, role.x, role.y)
  }

  addControl() {
    window.addEventListener("keydown", e => {
      const k = e.key
      console.log(k)
      this.keydowns[k] = true
    })
    window.addEventListener("keyup", e => {
      const k = e.key
      this.keydowns[k] = false
    })
  }

  registerAnctions(key, fn) {
    this.actions[key] = fn
  }

  startAnimation() {
    const animate = () => {
      // 对于注册过的 action，如果对应的键被按下，则触发
      const keys = Object.keys(this.actions)
      for (const key of keys) {
        if (this.keydowns[key]) {
          this.actions[key]()
        }
      }
      // clear
      this.ctx.clearRect(0, 0, this.width, this.height)
      // draw
      // 必须注册一个 draw() 方法
      this.actions.draw()

      window.requestAnimationFrame(animate)
    }
    return window.requestAnimationFrame(animate)
  }
}
