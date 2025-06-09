import { Character } from '../components/Character'
import { Button } from '../components/Button'
import { ResourcesPanel } from '../components/ResourcesPanel'

export function Header({team, gold, onWhere, buttonValue}) {
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
    <Button value={buttonValue} onClick={onWhere} />
  </div>
}
