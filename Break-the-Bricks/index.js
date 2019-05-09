import { Game } from "./game.js"

window.addEventListener("DOMContentLoaded", () => {
  const game = new Game("#canvas")
  game.init()
})
