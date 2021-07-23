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
    return new ClientEngine(document.getElementById(this.cfg.tagId))
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg)
  }

  setPlayer(player) {
    this.player = player
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init()
      // запускаем игру только после того как картинки загрузились
      this.engine.on('render', (_, time) => {
        this.world.render(time)
      })
      this.engine.start()
      this.initKeys()
    })
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => this.movePlayer(keydown, -1, 0),
      ArrowRight: (keydown) => this.movePlayer(keydown, 1, 0),
      ArrowUp: (keydown) => this.movePlayer(keydown, 0, -1),
      ArrowDown: (keydown) => this.movePlayer(keydown, 0, 1),
    })
  }

  movePlayer(keydown, col, row) {
    if (keydown) {
      this.player.moveByCellCoord(col, row, (cell) => cell.findObjectsByType('grass').length)
    }
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg)
    }
  }
}

export default ClientGame
