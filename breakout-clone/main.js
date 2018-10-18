document.addEventListener('DOMContentLoaded', function () {
  const game = new Game()
  game.draw()
})


class Game {
  constructor() {
    this.ctx = this.initCanvas()
    this.x = 0
    this.y = 0
  }

  // 初始化canvas上下文
  initCanvas() {
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')
    return ctx
  }

  // 通过canvas画图
  draw() {
    this.img = new Image()
    this.img.src = './konglong.png'
    // 使用箭头函数控制this的正确指向
    this.img.onload = () => {
      this.ctx.drawImage(this.img, this.x, this.y, 50, 50);
    }
    // 添加键盘事件
    document.addEventListener('keydown', this.move.bind(this))
  }

  // 键盘控制
  move(e) {
    const key = e.key
    switch (key) {
      case 'ArrowUp':
        this.y -= 5
        break
      case 'ArrowRight':
        this.x += 5
        break
      case 'ArrowDown':
        this.y += 5
        break
      case 'ArrowLeft':
        this.x -= 5
        break
    }
    this.redraw()
  }

  // 重绘
  redraw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.drawImage(this.img, this.x, this.y, 50, 50);
  }
}
