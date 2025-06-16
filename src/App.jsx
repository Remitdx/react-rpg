import { useState } from 'react'
import './App.css'
import { Welcome } from './scenes/Welcome'
import { TeamPicker } from './scenes/Teampicker'
import { Map } from './scenes/Map'
import { Fight } from './scenes/Fight'
import { Shop } from './scenes/Shop'
import { Error } from './scenes/Error'
import { Tips } from './scenes/Tips'


function App() {

  const CHARACTERSDATAS = [
    {type: ["tank", "attack"], identity: "barbare", armor: 6, resistance: 2, health: 16, strength: 8, agility: 2},
    {type: ["attack", "heal"], identity: "elf", armor: 6, resistance: 3, health: 8, strength: 9, agility: 8},
    {type: ["magic"], identity: "harpie", armor: 6, resistance: 6, health: 7, strength: 11, agility: 7},
    {type: ["tank", "magic"], identity: "werewolf", armor: 4, resistance: 8, health: 14, strength: 6, agility: 3},
    {type: ["magic"], identity: "mage", armor: 0, resistance: 6, health: 9, strength: 16, agility: 4},
    {type: ["tank"], identity: "dwarf", armor: 6, resistance: 6, health: 18, strength: 3, agility: 1},
    {type: ["attack"], identity: "ranger", armor: 6, resistance: 0, health: 9, strength: 16, agility: 5},
    {type: ["magic", "heal"], identity: "troll", armor: 2, resistance: 6, health: 10, strength: 9, agility: 6}
  ]

  const BOSSDATAS = [
    {type: ["attack"], identity: "goatguy", armor: 2, resistance: 2, health: 60, strength: 16, agility: 3, gold: 10 },
    {type: ["magic"], identity: "princess", armor: 4, resistance: 4, health: 60, strength: 14, agility: 3, gold: 10 },
    {type: ["magic"], identity: "sirena", armor: 0, resistance: 0, health: 30, strength: 6, agility: 3, gold: 15 },
    {type: ["attack"], identity: "king", armor: 0, resistance: 0, health: 30, strength: 8, agility: 3, gold: 20 },
    {type: ["attack"], identity: "minotaur", armor: 0, resistance: 0, health: 30, strength: 8, agility: 4, gold: 30 },
    {type: ["magic"], identity: "medusa", armor: 0, resistance: 0, health: 200, strength: 8, agility: 4, gold: 0 }
  ]

  const BUFFDATAS = [
    {title: "Health buff", cost: 15, img: "health-buff"},
    {title: "Attack buff", cost: 20, img: "attack-buff"},
    {title: "Armor buff", cost: 15, img: "armor-buff"},
    {title: "Resistance buff", cost: 15, img: "resistance-buff"},
    {title: "Armor shred", cost: 25, img: "armor-shred"},
    {title: "Resistance shred", cost: 25, img: "resistance-shred"}
  ]

  const [gameState, setGameState] = useState(0)
  const [charactersLeft, setCharactersLeft] = useState(CHARACTERSDATAS)
  const [team, setTeam] = useState([])
  const [gold, setGold] = useState(5)
  const [boss, setBoss] = useState([0, 1, 1, 1, 1, 1]) // 0: fightable, 1: locked, 2: defeated
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

  const goToTips = () => {
    setGameState(5)
  }

  const handleBossDeath = (e) => {
    const bossName = e.target.nextSibling.children[0].alt
    const amount = BOSSDATAS.find(boss => boss.identity == bossName).gold
    setGold(gold + amount)
    switch (bossName) {
      case "goatguy":
        setBoss([2, 0, 1, 1, 1, 1])
        break;
      case "princess":
        setBoss([2, 2, 0, 1, 1, 1])
        break;
      case "sirena":
        setBoss([2, 2, 2, 0, 1, 1])
        break;
      case "king":
        setBoss([2, 2, 2, 2, 0, 1])
        break;
      case "minotaur":
        setBoss([2, 2, 2, 2, 2, 0])
        break;
      case "medusa":
        setBoss([2, 2, 2, 2, 2, 2])
        break;

      default:
        console.log("Something went wrong with boss update")
        break;
    }
    goToMap()
  }

  const addCharacterToTeam = (e) => {
    const pick = CHARACTERSDATAS.find(character => character.identity == e.target.alt)
    let newTeam = team
    let newCharactersLeft = charactersLeft
    newTeam.push(pick)
    setTeam(newTeam)
    setCharactersLeft(newCharactersLeft.filter(character => character.identity !== e.target.alt))
  }

  const buyItem = (e) => {
    const item = BUFFDATAS.find(buff => buff.title == e.target.alt)
    if (gold - item.cost < 0 ) {
      console.log('cannot afford this')
    } else  {
      setGold(gold - item.cost)
      const index = BUFFDATAS.findIndex(buff => buff == item)
      let newBuff = [...buff]
      newBuff[index] = true
      setBuff(newBuff)
    }
  }

  const sellAllItems = () => {
    let refund = 0
    buff.forEach((buff, i) => {
      if (buff) {
        refund = refund + BUFFDATAS[i].cost
      }
    })
    setGold(gold + refund)
    setBuff([false, false, false, false, false, false])
  }

  switch (gameState) {
    case 0:
      scene = <Welcome
        heroes={CHARACTERSDATAS.slice(3,6)}
        onClick={startGame}/>
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
        onTips={goToTips}
        onShop={goToShop} />
        break;
    case 3:
      scene = <Fight
        onBossDeath={handleBossDeath}
        currentBoss={currentBoss}
        team={team}
        gold={gold}
        onMap={goToMap} />
      break;
    case 4:
      scene = <Shop
        buff={buff}
        buffDatas={BUFFDATAS}
        team={team}
        gold={gold}
        onBuy={buyItem}
        onSell={sellAllItems}
        onTips={goToTips}
        onMap={goToMap} />
      break;
    case 5:
      scene = <Tips
        team={team}
        gold={gold}
        onShop={goToShop}
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
