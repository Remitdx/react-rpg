import { useState } from 'react'
import { Order } from './fights/Order'
import { FightLogs } from './fights/FightLogs'
import { BossArea } from './fights/BossArea'
import { TeamArea } from './fights/TeamArea'
import { RecapBuffs } from './fights/RecapBuffs'

export function Fight({ currentBoss, team, onBossDeath, onMap, buff, buffDatas }) {

  const firstOrder = () => {
    let array = [...team]
    array.push(currentBoss)
    return array.sort((b, a) => a.agility - b.agility)
  }

  const findAttacker = (e) => {
    return team.filter(character => character.identity == e.target.previousSibling.children[0].alt)[0]
  }

  const damageOutput = (attacker, target) => {
    const attackerStrength = buff[1] ? attacker.strength * 2 : attacker.strength
    if (attacker.type.includes("magic")) {
      const targetResistance = buff[5] ? target.resistance / 2 : target.resistance
      return attackerStrength > targetResistance ? attackerStrength - targetResistance : 0
    } else {
      const targetArmor = buff[4] ? target.armor / 2 : target.armor
      return attackerStrength > targetArmor ? attackerStrength - targetArmor : 0
    }
  }

  const bossDamageOutput = (boss, target) => {
    if (boss.type.includes("magic")) {
      const targetResistance = buff[3] ? target.resistance * 2 : target.resistance
      return boss.strength > targetResistance ? boss.strength - targetResistance : 0
    } else {
      const targetArmor = buff[2] ? target.armor * 2 : target.armor
      return boss.strength > targetArmor ? boss.strength - targetArmor : 0
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
      const damage = bossDamageOutput(currentBoss, target)
      const targetKilled = handleTeamHealthLoss(index, damage)
      targetKilled ? setOrder(newOrder.filter(member => member.identity !== target.identity)) : setOrder(newOrder)
      setLogs(handleAttackLogs(currentBoss, target, damage, attackLogs))
    }
  }

  const princessAI = (attackLogs, newOrder, newBossHealth) => {
    const oddOrEven = getRandomInteger(2)
    console.log(oddOrEven)
    if (newBossHealth < 40 && oddOrEven == 0) {
      const heal = 20
      setBossHealth(newBossHealth + heal)
      let log = [...attackLogs]
      log.unshift(`- PRINCESS heals herself for ${heal}`)
      setLogs(log)
    } else {
      goatguyAI(attackLogs, newOrder, newBossHealth)
    }
  }

  const sirenaAI = (attackLogs, newOrder, newBossHealth) => {
    console.log("sirena fight")
    goatguyAI(attackLogs, newOrder, newBossHealth)
  }

  const kingAI = (attackLogs, newOrder, newBossHealth) => {
    console.log("king fight")
    goatguyAI(attackLogs, newOrder, newBossHealth)
  }

  const minotaurAI = (attackLogs, newOrder, newBossHealth) => {
    console.log("minotaur fight")
    goatguyAI(attackLogs, newOrder, newBossHealth)
  }

  const medusaAI = (attackLogs, newOrder, newBossHealth) => {
    console.log("medusa fight")
    goatguyAI(attackLogs, newOrder, newBossHealth)
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

  // these variables mutate during fight
  const [order, setOrder] = useState(firstOrder)
  const [logs, setLogs] = useState([`- Fight against ${currentBoss.identity.toUpperCase()} has started !`])
  const [bossHealth, setBossHealth] = useState(currentBoss.health)
  const [characterOneHealth, setCharacterOneHealth] = useState(buff[0] ? team[0].health * 2 : team[0].health)
  const [characterTwoHealth, setCharacterTwoHealth] = useState(buff[0] ? team[1].health * 2 : team[1].health)
  const [characterThreeHealth, setCharacterThreeHealth] = useState(buff[0] ? team[2].health * 2 : team[2].health)

  // those don't
  const bossArmor = buff[4] ? currentBoss.armor / 2 : currentBoss.armor
  const bossResistance = buff[5] ? currentBoss.resistance / 2 : currentBoss.resistance

  const characterOneStrength = buff[1] ? team[0].strength * 2 : team[0].strength
  const characterOneArmor = buff[2] ? team[0].armor * 2 : team[0].armor
  const characterOneResistance = buff[3] ? team[0].resistance * 2 : team[0].resistance

  const characterTwoStrength = buff[1] ? team[1].strength * 2 : team[1].strength
  const characterTwoArmor = buff[2] ? team[1].armor * 2 : team[1].armor
  const characterTwoResistance = buff[3] ? team[1].resistance * 2 : team[1].resistance

  const characterThreeStrength = buff[1] ? team[2].strength * 2 : team[2].strength
  const characterThreeArmor = buff[2] ? team[2].armor * 2 : team[2].armor
  const characterThreeResistance = buff[3] ? team[2].resistance * 2 : team[2].resistance

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
    <FightLogs logs={logs} />
    <Order
      order={order}
      bossHealth={bossHealth} />
    <RecapBuffs
      buff={buff}
      buffDatas={buffDatas}
      bossHealth={bossHealth} />
    <TeamArea
      order={order}
      buff={buff}
      onClick={attack}
      bossHealth={bossHealth}
      characterOneHealth={characterOneHealth}
      characterOneStrength={characterOneStrength}
      characterOneArmor={characterOneArmor}
      characterOneResistance={characterOneResistance}
      characterTwoHealth={characterTwoHealth}
      characterTwoStrength={characterTwoStrength}
      characterTwoArmor={characterTwoArmor}
      characterTwoResistance={characterTwoResistance}
      characterThreeHealth={characterThreeHealth}
      characterThreeStrength={characterThreeStrength}
      characterThreeArmor={characterThreeArmor}
      characterThreeResistance={characterThreeResistance}
      team={team} />
    <BossArea
      currentBoss={currentBoss}
      bossHealth={bossHealth}
      bossArmor={bossArmor}
      bossResistance={bossResistance}
      onMap={onMap}
      onBossDeath={onBossDeath} />
  </div>
}
