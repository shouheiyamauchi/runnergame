import hex2dec from 'hex2dec'
import Phaser from 'phaser'
import React from 'react'

// import ExampleScene from './scenes/example'
import MazeScene from './scenes/maze'

class Game extends React.Component {
  public state = {
    color: '',
    selected: 0
  }

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

    window.RunnerGame = {
      PhaserGame: new Phaser.Game(config),
      Platforms: {}
    }

    // set up listener to trigger events from outside React component
    Object.defineProperty(window.RunnerGame, 'SelectedItemListener', {
      get: () => window.RunnerGame.SelectedItem,
      set: (sprite: Phaser.Physics.Arcade.Sprite) => {
        window.RunnerGame.SelectedItem = sprite
        this.setState({ selected: sprite.name })
      }
    })
  }

  public colorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ color: e.target.value })
  }

  public applyChanges = () => {
    if (window.RunnerGame.SelectedItem) {
      window.RunnerGame.SelectedItem.setTint(hex2dec.hexToDec(this.state.color))
    }
  }

  public render() {
    return (
      <>
        <div>
          Selected Platform: {JSON.stringify(this.state.selected)}
          <br />
          <input value={this.state.color} onChange={this.colorInput} />
          <button onClick={this.applyChanges}>Update Color</button>
        </div>
        <div id="phaser-game" />
      </>
    )
  }
}

export default Game
