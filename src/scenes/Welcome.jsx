import { Button } from '../components/Button'
import { Character } from '../components/Character'

export function Welcome({heroes, onStart, onHardcore, onCredits}) {
  return <div className="text-center">
    <h1>React RPG fighter</h1>
    <p>Pick champions, fight, free your land.</p>
    <div className="carroussel-wrapper">
      <div className="d-flex justify-content-between carroussel">
        <Character size="avatar-sm" character={heroes[0]}/>
        <Character size="avatar-sm" character={heroes[1]}/>
        <Character size="avatar-sm" character={heroes[2]}/>
      </div>
    </div>
    <div className="d-flex flex-column flex-md-row justify-content-center">
      <Button onClick={onStart} value={"Start game"} />
      <Button onClick={onHardcore} value={"Hardcore mode"} theme="btn-warning"/>
      <Button onClick={onCredits} value={"Credits"} theme="btn-secondary"/>
    </div>
  </div>
}
