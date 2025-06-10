import { Character } from '../../components/Character'
import { Button } from '../../components/Button'
//import { Frontlane } from './Frontlane'
//import { Backlane } from './Backlane'

export function TeamArea({characterOneHealth, characterTwoHealth, characterThreeHealth, team, attack}) {
  return <div className="fight-item team-area d-flex align-items-end">
    <Character size="avatar-sm" character={team[0]} />
    {characterOneHealth}
    <Button value="Attack" onClick={attack} />
    <Character size="avatar-sm" character={team[1]} />
    {characterTwoHealth}
    <Character size="avatar-sm" character={team[2]} />
    {characterThreeHealth}
    {/* <Frontlane/>
    <Backlane/> */}
  </div>
}
