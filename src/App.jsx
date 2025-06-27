import { useContext, useEffect, useMemo, useState } from 'react'
import './App.css'
import { Welcome } from './scenes/Welcome'
import { TeamPicker } from './scenes/Teampicker'
import { Map } from './scenes/Map'
import { Fight } from './scenes/Fight'
import { Shop } from './scenes/Shop'
import { Rip } from './scenes/Rip'
import { Tips } from './scenes/Tips'
import { Credits } from './scenes/Credits'
import { MutedContext } from './hooks/useMuted'

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
    {type: ["attack"], identity: "goatguy", armor: 2, resistance: 2, health: 50, strength: 16, agility: 3, gold: 10 },
    {type: ["magic"], identity: "princess", armor: 4, resistance: 4, health: 90, strength: 22, agility: 6, gold: 15 },
    {type: ["magic"], identity: "sirena", armor: 4, resistance: 20, health: 125, strength: 24, agility: 4, gold: 20 },
    {type: ["attack"], identity: "king", armor: 12, resistance: 8, health: 175, strength: 22, agility: 8, gold: 25 },
    {type: ["attack"], identity: "minotaur", armor: 20, resistance: 4, health: 200, strength: 26, agility: 5, gold: 30 },
    {type: ["magic"], identity: "medusa", armor: 12, resistance: 12, health: 250, strength: 20, agility: 7, gold: 0 }
  ]

  const BUFFDATAS = [
    {title: "Health buff", cost: 15, img: "health-buff", description: "Health points x2."},
    {title: "Attack buff", cost: 20, img: "attack-buff", description: "Damages and heals x2."},
    {title: "Armor buff", cost: 15, img: "armor-buff", description: "Armor x2."},
    {title: "Resistance buff", cost: 15, img: "resistance-buff", description: "Resistance x2."},
    {title: "Armor shred", cost: 25, img: "armor-shred", description: "Boss armor / 4."},
    { title: "Resistance shred", cost: 25, img: "resistance-shred", description: "Boss resistance / 4."}
  ]

  const [gameState, setGameState] = useState(0)
  const [showAlert, setShowAlert] = useState(false);
  const [hardcore, setHardcore] = useState(false)
  const [charactersLeft, setCharactersLeft] = useState(CHARACTERSDATAS)
  const [team, setTeam] = useState([])
  const [gold, setGold] = useState(100)
  const [boss, setBoss] = useState([0, 1, 1, 1, 1, 1]) // 0: fightable, 1: locked, 2: defeated
  const [buff, setBuff] = useState([false, false, false, false, false, false])
  const [currentBoss, setCurrentBoss] = useState(BOSSDATAS[0])

  const mainAudio = useMemo(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}/audios/adventure.mp3`)
    audio.loop = true
    audio.volume = 0.2
    return audio
  }, [])

  const fightAudio = useMemo(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}/audios/fight.mp3`)
    audio.loop = true
    audio.volume = 0.1
    return audio
  }, [])

  const {muted} = useContext(MutedContext)

  useEffect(() => {
    if (!muted) {
      [2, 4, 5 , 6].includes(gameState) ? mainAudio.play() : gameState == 3 ? fightAudio.play() : null
    }
    return () => {
      mainAudio.pause()
      fightAudio.pause()
    }
  }, [fightAudio, gameState, mainAudio, muted])

  let scene = undefined

  const startGame = () => {
    setGameState(1)
  }

  const startHardcore = () => {
    setHardcore(true)
    startGame()
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

  const gotToCredits = () => {
    setGameState(6)
  }

  const goToMenu = () => {
    setGameState(0)
    setHardcore(false)
    setCharactersLeft(CHARACTERSDATAS)
    setTeam([])
    setGold(10)
    setBoss([0, 1, 1, 1, 1, 1])
    setBuff([false, false, false, false, false, false])
    setCurrentBoss(BOSSDATAS[0])
  }

  const goToRip = () => {
    setGameState(7)
  }

  const handleBossDeath = (e) => {
    const bossName = e.target.parentElement.nextSibling.children[0].alt
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
    }
    bossName == "medusa" ? gotToCredits() : goToMap()
  }

  const addCharacterToTeam = (e) => {
    const pick = CHARACTERSDATAS.find(character => character.identity == e.currentTarget.children[0].alt)
    let newTeam = team
    let newCharactersLeft = charactersLeft
    newTeam.push(pick)
    setTeam(newTeam)
    setCharactersLeft(newCharactersLeft.filter(character => character.identity !== e.currentTarget.children[0].alt))
  }

  const buyItem = (e) => {
    const item = BUFFDATAS.find(buff => buff.title == e.currentTarget.children[0].alt)
    if (e.currentTarget.children[2].innerText == 'Refund') {
      setGold(gold + item.cost)
      //play sound
      const index = BUFFDATAS.findIndex(buff => buff == item)
      let newBuff = [...buff]
      newBuff[index] = false
      setBuff(newBuff)
    } else {
      if (gold - item.cost < 0 ) {
        handleAlert()
        //play sound
      } else  {
        setGold(gold - item.cost)
        //play sound
        const index = BUFFDATAS.findIndex(buff => buff == item)
        let newBuff = [...buff]
        newBuff[index] = true
        setBuff(newBuff)
      }
    }
  }

  const handleAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  switch (gameState) {
    case 0:
      scene = <Welcome
        heroes={CHARACTERSDATAS.slice(3,6)}
        onStart={startGame}
        onHardcore={startHardcore}
        onCredits={gotToCredits}/>
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
        buffDatas={BUFFDATAS}
        buff={buff}
        hardcore={hardcore}
        onRip={goToRip}
        onMap={goToMap} />
      break;
    case 4:
      scene = <Shop
        buff={buff}
        buffDatas={BUFFDATAS}
        team={team}
        showAlert={showAlert}
        gold={gold}
        onBuy={buyItem}
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
    case 6:
      scene = <Credits
        onMenu={goToMenu} />
      break;
    case 7:
      scene = <Rip
        onMenu={goToMenu}
        team={team} />
      break;

    }

  return <div className="container">
    {scene}
  </div>
}

export default App
