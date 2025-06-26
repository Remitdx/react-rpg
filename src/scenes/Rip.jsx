import { Button } from '../components/Button'
import { Character } from '../components/Character'

export function Rip({team, onMenu}) {
  return <div className="text-center">
    <h1>Rest in peace</h1>
    <div className="d-flex justify-content-center">
      <Character character={team[0]} size="avatar m-2" dead={true} />
      <Character character={team[1]} size="avatar m-2" dead={true} />
      <Character character={team[2]} size="avatar m-2" dead={true} />
    </div>
    <p>In hardcore mode, once all your team is dead <strong className="red">game is over</strong> !</p>
    <Button value="Try again" onClick={onMenu}/>
  </div>
}
