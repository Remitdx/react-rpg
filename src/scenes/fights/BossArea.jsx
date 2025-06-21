import { Button } from '../../components/Button'
import { Character } from '../../components/Character'
import { HealthBar } from '../../components/HealthBar'

export function BossArea({ currentBoss, bossHealth, bossArmor, bossResistance, onMap, onBossDeath }) {

  const isNerfed = (baseValue, currentValue) => {
    return currentValue < baseValue ? "red" : ""
  }

  if (bossHealth > 0) {
    return <div className="fight-item boss-area d-flex">
      <div className='flex-grow-1'>
        <div className='fight-boss-stats'>
          <HealthBar maxHealth={currentBoss.health} currentHealth={bossHealth}/>
          <div className="d-flex justify-content-between align-items-end">
            <div>
              <p>Health: {bossHealth}</p>
              <p>Strength: {currentBoss.strength}</p>
              <p>Armor: <span className={isNerfed(currentBoss.armor, bossArmor)}>{bossArmor}</span></p>
              <p>Resist: <span className={isNerfed(currentBoss.resistance, bossResistance)}>{bossResistance}</span></p>
              <p>Gold: {currentBoss.gold}</p>
            </div>
            <img className="item-sm" src={`${import.meta.env.BASE_URL}/images/${currentBoss.type}.png`} key={currentBoss.type} alt={currentBoss.type} />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center pt-1 pt-md-3">
          <Button value="Retreat ..." onClick={onMap} />
        </div>
      </div>
      <Character size="avatar-lg ps-1" character={currentBoss}/>
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
