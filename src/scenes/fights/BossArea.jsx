import { Character } from '../../components/Character'

export function BossArea({bossHealth, currentBoss}) {
  return <div className="fight-item boss-area d-flex justify-content-end">
    {bossHealth}
    <Character size="avatar" character={currentBoss}/>
  </div>
}
