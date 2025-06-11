import { useState } from 'react'
import { Header } from '../components/Header'
import { Order } from './fights/Order'
import { AttackLogs } from './fights/AttackLogs'
import { BossArea } from './fights/BossArea'
import { TeamArea } from './fights/TeamArea'

export function Fight({ currentBoss, team, gold, onWhere }) {

  const firstOrder = () => {
    let array = [...team]
    array.push(currentBoss)
    return array.sort((b, a) => a.agility - b.agility)
  }

  const findAttacker = (e) => {
    return team.filter(character => character.identity == e.target.nextSibling.children[0].alt)[0]
  }

  const damageOutput = (attacker, boss) => {
    return attacker.strength > boss.armor ? attacker.strength - currentBoss.armor : 0
  }

  const handleAttackLogs = (attacker, target, damage, logs) => {
    let newLogs = [...logs]
    newLogs.push(`${attacker.identity} hits ${target.identity} for ${damage} damages !`)
    return newLogs.length < 5 ? newLogs : newLogs.splice(-1, 4)
  }

  const rotateArray = (array) => {
    array.push(array.shift())
    return array
  }

  const [bossHealth, setBossHealth] = useState(currentBoss.health)
  const [characterOneHealth, setCharacterOneHealth] = useState(team[0].health)
  const [characterTwoHealth, setCharacterTwoHealth] = useState(team[1].health)
  const [characterThreeHealth, setCharacterThreeHealth] = useState(team[2].health)
  const [order, setOrder] = useState(firstOrder)
  const [attackLogs, setAttackLogs] = useState([`Fight against ${currentBoss.identity} as started !`])

  const frontline = team.filter((character) => character.type.includes("tank"))
  const backline = team.filter((character) => !character.type.includes("tank"))

  const attack = (e) => {
    const attacker = (findAttacker(e))
    const damage = damageOutput(attacker, currentBoss)
    setBossHealth(bossHealth - damage)
    setAttackLogs(handleAttackLogs(attacker, currentBoss, damage, attackLogs ))
    setOrder(rotateArray(order))
  }

  return <div>
    <Header team={team} gold={gold} onWhere={onWhere} buttonValue="Map" />
    <div className="wrapper fight-grid main-window my-3">
      <Order order={order}/>
      <AttackLogs attackLogs={attackLogs} />
      <BossArea currentBoss={currentBoss} bossHealth={bossHealth} />
      <TeamArea
        order={order}
        onClick={attack}
        frontline={frontline}
        backline={backline} />
    </div>
  </div>
}
