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

  const [bossHealth, setBossHealth] = useState(currentBoss.health)
  const [characterOneHealth, setCharacterOneHealth] = useState(team[0].health)
  const [characterTwoHealth, setCharacterTwoHealth] = useState(team[1].health)
  const [characterThreeHealth, setCharacterThreeHealth] = useState(team[2].health)
  const [order, setOrder] = useState(firstOrder)
  const [attackLogs, setAttackLogs] = useState([`Fight against ${currentBoss.identity} as started !`])


  const attack = () => {
    setBossHealth(0)
  }

  return <div>
    <Header team={team} gold={gold} onWhere={onWhere} buttonValue="Map" />
    <div className="wrapper fight-grid main-window my-3">
      <Order order={order}/>
      <AttackLogs attackLogs={attackLogs} />
      <BossArea currentBoss={currentBoss} bossHealth={bossHealth} />
      <TeamArea
        team={team}
        attack={attack}
        characterOneHealth={characterOneHealth}
        characterTwoHealth={characterTwoHealth}
        characterThreeHealth={characterThreeHealth} />
    </div>
  </div>
}
