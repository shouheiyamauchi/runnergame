/// <reference types="react-scripts" />
import Phaser from 'phaser'

declare global {
  interface Window {
    RunnerGame: {
      PhaserGame: Phaser.Game
      Platforms: {
        [key: string]: Phaser.Physics.Arcade.Sprite
      }
      SelectedItem?: Phaser.Physics.Arcade.Sprite
      SelectedItemListener?: Phaser.Physics.Arcade.Sprite
    }
  }
}
