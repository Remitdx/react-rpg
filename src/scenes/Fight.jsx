import { useState } from 'react'
import { Order } from './fights/Order'
import { FightLogs } from './fights/FightLogs'
import { BossArea } from './fights/BossArea'
import { TeamArea } from './fights/TeamArea'

export function Fight({ currentBoss, team, onBossDeath, onMap }) {

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
    newLogs.unshift(`- ${attacker.identity.toUpperCase() } hits ${target.identity.toUpperCase()} for ${damage} ${type} ${damage < 2 ? "damage" : "damages"} !`)
    newLogs.length < 13 ? newLogs : newLogs.pop()
    return newLogs
  }

  const rotateArray = (array) => {
    array.push(array.shift())
    return array
  }

  const getRandomInteger = (max) => {
    return Math.floor(Math.random() * max)
  }

  const aliveTankOrRandomAliveTarget = () => {
    let aliveTeam = [...team]
    characterTwoHealth == 0 ? aliveTeam.splice(1,1) : aliveTeam
    characterOneHealth == 0 ? aliveTeam.shift() : aliveTeam
    characterThreeHealth == 0 ? aliveTeam.pop() : aliveTeam
    return aliveTeam.find(member => member.type.includes("tank"))  || aliveTeam[getRandomInteger(aliveTeam.length)]
  }

  const handleTeamHealthLoss = (index, damage) => {
    switch (index) {
      case 0:
        setCharacterOneHealth(characterOneHealth - damage < 0 ? 0 : characterOneHealth - damage)
        return characterOneHealth > 0 && characterOneHealth - damage < 1
      case 1:
        setCharacterTwoHealth(characterTwoHealth - damage < 0 ? 0 : characterTwoHealth - damage)
        return characterTwoHealth > 0 && characterTwoHealth - damage < 1
      case 2:
        setCharacterThreeHealth(characterThreeHealth - damage < 0 ? 0 : characterThreeHealth - damage)
        return characterThreeHealth > 0 && characterThreeHealth - damage < 1
      default:
        console.log("ERROR: something wrong with damage from the boss")
        break;
    }
  }

  const goatguyAI = (attackLogs, newOrder, newBossHealth) => {
    const target = aliveTankOrRandomAliveTarget()
    setBossHealth(newBossHealth)
    if (target) {
      const index = team.findIndex(member => member.identity == target.identity)
      const damage = damageOutput(currentBoss, target)
      const targetKilled = handleTeamHealthLoss(index, damage)
      targetKilled ? setOrder(newOrder.filter(member => member.identity !== target.identity)) : setOrder(newOrder)
      setLogs(handleAttackLogs(currentBoss, target, damage, attackLogs))
    } else {
      console.log("All heroes are dead !")
    }
  }

  const princessAI = (attackLogs, newOrder, newBossHealth) => {
    if (newBossHealth < 25) {
      const heal = 20
      setBossHealth(newBossHealth + heal)
      let log = [...attackLogs]
      log.unshift(`- PRINCESS heals herself for ${heal}`)
      setLogs(log)
    } else {
      goatguyAI(attackLogs, newOrder, newBossHealth)
    }
  }

  const sirenaAI = (attackLogs, newOrder) => {
    console.log("sirena fight")
    goatguyAI(attackLogs, newOrder)
  }

  const kingAI = (attackLogs, newOrder) => {
    console.log("king fight")
    goatguyAI(attackLogs, newOrder)
  }

  const minotaurAI = (attackLogs, newOrder) => {
    console.log("minotaur fight")
    goatguyAI(attackLogs, newOrder)
  }

  const medusaAI = (attackLogs, newOrder) => {
    console.log("medusa fight")
    goatguyAI(attackLogs, newOrder)
  }

  const bossTurn = (attackLogs, newOrder, newBossHealth) => {
    switch (currentBoss.identity) {
      case "goatguy":
        goatguyAI(attackLogs, newOrder, newBossHealth)
        break;
      case "princess":
        princessAI(attackLogs, newOrder, newBossHealth)
        break;
      case "sirena":
        sirenaAI(attackLogs, newOrder)
        break;
      case "king":
        kingAI(attackLogs, newOrder)
        break;
      case "minotaur":
        minotaurAI(attackLogs, newOrder)
        break;
      case "medusa":
        medusaAI(attackLogs, newOrder)
        break;
      default:
        console.log("ERROR: can't find boss brain !")
        break;
    }
  }

  const [order, setOrder] = useState(firstOrder)
  const [logs, setLogs] = useState([`- Fight against ${currentBoss.identity.toUpperCase()} has started !`])
  const [bossHealth, setBossHealth] = useState(currentBoss.health)
  const [bossArmor, setBossArmor] = useState(currentBoss.armor)
  const [bossResistance, setBossResistance] = useState(currentBoss.resistance)

  const [characterOneHealth, setCharacterOneHealth] = useState(team[0].health)
  const [characterTwoHealth, setCharacterTwoHealth] = useState(team[1].health)
  const [characterThreeHealth, setCharacterThreeHealth] = useState(team[2].health)

  const attack = (e) => {
    const attacker = (findAttacker(e))
    const damage = damageOutput(attacker, currentBoss)
    const newBossHealth = bossHealth - damage < 0 ? 0 : bossHealth - damage
    const attackLogs = handleAttackLogs(attacker, currentBoss, damage, logs)
    setOrder(rotateArray(order))
    if (order[0] == currentBoss && bossHealth - damage > 0) {
      const newOrder = rotateArray(order)
      bossTurn(attackLogs, newOrder, newBossHealth)
    } else {
      setLogs(attackLogs)
      setBossHealth(newBossHealth)
    }
  }

  return <div className="wrapper fight-bg fight-grid main-window">
    <Order
      order={order}
      bossHealth={bossHealth} />
    <FightLogs logs={logs} />
    <BossArea
      currentBoss={currentBoss}
      bossHealth={bossHealth}
      bossArmor={bossArmor}
      bossResistance={bossResistance}
      onMap={onMap}
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
}
