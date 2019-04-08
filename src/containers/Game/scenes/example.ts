import Phaser from 'phaser'

export default class ExampleScene extends Phaser.Scene {
  public preload() {
    this.load.setBaseURL('http://labs.phaser.io')

    this.load.image('sky', 'assets/skies/space3.png')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('red', 'assets/particles/red.png')
  }

  public create() {
    this.add.image(400, 300, 'sky')

    const particles = this.add.particles('red')

    const emitter = particles.createEmitter({
      blendMode: 'ADD',
      scale: { start: 1, end: 0 },
      speed: 100
    })

    const logo = this.physics.add.image(400, 100, 'logo')

    logo.setVelocity(100, 200)
    logo.setBounce(1, 1)
    logo.setCollideWorldBounds(true)

    emitter.startFollow(logo)
  }
}