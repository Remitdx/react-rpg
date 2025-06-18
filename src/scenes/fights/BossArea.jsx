import { Button } from '../../components/Button'
import { Character } from '../../components/Character'
import { HealthBar } from '../../components/HealthBar'

export function BossArea({ currentBoss, bossHealth, bossArmor, bossResistance, onMap, onBossDeath }) {

  if (bossHealth > 0) {
    return <div className="fight-item boss-area d-flex align-items-end">
      <div className='flex-grow-1'>
        <HealthBar maxHealth={currentBoss.health} currentHealth={bossHealth}/>
        <div className='fight-boss-stats'>
          <p>Strength : {currentBoss.strength}</p>
          <p>Armor: {bossArmor}</p>
          <p>Resist: {bossResistance}</p>
          <p>Gold: {currentBoss.gold}</p>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Button value="Retreat ..." onClick={onMap} />
        </div>
      </div>
      <div>
        <Character size="avatar-lg" character={currentBoss}/>
      </div>
    </div>
  } else {
    return <div className="fight-item boss-area d-flex align-items-end">
      <div className="flex-grow-1 text-center">
        <p>{currentBoss.identity.toUpperCase()} is dead !</p>
        <Button value="Continue" onClick={onBossDeath} />
      </div>
      <Character size="avatar-lg" character={currentBoss} dead={true}/>
    </div>
  }
}
