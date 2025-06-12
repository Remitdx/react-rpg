import { Button } from '../../components/Button'
import { Character } from '../../components/Character'

export function BossArea({ currentBoss, bossHealth, bossArmor, bossResistance, onBossDeath }) {

  if (bossHealth > 0) {
    return <div className="fight-item boss-area d-flex align-items-start justify-content-end">
      <div className='mx-2'>
        {bossHealth}
        <p>Armor: {bossArmor}</p>
        <p>Resist: {bossResistance}</p>
        <p>Gold: {currentBoss.gold}</p>
      </div>
      <Character size="avatar-lg" character={currentBoss}/>
    </div>
  } else {
    return <div className="fight-item boss-area d-flex align-items-center justify-content-end">
      <Button value="Close Fight" onClick={onBossDeath} />
      <Character size="avatar-lg" character={currentBoss}/>
    </div>
  }
}
