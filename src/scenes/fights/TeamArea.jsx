import { Character } from '../../components/Character'
import { Button } from '../../components/Button'
import { Line } from './Line'

export function TeamArea({frontline, backline}) {
  return <div className="fight-item team-area d-flex flex-column justify-content-end">
    <Line line={frontline} />
    <Line line={backline} />
  </div>
}
