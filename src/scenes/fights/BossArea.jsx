import { Character } from '../../components/Character'

export function BossArea({ currentBoss, bossHealth, bossArmor, bossResistance }) {
  return <div className="fight-item boss-area d-flex align-items-start justify-content-end">
    <div className='mx-2'>
      {bossHealth}
      <p>Armor: {bossArmor}</p>
      <p>Resist: {bossResistance}</p>
    </div>
    <Character size="avatar-lg" character={currentBoss}/>
  </div>
}
