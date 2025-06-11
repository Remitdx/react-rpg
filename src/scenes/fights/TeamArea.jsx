import { Character } from '../../components/Character'
import { Button } from '../../components/Button'
import { Line } from './Line'

export function TeamArea({frontline, backline, order, onClick}) {
  return <div className="fight-item team-area d-flex flex-column justify-content-end">
    <Line line={frontline} order={order} onClick={onClick} />
    <Line line={backline} order={order} onClick={onClick} />
  </div>
}
