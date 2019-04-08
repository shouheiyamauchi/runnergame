import Phaser from 'phaser'
import React from 'react'

import ExampleScene from './scenes/example'

class Game extends React.Component {
  public componentDidMount() {
    const config: GameConfig = {
      height: 600,
      parent: 'phaser-game',
      physics: {
        arcade: {
          gravity: { y: 200 }
        },
        default: 'arcade'
      },
      scene: [ExampleScene],
      type: Phaser.AUTO,
      width: 800
    }

    return new Phaser.Game(config)
  }

  public render() {
    return <div id="phaser-game" />
  }
}

export default Game
