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
      <div className="d-flex flex-column align-items-start mx-2 ">
        <p>{currentBoss.identity.toUpperCase()} is dead !</p>
        <Button value="Continue" onClick={onBossDeath} />
      </div>
      <Character size="avatar-lg" character={currentBoss} dead={true}/>
    </div>
  }
}
