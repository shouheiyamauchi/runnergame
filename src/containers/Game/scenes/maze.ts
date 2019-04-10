import Phaser from 'phaser'

import platform from './platform.png'
import player from './player.png'

const gameOptions = {
  jumpForce: 400,
  playerGravity: 900,
  playerStartPosition: 200
}

class MazeScene extends Phaser.Scene {
  public platform!: Phaser.Physics.Arcade.Sprite
  public player!: Phaser.Physics.Arcade.Sprite

  public preload() {
    this.textures.addBase64('platform', platform)
    this.textures.addBase64('player', player)
  }

  public create() {
    this.textures.once('addtexture', () => {
      this.player = this.physics.add.sprite(
        gameOptions.playerStartPosition,
        (window.PhaserGame.config.height as number) / 2,
        'player'
      )
      this.player.setGravityY(gameOptions.playerGravity)

      // place am immovable platform
      this.platform = this.physics.add.sprite(
        gameOptions.playerStartPosition,
        (window.PhaserGame.config.height as number) * 0.8,
        'platform'
      )
      this.platform.setImmovable(true)

      // set collision between player and platform
      this.physics.add.collider(this.player, this.platform)

      // initiate jump on click
      this.input.on('pointerdown', this.jump, this)
    })
  }

  public jump() {
    this.player.setVelocityY(gameOptions.jumpForce * -1)
  }
}

export default MazeScene
