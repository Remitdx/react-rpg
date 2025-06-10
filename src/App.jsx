import { useState } from 'react'
import './App.css'
import { Welcome } from './scenes/Welcome'
import { TeamPicker } from './scenes/Teampicker'
import { Map } from './scenes/Map'
import { Fight } from './scenes/Fight'
import { Shop } from './scenes/Shop'
import { Error } from './scenes/Error'


function App() {

  const CHARACTERSDATAS = [
    {type: ["tank", "attack"], identity: "barbare", armor: 4, resistance: 4, health: 12, strength: 8, agility: 2},
    {type: ["attack", "heal"], identity: "elf", armor: 4, resistance: 4, health: 6, strength: 6, agility: 8},
    {type: ["attack"], identity: "harpie", armor: 4, resistance: 4, health: 8, strength: 3, agility: 7},
    {type: ["tank", "magic"], identity: "werewolf", armor: 4, resistance: 4, health: 14, strength: 6, agility: 4},
    {type: ["magic"], identity: "mage", armor: 4, resistance: 4, health: 8, strength: 5, agility: 3},
    {type: ["tank"], identity: "dwarf", armor: 4, resistance: 4, health: 16, strength: 4, agility: 3},
    {type: ["attack"], identity: "ranger", armor: 4, resistance: 4, health: 9, strength: 10, agility: 4},
    {type: ["magic", "heal"], identity: "troll", armor: 4, resistance: 4, health: 8, strength: 5, agility: 5}
  ]

  const BOSSDATAS = [
    { identity: "goatguy", armor: 8, resistance: 8, health: 20, strength: 8, agility: 3, gold: 6 },
    { identity: "princess", armor: 8, resistance: 8, health: 40, strength: 8, agility: 3, gold: 6 },
    { identity: "sirena", armor: 8, resistance: 8, health: 80, strength: 6, agility: 10, gold: 3 },
    { identity: "king", armor: 8, resistance: 8, health: 100, strength: 8, agility: 3, gold: 6 },
    { identity: "minotaur", armor: 8, resistance: 8, health: 180, strength: 8, agility: 4, gold: 15 },
    { identity: "medusa", armor: 8, resistance: 8, health: 200, strength: 8, agility: 4, gold: 15 }
  ]

  const BUFFDATAS = [
    {title: "Health buff", cost: 5, active: false},
    {title: "Resistance shred", cost: 7, active: false},
    {title: "Armor shred", cost: 5, active: false},
    {title: "Attack buff", cost: 5, active: false},
    {title: "Resistance buff", cost: 5, active: false},
    {title: "Armor buff", cost: 5, active: false}
  ]

  const [gameState, setGameState] = useState(0)
  const [charactersLeft, setCharactersLeft] = useState(CHARACTERSDATAS)
  const [team, setTeam] = useState([])
  const [gold, setGold] = useState(10)
  const [boss, setBoss] = useState([0, 1, 2, 0, 0, 0]) // 0: fightable, 1: locked, 2: defeated
  const [buff, setBuff] = useState([false, false, false, false, false, false])
  const [currentBoss, setCurrentBoss] = useState(BOSSDATAS[0])


  let scene = undefined

  const startGame = () => {
    setGameState(1)
  }

  const goToMap = () => {
    setGameState(2)
  }

  const goToFight = (e) => {
    setCurrentBoss(BOSSDATAS.find(opponent => opponent.identity == e.target.alt))
    setGameState(3)
  }

  const goToShop = () => {
    setGameState(4)
  }

  const addCharacterToTeam = (e) => {
    const pick = CHARACTERSDATAS.find(character => character.identity == e.target.alt)
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
        boss={boss}
        bossDatas={BOSSDATAS}
        team={team}
        gold={gold}
        onFight={goToFight}
        onWhere={goToShop} />
        break;
    case 3:
      scene = <Fight
        currentBoss={currentBoss}
        team={team}
        gold={gold}
        onWhere={goToMap} />
      break;
    case 4:
      scene = <Shop
        buff={buff}
        buffDatas={BUFFDATAS}
        team={team}
        gold={gold}
        onWhere={goToMap} />
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
