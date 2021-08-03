import ClientEngine from './ClientEngine'
import ClientWorld from './ClientWorld'

import sprites from '../configs/sprites'
import levelCfg from '../configs/world.json'
import gameObjects from '../configs/gameObjects.json'

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    })

    this.engine = this.createEngine()
    this.world = this.createWorld()
    this.initEngine()
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId), this)
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg)
  }

  setPlayer(player) {
    this.player = player
  }

  getWorld() {
    return this.world
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init()
      // запускаем игру только после того как картинки загрузились
      this.engine.on('render', (_, time) => {
        this.engine.camera.focusAtGameObject(this.player)
        this.world.render(time)
      })
      this.engine.start()
      this.initKeys()
    })
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => keydown && this.movePlayer(-1, 0, 'left'),
      ArrowRight: (keydown) => keydown && this.movePlayer(1, 0, 'right'),
      ArrowUp: (keydown) => keydown && this.movePlayer(0, -1, 'up'),
      ArrowDown: (keydown) => keydown && this.movePlayer(0, 1, 'down'),
    })
  }

  movePlayer(col, row, dir) {
    const { player } = this

    if (player && player.motionProgress === 1) {
      const canMove = player.moveByCellCoord(col, row, (cell) => cell.findObjectsByType('grass').length)

      if (canMove) {
        player.setState(dir)
        player.once('motion-stopped', () => player.setState('main'))
      }
    }
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg)
    }
  }
}

export default ClientGame
