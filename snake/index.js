import { Game } from '../game.js'
import { throttle, randomN } from '../utils.js'

class Snake {
  constructor(points, speed = 100) {
    this.points = points
    this.size = 10
    this.direction = "left"
    this.throttleMove = throttle(this.move, speed)
  }

  draw = (ctx) => {
    this.throttleMove(ctx, this.direction)
    this.points.forEach((point, i) => {
      ctx.fillStyle = 'lightgreen'
      if (i == 0) { 
        ctx.fillStyle = '#ddf502'
      }
      ctx.fillRect(point.x, point.y, this.size, this.size)
      ctx.strokestyle = 'darkgreen'
      ctx.strokeRect(point.x, point.y, this.size, this.size)
    })
  }

  collide = (role) => {
    const head = this.points[0]
    if (role.y < head.y + this.size && role.y + this.size > head.y) {
      return (role.x < head.x + this.size && role.x + this.size > head.x)
    }
    return false
  }

  grow = (ctx) => {
    this.move(ctx, this.direction, true)
  }

  isDie = (ctx) => {
    const head = this.points[0]
    return this.points.some((point, i) => {
      if (i > 0) {
        return head.x == point.x && head.y == point.y
      }
      return false
    })
  }

  move = (ctx, nowDirection, grow = false) => {
    const head = this.points[0]
    const p = {x: head.x, y: head.y}
    const maxWidth = ctx.canvas.width
    const maxHeight = ctx.canvas.height
    if (nowDirection === 'left') {
      p.x = head.x - this.size
      if (p.x < 0) {
        p.x = maxWidth - this.size
      }
    } else if (nowDirection === 'right') {
      p.x = head.x + this.size
      if (p.x > maxWidth) {
        p.x = this.size
      }
    } else if (nowDirection === 'top') {
      p.y = head.y - this.size
      if (p.y < 0) {
        p.y = maxHeight - this.size
      }
    } else if (nowDirection === 'bottom') {
      p.y = head.y + this.size
      if (p.y > maxHeight) {
        p.y = this.size
      }
    }
    this.points.unshift(p)
    if (!grow) {
      this.points.pop()
    }
    return true
  }

  changeDirect = (direct) => {
    if (direct === 'left') {
      if (this.direction === 'right') {
        return false
      }
    } else if (direct === 'right') {
      if (this.direction === 'left') {
        return false
      }
    } else if (direct === 'top') {
      if (this.direction === 'bottom') {
        return false
      }
    } else if (direct === 'bottom') {
      if (this.direction === 'top') {
        return false
      }
    }
    this.direction = direct
    return true
  }

  moveLeft = (ctx) => {
    this.changeDirect('left')
  }

  moveRight = (ctx) => {
    this.changeDirect('right')
  }

  moveTop = (ctx) => {
    this.changeDirect('top')
  }

  moveBottom = (ctx) => {
    this.changeDirect('bottom')
  }
}

class Dot {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = 10
  }

  remake = (ctx, snake) => {
    let p = {x: 0, y: 0}
    for (let i = 0; i < 100; i++) {
      p.x = randomN(0, ctx.canvas.width)
      p.y = randomN(0, ctx.canvas.height)
      if (!snake.collide(p)) {
        break
      }
    }
    this.x = p.x
    this.y = p.y
  }

  draw = (ctx) => {
    ctx.fillStyle = 'red'
    ctx.fillRect(this.x, this.y, this.size, this.size)
    ctx.strokestyle = 'red'
    ctx.strokeRect(this.x, this.y, this.size, this.size)
  }
}

function main() {
  let point = 0
  let pointEle = document.querySelector(".point")
  let width = 300, height = 300
  showPoint(pointEle, point)
  const game = new Game("#canvas", width, height)
  const snake = new Snake([{x: 110, y: 150}, {x: 120, y: 150}, {x: 130, y: 150}, {x: 140, y: 150}, {x: 150, y: 150},], 80)
  const dot = new Dot(randomN(0, width), randomN(0, height))
  game.registerAction("up", (ctx) => {
    snake.moveTop(ctx)
  })
  game.registerAction("down", (ctx) => {
    snake.moveBottom(ctx)
  })
  game.registerAction("left", (ctx) => {
    snake.moveLeft(ctx)
  })
  game.registerAction("right", (ctx) => {
    snake.moveRight(ctx)
  })
  game.registerAction("draw", (ctx) => {
    game.drawRole(snake)
    game.drawRole(dot)
    if (snake.collide(dot)) {
      dot.remake(ctx, snake)
      snake.grow(ctx)
      point += 10
      showPoint(pointEle, point)
    }
    if (snake.isDie(ctx)) {
      showPoint(pointEle, point + "<div>game over<div>")
      game.end()
    }
  })
  game.start()
}

function showPoint(ele, point) {
  ele.innerHTML = point
}

main()
