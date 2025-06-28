import { useContext, useState } from 'react'
import { Order } from './fights/Order'
import { FightLogs } from './fights/FightLogs'
import { BossArea } from './fights/BossArea'
import { TeamArea } from './fights/TeamArea'
import { RecapBuffs } from './fights/RecapBuffs'
import { MutedContext } from '../hooks/useMuted'

export function Fight({ currentBoss, team, onBossDeath, onMap, buff, buffDatas, hardcore, onRip }) {

  const {muted} = useContext(MutedContext)

  const magic = new Audio(`${import.meta.env.BASE_URL}/audios/magic.mp3`)
  const magic2 = new Audio(`${import.meta.env.BASE_URL}/audios/magic2.mp3`)
  const punch = new Audio(`${import.meta.env.BASE_URL}/audios/punch.mp3`)
  const sword = new Audio(`${import.meta.env.BASE_URL}/audios/sword.mp3`)
  const blade = new Audio(`${import.meta.env.BASE_URL}/audios/blade.mp3`)
  const heal = new Audio(`${import.meta.env.BASE_URL}/audios/heal.mp3`)

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
      getRandomInteger(2) == 0 ? !muted && magic.play() : !muted && magic2.play()
      const targetResistance = buff[5] ? target.resistance / 4 : target.resistance
      return attackerStrength > targetResistance ? attackerStrength - targetResistance : 0
    } else {
      const sound = getRandomInteger(3)
      sound == 0 ? !muted && sword.play() : sound == 1 ? !muted && blade.play() : !muted && punch.play()
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

  const filterDeadCharacters = () => {
    let aliveTeam = [...team]
    characterTwoHealth == 0 ? aliveTeam.splice(1,1) : aliveTeam
    characterOneHealth == 0 ? aliveTeam.shift() : aliveTeam
    characterThreeHealth == 0 ? aliveTeam.pop() : aliveTeam
    return aliveTeam
  }

  const aliveTankOrRandomAliveTarget = () => {
    const aliveTeam = filterDeadCharacters()
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
    const target = aliveTankOrRandomAliveTarget()
    let targetKilled = false
    if (target) {
      const index = team.findIndex(member => member.identity == target.identity)
      const damage = bossDamageOutput(currentBoss, target)
      targetKilled = handleTeamHealthLoss(index, damage)
      const newLogs = handleAttackLogs(currentBoss, target, damage, logs)
      const newBossHealth = bossHealth + 0.5 * damage > currentBoss.health ? currentBoss.health : bossHealth + 0.5 * damage
      setBossHealth(newBossHealth)
      newLogs.unshift(`- ${currentBoss.identity.toUpperCase()} heals for 50% of the damage dealed (${damage/2})`)
      setLogs(newLogs)
    }
    const newOrder = targetKilled ? order.filter(member => member.identity !== target.identity) : order
    setOrder(rotateArray(newOrder))
  }

  const kingAI = () => {
    const attackType = getRandomInteger(3)
    const targets = filterDeadCharacters()
    if (attackType == 2 && targets.length == 3) {
      let newLog = `- ${currentBoss.identity.toUpperCase()} slams all characters with rage (`
      let damages = []
      targets.forEach( (target, i) => {
        const damage = bossDamageOutput(currentBoss, target) / 2
        damages.push(damage)
        newLog = newLog + `${target.identity.toUpperCase()} - ${damage}`
        newLog = i < 2 ? newLog + ", " : newLog + ")"
      })
      const newLogs = [...logs]
      newLogs.unshift(newLog)
      setLogs(newLogs)
      let newOrder = [...order]
      newOrder = characterOneHealth - damages[0] <= 0 ? newOrder.filter(member => member.identity !== team[0].identity) : newOrder
      newOrder = characterTwoHealth - damages[1] <= 0 ? newOrder.filter(member => member.identity !== team[1].identity) : newOrder
      newOrder = characterThreeHealth - damages[2] <= 0 ? newOrder.filter(member => member.identity !== team[2].identity) : newOrder
      setCharacterOneHealth(characterOneHealth - damages[0] < 0 ? 0 : characterOneHealth - damages[0])
      setCharacterTwoHealth(characterTwoHealth - damages[1] < 0 ? 0 : characterTwoHealth - damages[1])
      setCharacterThreeHealth(characterThreeHealth - damages[2] < 0 ? 0 : characterThreeHealth - damages[2])
      setOrder(rotateArray(newOrder))
    } else {
      goatguyAI()
    }
  }

  const minotaurAI = () => {
    const attackType = getRandomInteger(3)
    if (attackType == 2) {
      const target = aliveTankOrRandomAliveTarget()
      let targetKilled = false
      if (target) {
        const index = team.findIndex(member => member.identity == target.identity)
        const damage = bossDamageOutput(currentBoss, target) * 2
        targetKilled = handleTeamHealthLoss(index, damage)
        const newLogs = [...logs]
        newLogs.unshift(`- ${currentBoss.identity.toUpperCase()} smash hard on ${target.identity.toUpperCase()}: ${damage} physical ${damage > 1 ? "damages" : "damage"} !`)
        setLogs(newLogs)
      }
      const newOrder = targetKilled ? order.filter(member => member.identity !== target.identity) : order
      setOrder(rotateArray(newOrder))
    } else if (attackType == 1) {
      sirenaAI()
    } else {
      goatguyAI()
    }
  }

  const medusaAI = () => {
    const targets = filterDeadCharacters()
    const target = targets[getRandomInteger(targets.length)]
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
    e.target.innerHTML == "Heal" ? heals(e) : attacks(e)
  }

  const heals = (e) => {
    const attacker = (findAttacker(e))
    const characterOneMaxHealth = buff[0] ? team[0].health * 2 : team[0].health
    const characterTwoMaxHealth = buff[0] ? team[1].health * 2 : team[1].health
    const characterThreeMaxHealth = buff[0] ? team[2].health * 2 : team[2].health
    const teamMissingHealth = [
      characterOneHealth > 0 ? characterOneMaxHealth - characterOneHealth : -Infinity,
      characterTwoHealth > 0 ? characterTwoMaxHealth - characterTwoHealth : -Infinity,
      characterThreeHealth > 0 ? characterThreeMaxHealth - characterThreeHealth : -Infinity,
    ]
    const validTargets = teamMissingHealth.filter(member => member !== 0 && member !== -Infinity).length
    let healLog =''
    const healAmount = buff[1] ? attacker.strength * 2 : attacker.strength

    if (validTargets == 0) {
      healLog = `- ${attacker.identity.toUpperCase()} try to heal but can't find any valid target`
    } else if (teamMissingHealth[0] > teamMissingHealth[1]) {
      heal.play()
      if (teamMissingHealth[2] > teamMissingHealth[0]) {
        setCharacterThreeHealth(characterThreeHealth + healAmount < characterThreeMaxHealth ? characterThreeHealth + healAmount : characterThreeMaxHealth)
        healLog = `- ${attacker.identity.toUpperCase()} heals ${team[2].identity.toUpperCase()} for ${healAmount} points.`
      } else {
        setCharacterOneHealth(characterOneHealth + healAmount < characterOneMaxHealth ? characterOneHealth + healAmount : characterOneMaxHealth)
        healLog = `- ${attacker.identity.toUpperCase()} heals ${team[0].identity.toUpperCase()} for ${healAmount} points.`
      }
    } else {
      heal.play()
      if (teamMissingHealth[2] > teamMissingHealth[1]) {
        setCharacterThreeHealth(characterThreeHealth + healAmount < characterThreeMaxHealth ? characterThreeHealth + healAmount : characterThreeMaxHealth)
        healLog = `- ${attacker.identity.toUpperCase()} heals ${team[2].identity.toUpperCase()} for ${healAmount} points.`
      } else {
        setCharacterTwoHealth(characterTwoHealth + healAmount < characterTwoMaxHealth ? characterTwoHealth + healAmount : characterTwoMaxHealth)
        healLog = `- ${attacker.identity.toUpperCase()} heals ${team[1].identity.toUpperCase()} for ${healAmount} points.`
      }
    }
    const newLogs = [...logs]
    newLogs.unshift(healLog)
    setLogs(newLogs)
    setOrder(rotateArray(order))
  }

  const attacks = (e) => {
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
      hardcore={hardcore}
      onRip={onRip}
      characterOneHealth={characterOneHealth}
      characterTwoHealth={characterTwoHealth}
      characterThreeHealth={characterOneHealth}
      onBossDeath={onBossDeath} />
  </div>
}
