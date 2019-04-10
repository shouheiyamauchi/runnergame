/// <reference types="react-scripts" />
import Phaser from 'phaser'

declare global {
  interface Window {
    PhaserGame: Phaser.Game
  }
}
