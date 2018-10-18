document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.querySelector('#canvas')
  const game = new Game(canvas)
  const paddle = new Paddle('./images/lol.jpg')
  const ball = new Ball('./images/konglong.png')
  // 根据按键注册actions
  game.registerAction('ArrowUp', () => {
    paddle.moveY(-paddle.speed)
  })
  game.registerAction('ArrowRight', () => {
    paddle.moveX(paddle.speed)
  })
  game.registerAction('ArrowDown', () => {
    paddle.moveY(paddle.speed)
  })
  game.registerAction('ArrowLeft', () => {
    paddle.moveX(-paddle.speed)
  })
  game.draw = () => {
    game.drawImage(paddle)
    game.drawImage(ball)
  }
  game.update = () => {
    ball.move()
  }
})


class Game {
  constructor(canvas) {
    this.ctx = this.initCanvas(canvas)
    // 移动频率
    this.frequency = 1000 / 30
    // 记录所有按键，减少模板式代码 
    // ArrowUp,ArrowRight,ArrowDown,ArrowLeft
    this.keydowns = {}
    // 储存注册的action
    this.actions = {}
    this.init()
  }

  init() {
    // 添加键盘事件
    document.addEventListener('keydown', (e) => {
      this.keydowns[e.key] = true
    })
    document.addEventListener('keyup', (e) => {
      this.keydowns[e.key] = false
    })

    // 根据键盘事件触发注册的action
    this.timmer = setInterval(() => {
      const keys = Object.keys(this.keydowns)
      for (const key of keys) {
        if (this.keydowns[key] && this.actions[key]) {
          this.actions[key]()
        }
      }
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 重绘绘制多个图
      this.draw()
      // 每次重绘进行操作
      this.update()
    }, this.frequency)
  }

  // 注册keydown的action
  registerAction(key, callback) {
    this.actions[key] = callback
  }

  // 初始化canvas上下文
  initCanvas(canvas) {
    const ctx = canvas.getContext('2d')
    return ctx
  }

  // 通过canvas画图
  drawImage(role) {
    this.ctx.drawImage(role.img, role.x, role.y, role.width, role.height);
  }

  draw() { }

  update() { }
}

class Role {
  constructor(path) {
    // 宽高
    this.width = 50
    this.height = 50
    // 坐标
    this.x = 80
    this.y = 200
    // 速度和频率
    this.speed = 5
    this.img = new Image()
    this.img.src = path
  }
}

class Paddle extends Role {
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

class Ball extends Role {
  constructor(path) {
    super(path)
  }

  move() {
    console.log('move');

  }
}
