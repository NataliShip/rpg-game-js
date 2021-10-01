import EventSourceMixin from '../common/EventSourceMixin'
import ClientCamera from './ClientCamera'
import ClientInput from './ClientInput'

class ClientEngine {
  constructor(canvas, game) {
    Object.assign(this, {
      canvas,
      canvases: {
        main: canvas,
      },
      ctx: null,
      imageLoaders: [],
      sprites: {},
      images: {},
      camera: new ClientCamera({ canvas, engine: this }),
      input: new ClientInput(canvas),
      game,
      lastRenderTime: 0,
      startTime: 0,
    })

    this.ctx = canvas.getContext('2d')
    this.loop = this.loop.bind(this)
  }

  start() {
    this.loop()
  }

  loop(timestamp) {
    if (!this.startTime) {
      this.startTime = timestamp
    }

    this.lastRenderTime = timestamp

    const { ctx, canvas } = this
    ctx.fillStyle = 'black'
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.trigger('render', timestamp)
    this.initNextFrame()
  }

  initNextFrame() {
    window.requestAnimationFrame(this.loop)
  }

  loadSprites(spritesGroup) {
    this.imageLoaders = []
    for (const groupName in spritesGroup) {
      const group = spritesGroup[groupName]
      this.sprites[groupName] = group

      for (const spriteName in group) {
        const { img } = group[spriteName]
        if (!this.images[img]) {
          this.imageLoaders.push(this.loadImage(img))
        }
      }
    }
    // дождется выполнения всех промисов загружающих картинки
    return Promise.all(this.imageLoaders)
  }

  loadImage(url) {
    // асинхронно загружаем картинку
    return new Promise((resolve) => {
      const i = new Image()
      this.images[url] = i
      i.onload = () => resolve(i)
      i.src = url
    })
  }

  renderSpriteFrame({ sprite, frame, x, y, w, h }) {
    const spriteCfg = this.sprites[sprite[0]][sprite[1]]
    const [fX, fY, fW, fH] = spriteCfg.frames[frame]
    const img = this.images[spriteCfg.img]
    const { camera } = this

    this.ctx.drawImage(img, fX, fY, fW, fH, x - camera.x, y - camera.y, w, h)
  }

  addCanvas(name, width, height) {
    let canvas = this.canvases[name]

    if (!canvas) {
      canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      this.canvases[name] = canvas
    }

    return canvas
  }

  switchCanvas(name) {
    const canvas = this.canvases[name]

    if (canvas) {
      this.canvas = canvas
      this.ctx = canvas.getContext('2d')
    }

    return canvas
  }

  focus() {
    this.canvases.main.focus()
  }

  renderCanvas(name, fromPos, toPos) {
    const canvas = this.canvases[name]

    if (canvas) {
      this.ctx.drawImage(
        canvas,
        fromPos.x,
        fromPos.y,
        fromPos.width,
        fromPos.height,
        toPos.x,
        toPos.y,
        toPos.width,
        toPos.height,
      )
    }
  }
}

Object.assign(ClientEngine.prototype, EventSourceMixin)

export default ClientEngine
