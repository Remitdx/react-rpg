import { Button } from '../../components/Button';
import { Character } from '../../components/Character';

export function TeamArea({team, order, onClick, bossHealth, characterOneHealth, characterTwoHealth, characterThreeHealth}) {
  return <div className="fight-item team-area d-flex justify-content-around align-items-end">
    <div key={team[0].identity} className="d-flex flex-column">
      { characterOneHealth }
      {characterOneHealth == 0 ? <Character size="avatar-sm" dead={true} character={team[0]} /> : <Character size={order[0] == team[0] ? "avatar" : "avatar-sm"} character={team[0]} />}
      {order[0] == team[0] && bossHealth > 0 && characterOneHealth > 0 ? <Button value="Attack !" onClick={onClick}/> : null }
    </div>
    <div key={team[1].identity} className="d-flex flex-column">
      { characterTwoHealth }
      {characterTwoHealth == 0 ? <Character size="avatar-sm" dead={true} character={team[1]} /> : <Character size={order[0] == team[1] ? "avatar" : "avatar-sm"} character={team[1]} />}
      {order[0] == team[1] && bossHealth > 0 && characterTwoHealth > 0 ? <Button value="Attack !" onClick={onClick}/> : null }
    </div>
    <div key={team[2].identity} className="d-flex flex-column">
      { characterThreeHealth }
      {characterThreeHealth == 0 ? <Character size="avatar-sm" dead={true} character={team[2]} /> : <Character size={order[0] == team[2] ? "avatar" : "avatar-sm"} character={team[2]} />}
      {order[0] == team[2] && bossHealth > 0 && characterThreeHealth > 0 ? <Button value="Attack !" onClick={onClick}/> : null }
    </div>
    {characterOneHealth == 0 && characterTwoHealth == 0 && characterThreeHealth == 0 ? <p>All heroes are dead ...</p> : null}
  </div>
}
