import { useState } from 'react'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { Character } from '../components/Character'

export function Fight({ currentBoss, team, gold, onWhere }) {

  const [bossHealth, setBossHealth] = useState(currentBoss.health)

  const [currentAlly, setCurrentAlly] = useState(team[0])

  const beatIt = () => {
    setBossHealth(0)
  }

  return <div>
    <Header team={team} gold={gold} onWhere={onWhere} buttonValue="Map" />
    <div className="wrapper main-window my-3">
      <Character size="avatar-lg" character={currentBoss}/>
      {bossHealth}
      <Character size="avatar" character={currentAlly}/>
      <Button value="Beat it" onClick={beatIt}/>
    </div>
  </div>
}
