import { Button } from '../../components/Button'
import { Character } from '../../components/Character'

export function BossArea({ currentBoss, bossHealth, bossArmor, bossResistance, onMap, onBossDeath }) {

  if (bossHealth > 0) {
    return <div className="fight-item boss-area d-flex align-items-start justify-content-end">
      <div className='mx-2'>
        {bossHealth}
        <p>Armor: {bossArmor}</p>
        <p>Resist: {bossResistance}</p>
        <p>Gold: {currentBoss.gold}</p>
        <Button value="Retreat ..." onClick={onMap} />
      </div>
      <Character size="avatar-lg" character={currentBoss}/>
    </div>
  } else {
    return <div className="fight-item boss-area d-flex align-items-center justify-content-end">
      <Button value="Continue" onClick={onBossDeath} />
      <Character size="avatar-lg" character={currentBoss}/>
    </div>
  }
}
