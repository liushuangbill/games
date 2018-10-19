export default class Game {
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
