import { throttle } from './utils.js'

export class Game {
  constructor(selector, width, height) {
    this.canvas = document.querySelector(selector)
    this.ctx = this.canvas.getContext("2d")
    this.canvas.width = width
    this.canvas.height = height
    this.stop = false
    // 按键行为
    this.actions = {}
    // 按键是否被按下
    this.keydowns = {}
    this.addControl()
  }

  drawRole = (role) => {
    if (role.draw) {
      role.draw(this.ctx)
    }
  }

  registerAction = (key, fn) => {
    this.actions[key] = fn
  }

  addControl = () => {
    window.addEventListener("keydown", e => {
      this.keydowns[e.key] = true
    })
    window.addEventListener("keyup", e => {
      this.keydowns[e.key] = false
    })
  }

  start = () => {
    const animate = () => {
      // clear
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      // 如果按键被按下则触发事件
      for (const key in this.actions) {
        if (this.keydowns[key]) {
          this.actions[key](this.ctx)
        }
      }
      if (this.actions["draw"]) {
        this.actions["draw"](this.ctx)
      }
      if (!this.stop) {
        this.animateId = window.requestAnimationFrame(animate)
      }
    }
    this.animateId = window.requestAnimationFrame(animate)
  }

  end = () => {
    window.cancelAnimationFrame(this.animateId)
    this.stop = true
  }
}
