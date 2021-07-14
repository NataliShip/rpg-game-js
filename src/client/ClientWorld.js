const spriteW = 48
const spriteH = 48

class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
    })
  }

  init() {
    const { map } = this.levelCfg
    map.forEach((cfgRow, y) => {
      cfgRow.forEach((cfgCell, x) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', cfgCell[0]],
          frame: 0,
          x: x * spriteW,
          y: y * spriteH,
          w: spriteW,
          h: spriteH,
        })
      })
    })
  }
}

export default ClientWorld
