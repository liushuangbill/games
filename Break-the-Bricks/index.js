import { Game } from "./game.js"
import Paddle from "./Paddle.js"
import Ball from "./Ball.js"

window.addEventListener("DOMContentLoaded", () => {
  const game = new Game("#canvas")
  const paddle = new Paddle(
    "./img/paddle.png",
    game.width * 0.5 - 20,
    game.height - 30
  )
  const ball = new Ball(
    "./img/ball.png",
    game.width * 0.5 - 20,
    game.height - 50
  )

  game.init()
  game.registerAnctions("ArrowLeft", () => {
    paddle.moveLeft()
  })
  game.registerAnctions("ArrowRight", () => {
    paddle.moveRight()
  })
  game.registerAnctions("ArrowUp", () => {
    paddle.moveUp()
  })
  game.registerAnctions("ArrowDown", () => {
    paddle.moveDown()
  })
  game.registerAnctions("f", () => {
    ball.fire()
  })
  game.registerAnctions("draw", () => {
    game.drwaImage(paddle)
    // 如果相撞，则改变方向
    if (paddle.collide(ball)) {
      ball.wheel(paddle.y)
    }
    ball.move(game.width, game.height)
    game.drwaImage(ball)
  })
})
