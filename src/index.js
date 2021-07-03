import './index.scss'
import femaleWalk from './assets/Female-2-Walk.png'

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
const spriteWidth = 48
const spriteHeight = 48
const shots = 3
let cycle = 0
let moveDirection = null
let pY = 300 - spriteHeight / 2
let pX = 300 - spriteWidth / 2

const DIRECTIONS = {
  bottom: 0,
  left: spriteHeight,
  right: spriteHeight * 2,
  up: spriteHeight * 3,
}

function keyDownHandler(e) {
  if (e.key === 'down' || e.key === 'ArrowDown') {
    moveDirection = 'bottom'
  }
  if (e.key === 'up' || e.key === 'ArrowUp') {
    moveDirection = 'up'
  }
  if (e.key === 'left' || e.key === 'ArrowLeft') {
    moveDirection = 'left'
  }
  if (e.key === 'right' || e.key === 'ArrowRight') {
    moveDirection = 'right'
  }
}

function keyUpHandler() {
  moveDirection = null
}

function startCycle() {
  cycle = (cycle + 1) % shots
}

document.addEventListener('keydown', keyDownHandler)
document.addEventListener('keyup', keyUpHandler)

const img = document.createElement('img')
img.src = femaleWalk

img.addEventListener('load', () => {
  setInterval(() => {
    switch (moveDirection) {
      case 'bottom':
        if (pY < 600 - spriteHeight) {
          pY += 10
          startCycle()
        }
        break
      case 'up':
        if (pY > 0) {
          pY -= 10
          startCycle()
        }
        break
      case 'left':
        if (pX > 0) {
          pX -= 10
          startCycle()
        }
        break
      case 'right':
        if (pX < 600 - spriteWidth) {
          pX += 10
          startCycle()
        }
        break
      default:
    }
    ctx.clearRect(0, 0, 600, 600)
    const dir = DIRECTIONS[moveDirection] || 0
    ctx.drawImage(img, cycle * spriteWidth, dir, spriteWidth, spriteHeight, pX, pY, 48, 48)
  }, 120)
})
