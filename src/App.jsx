import { useState } from 'react'
import './App.css'
import { Welcome } from './scenes/Welcome'
import { TeamPicker } from './scenes/Teampicker'
import { Map } from './scenes/Map'
import { Fight } from './scenes/Fight'
import { Shop } from './scenes/Shop'
import { Error } from './scenes/Error'


function App() {

  const [gameState, setGameState] = useState(0)
  let scene = undefined

  const startGame = () => {
    setGameState(1)
  }

  switch (gameState) {
    case 0:
      scene = <Welcome onClick={startGame}/>
      break;
    case 1:
      scene = <TeamPicker />
      break;
    case 2:
      scene = <Map />
      break;
    case 3:
      scene = <Fight />
      break;
    case 4:
      scene = <Shop />
      break;

    default:
      scene = <Error />
      break;
  }

  return scene
}

export default App
