import { Character } from '../components/Character'
import { Button } from '../components/Button'
import { ResourcesPanel } from '../components/ResourcesPanel'

export function Header({team, gold, onButtonOne, onButtonTwo, buttonOne, buttonTwo, muted, onMute}) {
  return <div className="header wrapper d-flex align-items-center justify-content-between">
    <div className="d-flex">
      {team.map(member => (
        <Character
          key={member.identity}
          character={member}
          size="avatar-sm mx-1" />
      ))}
    </div>
    <ResourcesPanel gold={gold} />
    <div>
      <Button value={muted ? "On" : "Off"} onClick={onMute}/>
      <Button value={buttonOne} onClick={onButtonOne} />
      <Button value={buttonTwo} onClick={onButtonTwo} />
    </div>
  </div>
}
