import { useState } from 'react'
import './App.css'
import { Welcome } from './scenes/Welcome'
import { TeamPicker } from './scenes/Teampicker'
import { Map } from './scenes/Map'
import { Fight } from './scenes/Fight'
import { Shop } from './scenes/Shop'
import { Error } from './scenes/Error'


function App() {

  const CHARACTERSDATA = [
    {type: "barbare", health: 12, strength: 8, agility: 2},
    {type: "elf", health: 6, strength: 6, agility: 8},
    {type: "harpie", health: 8, strength: 3, agility: 7},
    {type: "werewolf", health: 14, strength: 6, agility: 4},
    {type: "mage", health: 8, strength: 5, agility: 3},
    {type: "dwarf", health: 16, strength: 4, agility: 3},
    {type: "ranger", health: 9, strength: 10, agility: 4},
    {type: "troll", health: 8, strength: 5, agility: 5}
  ]
  const [gameState, setGameState] = useState(0)
  const [charactersLeft, setCharactersLeft] = useState(CHARACTERSDATA)
  const [team, setTeam] = useState([])
  let scene = undefined

  const startGame = () => {
    setGameState(1)
  }

  const goToMap = () => {
    setGameState(2)
  }

  const addCharacterToTeam = (e) => {
    const pick = CHARACTERSDATA.find(character => character.type == e.target.alt)
    let newTeam = team
    let newCharactersLeft = charactersLeft
    newTeam.push(pick)
    setTeam(newTeam)
    setCharactersLeft(newCharactersLeft.filter(character => character.type !== e.target.alt))
  }

  switch (gameState) {
    case 0:
      scene = <Welcome onClick={startGame}/>
      break;
    case 1:
      scene = <TeamPicker
        team={team}
        charactersLeft={charactersLeft}
        pickCharacter={addCharacterToTeam}
        onClick={goToMap}/>
      break;
    case 2:
      scene = <Map
        team={team} />
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

  return <div className="container">
    {scene}
  </div>
}

export default App
