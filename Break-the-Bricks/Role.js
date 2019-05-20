export default class Role {
  constructor(path, x, y) {
    this.image = new Image()
    this.image.src = path
    this.x = x
    this.y = y
  }

  collide(role) {
    const rw = role.image.width
    const rh = role.image.height
    const w = this.image.width
    const h = this.image.height
    // y 轴相交
    if (role.y + rh > this.y && role.y < this.y + h) {
      // x 轴相交
      if (role.x + rw > this.x && role.x < this.x + w) {
        return true
      }
    }
    return false
  }
}
