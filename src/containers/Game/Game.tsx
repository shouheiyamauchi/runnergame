import Phaser from 'phaser'
import React from 'react'

// import ExampleScene from './scenes/example'
import MazeScene from './scenes/maze'

class Game extends React.Component {
  public componentDidMount() {
    const config: GameConfig = {
      backgroundColor: 0x444444,
      height: 600,
      parent: 'phaser-game',
      physics: {
        default: 'arcade'
      },
      scene: [MazeScene],
      type: Phaser.AUTO,
      width: 800
    }

    window.PhaserGame = new Phaser.Game(config)
  }

  public render() {
    return <div id="phaser-game" />
  }
}

export default Game
