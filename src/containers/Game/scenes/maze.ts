import Phaser from 'phaser'

const gameOptions = {
  jumpForce: 400,
  playerGravity: 900,
  playerStartPosition: 200,
  runningSpeed: 500
}

const platforms = [
  {
    id: '1',
    posX: 10,
    posY: 0,
    width: 100
  },
  {
    id: '2',
    posX: 200,
    posY: 0,
    width: 100
  },
  {
    id: '3',
    posX: 400,
    posY: 0,
    width: 100
  },
  {
    id: '4',
    posX: 700,
    posY: 0,
    width: 100
  }
]

class MazeScene extends Phaser.Scene {
  public player!: Phaser.Physics.Arcade.Sprite

  public preload() {
    // global object to store and reference game items
    window.RunnerGame.Platforms = {}

    this.load.setBaseURL('http://localhost:3001')
    this.load.image('platform', 'static/platform.png')
    this.load.image('player', 'static/player.png')
  }

  public create() {
    // add player to scene
    this.player = this.physics.add.sprite(
      gameOptions.playerStartPosition,
      (window.RunnerGame.PhaserGame.config.height as number) / 2,
      'player'
    )

    // make the player fall with gravity
    this.player.setGravityY(gameOptions.playerGravity)

    // initiate jump on click
    this.input.on('pointerdown', () => this.jump())

    // add platforms
    platforms.map(({ id, posX, posY, width }) =>
      this.addPlatform(id, posX, posY, width)
    )
  }

  public update() {
    // ensure that the player slides along the platform
    this.player.x = gameOptions.playerStartPosition
  }

  public addPlatform(
    id: string,
    positionX: number,
    positionY: number,
    width: number
  ) {
    // place am immovable platform
    window.RunnerGame.Platforms[id] = this.physics.add.sprite(
      positionX + gameOptions.playerStartPosition,
      positionY + (window.RunnerGame.PhaserGame.config.height as number) * 0.8,
      'platform'
    )

    window.RunnerGame.Platforms[id].setInteractive().on('pointerdown', () => {
      window.RunnerGame.SelectedItemListener = window.RunnerGame.Platforms[id]
    })

    // set the name for referencing
    window.RunnerGame.Platforms[id].setName(id)

    // ensure platform does not fall with player
    window.RunnerGame.Platforms[id].setImmovable(true)

    // move platforms to make it seem like player is running
    // platform.setVelocityX(-gameOptions.runningSpeed)

    // set the color of platform
    window.RunnerGame.Platforms[id].setTint(0xffffff)

    // set platform width
    window.RunnerGame.Platforms[id].displayWidth = width

    // set collision between player and platform
    this.physics.add.collider(this.player, window.RunnerGame.Platforms[id])
  }

  public jump() {
    this.player.setVelocityY(gameOptions.jumpForce * -1)
  }
}

export default MazeScene
