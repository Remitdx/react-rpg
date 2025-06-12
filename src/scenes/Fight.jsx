import { useState } from 'react'
import { Header } from '../components/Header'
import { Order } from './fights/Order'
import { FightLogs } from './fights/FightLogs'
import { BossArea } from './fights/BossArea'
import { TeamArea } from './fights/TeamArea'

export function Fight({ currentBoss, team, gold, onBossDeath, onWhere }) {

  const firstOrder = () => {
    let array = [...team]
    array.push(currentBoss)
    return array.sort((b, a) => a.agility - b.agility)
  }

  const findAttacker = (e) => {
    return team.filter(character => character.identity == e.target.previousSibling.children[0].alt)[0]
  }

  const damageOutput = (attacker, target) => {
    if (attacker.type.includes("magic")) {
      return attacker.strength > target.resistance ? attacker.strength - target.resistance : 0
    } else {
      return attacker.strength > target.armor ? attacker.strength - target.armor : 0
    }
  }

  const handleAttackLogs = (attacker, target, damage, logs) => {
    let newLogs = [...logs]
    const type = attacker.type.includes("magic") ? "magic" : "physical"
    newLogs.push(`${attacker.identity} hits ${target.identity} for ${damage} ${type} ${damage < 2 ? "damage" : "damages"} !`)
    newLogs.length < 5 ? newLogs : newLogs.shift()
    return newLogs
  }

  const rotateArray = (array) => {
    array.push(array.shift())
    return array
  }

  const getRandomInteger = (max) => {
    return Math.floor(Math.random() * max)
  }

  const removeFromOrder = () => {

  }

  const handleCharacterDeath = () => {

  }

  const randomAliveTarget = () => {
    let aliveTeam = [...team]
    characterTwoHealth == 0 ? aliveTeam.splice(1,1) : aliveTeam
    characterOneHealth == 0 ? aliveTeam.shift() : aliveTeam
    characterThreeHealth == 0 ? aliveTeam.pop() : aliveTeam
    return aliveTeam[getRandomInteger(aliveTeam.length)]
  }

  const handleTeamHealthLoss = (index, damage) => {
    switch (index) {
      case 0:
        setCharacterOneHealth(characterOneHealth - damage < 0 ? 0 : characterOneHealth - damage)
        break;
      case 1:
        setCharacterTwoHealth(characterTwoHealth - damage < 0 ? 0 : characterTwoHealth - damage)
        break;
      case 2:
        setCharacterThreeHealth(characterThreeHealth - damage < 0 ? 0 : characterThreeHealth - damage)
        break;
      default:
        console.log("ERROR: something wrong with damage from the boss")
        break;
    }
  }

  const goatguyAI = () => {
    const target = team.find(member => member.type.includes("tank")) || randomAliveTarget()
    const index = team.findIndex(member => member.identity == target.identity)
    const damage = damageOutput(currentBoss, target)
    handleTeamHealthLoss(index, damage)
    setLogs(handleAttackLogs(currentBoss, target, damage, logs))
  }

  const princessAI = () => {
    if (bossHealth < 20) {
      console.log("princess heal herself")
    } else {
      goatguyAI()
    }
  }

  const sirenaAI = () => {
    console.log("sirena fight")
  }

  const kingAI = () => {
    console.log("king fight")
  }

  const minotaurAI = () => {
    console.log("minotaur fight")
  }

  const medusaAI = () => {
    console.log("medusa fight")
  }

  const bossTurn = () => {
    switch (currentBoss.identity) {
      case "goatguy":
        goatguyAI()
        break;
      case "princess":
        princessAI()
        break;
      case "sirena":
        sirenaAI()
        break;
      case "king":
        kingAI()
        break;
      case "minotaur":
        minotaurAI()
        break;
      case "medusa":
        medusaAI()
        break;
      default:
        console.log("ERROR: can't find boss brain !")
        break;
    }
  }

  const [order, setOrder] = useState(firstOrder)
  const [logs, setLogs] = useState([`Fight against ${currentBoss.identity} has started !`])
  const [bossHealth, setBossHealth] = useState(currentBoss.health)
  const [bossArmor, setBossArmor] = useState(currentBoss.armor)
  const [bossResistance, setBossResistance] = useState(currentBoss.resistance)

  const [characterOneHealth, setCharacterOneHealth] = useState(team[0].health)
  const [characterTwoHealth, setCharacterTwoHealth] = useState(team[1].health)
  const [characterThreeHealth, setCharacterThreeHealth] = useState(team[2].health)

  const attack = (e) => {
    const attacker = (findAttacker(e))
    const damage = damageOutput(attacker, currentBoss)
    setBossHealth(bossHealth - damage < 0 ? 0 : bossHealth - damage)
    setLogs(handleAttackLogs(attacker, currentBoss, damage, logs ))
    setOrder(rotateArray(order))
    if (order[0] == currentBoss) {
      bossTurn()
      setOrder(rotateArray(order))
    }
  }

  return <div>
    <Header team={team} gold={gold} onWhere={onWhere} buttonValue="Map" />
    <div className="wrapper fight-grid main-window my-3">
      <Order
        order={order}
        bossHealth={bossHealth} />
      <FightLogs logs={logs} />
      <BossArea
        currentBoss={currentBoss}
        bossHealth={bossHealth}
        bossArmor={bossArmor}
        bossResistance={bossResistance}
        onBossDeath={onBossDeath} />
      <TeamArea
        order={order}
        onClick={attack}
        bossHealth={bossHealth}
        characterOneHealth={characterOneHealth}
        characterTwoHealth={characterTwoHealth}
        characterThreeHealth={characterThreeHealth}
        team={team} />
    </div>
  </div>
}
