export default class Role {
  constructor(path) {
    this.canvasWidth = 400
    this.canvasHeight = 400
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

  // 碰撞判断
  collide(role) {
    if (role.y + role.height > this.y && role.y < this.y + this.height) {
      if (role.x + role.width > this.x && role.x < this.x + this.width) {
        return true
      }
    }
    return false
  }

  // 产生0-10的随机数
  random() {
    return Math.ceil(Math.random() * 10)
  }
}
