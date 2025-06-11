import { Button } from '../../components/Button';
import { Character } from '../../components/Character';

export function TeamArea({team, order, onClick, characterOneHealth, characterTwoHealth, characterThreeHealth}) {
  return <div className="fight-item team-area d-flex justify-content-around align-items-end">
    <div key={team[0].identity} className="d-flex flex-column">
      { characterOneHealth }
      {order[0] == team[0] ? <Character size="avatar my-1" character={team[0]} />  : <Character size="avatar-sm" character={team[0]}/>}
      {order[0] == team[0] ? <Button value="Attack" onClick={onClick}/> : null }
    </div>
    <div key={team[1].identity} className="d-flex flex-column">
      { characterTwoHealth }
      {order[0] == team[1] ? <Character size="avatar my-1" character={team[1]} />  : <Character size="avatar-sm" character={team[1]}/>}
      {order[0] == team[1] ? <Button value="Attack" onClick={onClick}/> : null }
    </div>
    <div key={team[2].identity} className="d-flex flex-column">
      { characterThreeHealth }
      {order[0] == team[2] ? <Character size="avatar my-1" character={team[2]} />  : <Character size="avatar-sm" character={team[2]}/>}
      {order[0] == team[2] ? <Button value="Attack" onClick={onClick}/> : null }
    </div>
  </div>
}
