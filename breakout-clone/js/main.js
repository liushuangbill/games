import Game from "./Game";
import Paddle from "./Paddle";
import Ball from "./Ball";

import lol from "../images/lol.jpg";
import konglong from "../images/konglong.png";
import { canvasWidth, canvasHeight } from "./constant";

document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.querySelector('#canvas')
  canvas.width = canvasWidth
  canvas.height = canvasHeight

  const game = new Game(canvas)
  const paddle = new Paddle(lol)
  const ball = new Ball(konglong)
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
  game.registerAction(' ', () => {
    ball.fire()
  })
  // 图片绘制
  game.draw = () => {
    game.drawImage(paddle)
    game.drawImage(ball)
  }
  // 每一帧调用
  game.update = () => {
    ball.move()
    if (paddle.collide(ball)) {
      ball.restorationPaddle(paddle)
      ball.veerX()
      ball.veerY()
    }
  }
})
