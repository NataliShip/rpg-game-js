import './index.scss'
import femaleWalk from './assets/Female-2-Walk.png'
import terrainAtlas from './assets/terrain.png'
import worldCfg from './configs/world.json'
import sprites from './configs/sprites'

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
const canvasWidth = 600
const canvasHeight = 600
const spriteWidth = 48
const spriteHeight = 48
const shots = 3
let cycle = 0
let moveDirection = null
let pY = canvasHeight / 2 - spriteHeight / 2
let pX = canvasWidth / 2 - spriteWidth / 2

const terrain = document.createElement('img')
terrain.src = terrainAtlas

terrain.addEventListener('load', () => {
  const {map} = worldCfg
  map.forEach((cfgRow, y) => {
    cfgRow.forEach((cfgCell, x) => {
      const [sX, sY, sW, sH] = sprites.terrain[cfgCell[0]].frames[0]
      ctx.drawImage(terrain, sX, sY, sW, sH, x * spriteWidth, y * spriteHeight, spriteWidth, spriteHeight)
    })
  })
})

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
        if (pY < canvasHeight - spriteHeight) {
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
        if (pX < canvasWidth - spriteWidth) {
          pX += 10
          startCycle()
        }
        break
      default:
    }
    // ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    const dir = DIRECTIONS[moveDirection] || 0
    ctx.drawImage(img, cycle * spriteWidth, dir, spriteWidth, spriteHeight, pX, pY, 48, 48)
  }, 120)
})
