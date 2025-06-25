import { useEffect, useState } from 'react'
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
    return team.filter(character => character.identity == e.target.parentElement.previousSibling.children[0].alt)[0]
  }

  const damageOutput = (attacker, target) => {
    const attackerStrength = buff[1] ? attacker.strength * 2 : attacker.strength
    if (attacker.type.includes("magic")) {
      const targetResistance = buff[5] ? target.resistance / 4 : target.resistance
      return attackerStrength > targetResistance ? attackerStrength - targetResistance : 0
    } else {
      const targetArmor = buff[4] ? target.armor / 4 : target.armor
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

  const goatguyAI = () => {
    const target = aliveTankOrRandomAliveTarget()
    let targetKilled = false
    if (target) {
      const index = team.findIndex(member => member.identity == target.identity)
      const damage = bossDamageOutput(currentBoss, target)
      targetKilled = handleTeamHealthLoss(index, damage)
      setLogs(handleAttackLogs(currentBoss, target, damage, logs))
    }
    const newOrder = targetKilled ? order.filter(member => member.identity !== target.identity) : order
    setOrder(rotateArray(newOrder))
  }

  const princessAI = () => {
    const oddOrEven = getRandomInteger(2)
    if (bossHealth < 40 && oddOrEven == 0) {
      const heal = currentBoss.strength
      setBossHealth(bossHealth + heal)
      let log = [...logs]
      log.unshift(`- PRINCESS heals herself for ${heal}`)
      setLogs(log)
      setOrder(rotateArray(order))
    } else {
      goatguyAI()
    }
  }

  const sirenaAI = () => {
    goatguyAI()
  }

  const kingAI = () => {
    console.log("king fight")
    goatguyAI()
  }

  const minotaurAI = () => {
    console.log("minotaur fight")
    goatguyAI()
  }

  const medusaAI = () => {
    console.log("medusa fight")
    goatguyAI(attackLogs, newOrder, newBossHealth)
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



  // these variables mutate during fight
  const [order, setOrder] = useState(firstOrder)
  const [logs, setLogs] = useState([`- Fight against ${currentBoss.identity.toUpperCase()} has started !`])
  const [bossHealth, setBossHealth] = useState(currentBoss.health)
  const [characterOneHealth, setCharacterOneHealth] = useState(buff[0] ? team[0].health * 2 : team[0].health)
  const [characterTwoHealth, setCharacterTwoHealth] = useState(buff[0] ? team[1].health * 2 : team[1].health)
  const [characterThreeHealth, setCharacterThreeHealth] = useState(buff[0] ? team[2].health * 2 : team[2].health)

  // those don't
  const bossArmor = buff[4] ? currentBoss.armor / 4 : currentBoss.armor
  const bossResistance = buff[5] ? currentBoss.resistance / 4 : currentBoss.resistance

  const characterOneStrength = buff[1] ? team[0].strength * 2 : team[0].strength
  const characterOneArmor = buff[2] ? team[0].armor * 2 : team[0].armor
  const characterOneResistance = buff[3] ? team[0].resistance * 2 : team[0].resistance

  const characterTwoStrength = buff[1] ? team[1].strength * 2 : team[1].strength
  const characterTwoArmor = buff[2] ? team[1].armor * 2 : team[1].armor
  const characterTwoResistance = buff[3] ? team[1].resistance * 2 : team[1].resistance

  const characterThreeStrength = buff[1] ? team[2].strength * 2 : team[2].strength
  const characterThreeArmor = buff[2] ? team[2].armor * 2 : team[2].armor
  const characterThreeResistance = buff[3] ? team[2].resistance * 2 : team[2].resistance

  const action = (e) => {
    e.target.innerHTML == "Heal" ? heal(e) : attack(e)
  }

  const heal = (e) => {
    const attacker = (findAttacker(e))
    const teamMissingHealth = [
      characterOneHealth > 0 ? team[0].health - characterOneHealth : -Infinity,
      characterTwoHealth > 0 ? team[1].health - characterTwoHealth : -Infinity,
      characterThreeHealth > 0 ? team[2].health - characterThreeHealth : -Infinity,
    ]
    const validTargets = teamMissingHealth.filter(member => member !== 0 && member !== -Infinity).length
    let healLog =''
    const healAmount = buff[1] ? attacker.strength * 2 : attacker.strength

    if (validTargets == 0) {
      healLog = `- ${attacker.identity.toUpperCase()} try to heal but can't find any valid target`
    } else if (teamMissingHealth[0] > teamMissingHealth[1]) {
      if (teamMissingHealth[2] > teamMissingHealth[0]) {
        setCharacterThreeHealth(characterThreeHealth + healAmount < team[2].health ? characterThreeHealth + healAmount : team[2].health)
        healLog = `- ${attacker.identity.toUpperCase()} heals ${team[2].identity.toUpperCase()} for ${healAmount} points.`
      } else {
        setCharacterOneHealth(characterOneHealth + healAmount < team[0].health ? characterOneHealth + healAmount : team[0].health)
        healLog = `- ${attacker.identity.toUpperCase()} heals ${team[0].identity.toUpperCase()} for ${healAmount} points.`
      }
    } else {
      if (teamMissingHealth[2] > teamMissingHealth[1]) {
        setCharacterThreeHealth(characterThreeHealth + healAmount < team[2].health ? characterThreeHealth + healAmount : team[2].health)
        healLog = `- ${attacker.identity.toUpperCase()} heals ${team[2].identity.toUpperCase()} for ${healAmount} points.`
      } else {
        setCharacterTwoHealth(characterTwoHealth + healAmount < team[1].health ? characterTwoHealth + healAmount : team[1].health)
        healLog = `- ${attacker.identity.toUpperCase()} heals ${team[1].identity.toUpperCase()} for ${healAmount} points.`
      }
    }
    const newLogs = [...logs]
    newLogs.unshift(healLog)
    setLogs(newLogs)
    setOrder(rotateArray(order))
  }

  const attack = (e) => {
    const attacker = (findAttacker(e))
    const damage = damageOutput(attacker, currentBoss)
    setBossHealth(bossHealth - damage < 0 ? 0 : bossHealth - damage)
    setLogs(handleAttackLogs(attacker, currentBoss, damage, logs))
    setOrder(rotateArray(order))
  }

  if (order[0] == currentBoss && bossHealth > 0 && (characterOneHealth + characterTwoHealth + characterThreeHealth > 0) ) {
    bossTurn()
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
      onClick={action}
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
