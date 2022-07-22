import { isMobile } from './utils.js'

export class Game {
  constructor(selector, width, height) {
    this.canvas = document.querySelector(selector)
    this.ctx = this.canvas.getContext("2d")
    this.canvas.width = width
    this.canvas.height = height

    this.stop = false
    
    this.isMobile = isMobile()
    this.touchStart = null
    
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
      this.keyDownsHandler(e.key, true)
    })
    window.addEventListener("keyup", e => {
      this.keyDownsHandler(e.key, false)
    })
    window.addEventListener("touchstart", e => {
      this.touchStart = e.changedTouches[0]
    })
    window.addEventListener("touchend", e => {
      let end = e.changedTouches[0]
      let direct = ""
      let n = 0
      let y = end.screenY - this.touchStart.screenY
      let x = end.screenX - this.touchStart.screenX
      if (y > 5) {
        n = y
        direct = "down"
      }
      if (y < -5 && y < -n) {
        n = Math.abs(y)
        direct = "up"
      }
      if (x > 5 && x > n) {
        n = x
        direct = "right"
      }
      if (x < -5 && x < -n) {
        direct = "left"
      }
      if (direct) {
        this.keyDownsHandler(direct, true)
      }
    })
  }

  keyDownsHandler = (key, down=true) => {
    if (key === "ArrowUp") {
      this.keydowns["up"] = down
    } else if (key === "ArrowDown") {
      this.keydowns["down"] = down
    } else if (key === "ArrowLeft") {
      this.keydowns["left"] = down
    } else if (key === "ArrowRight") {
      this.keydowns["right"] = down
    } else {
      this.keydowns[key] = down
    }
  }

  start = () => {
    const animate = () => {
      // clear
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      // 如果按键被按下则触发事件
      for (const key in this.actions) {
        if (this.keydowns[key]) {
          this.actions[key](this.ctx)
          if (this.isMobile) {
            this.keydowns[key] = false
          }
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
