import { Button } from '../../components/Button';
import { Character } from '../../components/Character';
import { HealthBar } from '../../components/HealthBar';

export function TeamArea({
  team, order, onClick, bossHealth, buff,
  characterOneHealth, characterOneStrength, characterOneArmor, characterOneResistance,
  characterTwoHealth, characterTwoStrength, characterTwoArmor, characterTwoResistance,
  characterThreeHealth, characterThreeStrength, characterThreeArmor, characterThreeResistance}) {

  const isBuffed = (baseValue, currentValue) => {
    return currentValue > baseValue ? "green" : ""
  }

  return <div className="fight-item team-area d-flex justify-content-around align-items-end">
    <div key={team[0].identity} className="d-flex flex-column">
      <HealthBar maxHealth={buff[0] ? team[0].health * 2 : team[0].health} currentHealth={characterOneHealth}/>
      {order[0] == team[0] && bossHealth > 0 && characterOneHealth > 0 ?
        <div>
          <p>Strength: <span className={isBuffed(team[0].strength, characterOneStrength)}>{characterOneStrength}</span></p>
          <p>Armor: <span className={isBuffed(team[0].armor, characterOneArmor)}>{characterOneArmor}</span></p>
          <p>Resist: <span className={isBuffed(team[0].resistance, characterOneResistance)}>{characterOneResistance}</span></p>
        </div> : null }
      {characterOneHealth == 0 ? <Character size="avatar-sm" dead={true} character={team[0]} /> : <Character size={order[0] == team[0] ? "avatar" : "avatar-sm"} character={team[0]} />}
      {order[0] == team[0] && bossHealth > 0 && characterOneHealth > 0 ? <Button value="Attack !" onClick={onClick}/> : null }
    </div>
    <div key={team[1].identity} className="d-flex flex-column">
      <HealthBar maxHealth={buff[0] ? team[1].health * 2 : team[1].health} currentHealth={characterTwoHealth}/>
      {characterTwoHealth == 0 ? <Character size="avatar-sm" dead={true} character={team[1]} /> : <Character size={order[0] == team[1] ? "avatar" : "avatar-sm"} character={team[1]} />}
      {order[0] == team[1] && bossHealth > 0 && characterTwoHealth > 0 ? <Button value="Attack !" onClick={onClick}/> : null }
    </div>
    <div key={team[2].identity} className="d-flex flex-column">
      <HealthBar maxHealth={buff[0] ? team[2].health * 2 : team[2].health} currentHealth={characterThreeHealth}/>
      {characterThreeHealth == 0 ? <Character size="avatar-sm" dead={true} character={team[2]} /> : <Character size={order[0] == team[2] ? "avatar" : "avatar-sm"} character={team[2]} />}
      {order[0] == team[2] && bossHealth > 0 && characterThreeHealth > 0 ? <Button value="Attack !" onClick={onClick}/> : null }
    </div>
    {characterOneHealth == 0 && characterTwoHealth == 0 && characterThreeHealth == 0 ? <p>All heroes are dead ...</p> : null}
  </div>
}
