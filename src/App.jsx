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
    {type: ["tank", "physical"], identity: "barbare", health: 12, strength: 8, agility: 2},
    {type: [], identity: "elf", health: 6, strength: 6, agility: 8},
    {type: [], identity: "harpie", health: 8, strength: 3, agility: 7},
    {type: [], identity: "werewolf", health: 14, strength: 6, agility: 4},
    {type: [], identity: "mage", health: 8, strength: 5, agility: 3},
    {type: [], identity: "dwarf", health: 16, strength: 4, agility: 3},
    {type: [], identity: "ranger", health: 9, strength: 10, agility: 4},
    {type: [], identity: "troll", health: 8, strength: 5, agility: 5}
  ]

  const MAPDATAS = [
    undefined,
    undefined,
    undefined,
    undefined,
    { boss: "final", health: 100, strength: 8, agility: 4, defeated: false, gold: 15 },
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    { boss: "challenge", health: 60, strength: 8, agility: 3, defeated: false, gold: 6 },
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    { boss: "weak", health: 20, strength: 6, agility: 10, defeated: false, gold: 3 },
    undefined,
    undefined,
    undefined,
    undefined,
  ]

  const BUFFDATAS = ["HP buff", "MR shred", "physical shred", "damagebuff", "magic buff", "agitlity buff"]

  const [gameState, setGameState] = useState(0)
  const [charactersLeft, setCharactersLeft] = useState(CHARACTERSDATA)
  const [team, setTeam] = useState([])
  const [gold, setGold] = useState(0)
  let scene = undefined

  const startGame = () => {
    setGameState(1)
  }

  const goToMap = () => {
    setGameState(2)
  }

  const goToFight = () => {
    setGameState(3)
  }

  const goToShop = () => {
    setGameState(4)
  }

  const addCharacterToTeam = (e) => {
    const pick = CHARACTERSDATA.find(character => character.identity == e.target.alt)
    let newTeam = team
    let newCharactersLeft = charactersLeft
    newTeam.push(pick)
    setTeam(newTeam)
    setCharactersLeft(newCharactersLeft.filter(character => character.identity !== e.target.alt))
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
        mapDatas={MAPDATAS}
        team={team}
        gold={gold}
        onFight={goToFight}
        onShop={goToShop} />
      break;
    case 3:
      scene = <Fight
        onMap={goToMap} />
      break;
    case 4:
      scene = <Shop
        onMap={goToMap} />
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
