import { Character } from '../components/Character'
import { Button } from '../components/Button'
import { ResourcesPanel } from '../components/ResourcesPanel'
import { useWindowSize } from '@uidotdev/usehooks'
import { useContext } from 'react'
import { MutedContext } from '../hooks/useMuted'

export function Header({team, gold, onButtonOne, onButtonTwo, buttonOne, buttonTwo }) {

  const { muted, toggleMuted } = useContext(MutedContext)

  const musicButtonValue = <img
    src={muted ? `${import.meta.env.BASE_URL}/images/sound-off.png` : `${import.meta.env.BASE_URL}/images/sound-on.png`}
    alt={muted ? "Sound off" : "Sound on"} />

  const windowSize = useWindowSize()

  return <div className="header wrapper d-flex align-items-center justify-content-between">
    { windowSize.width > 768 && <div className="d-flex">
      {team.map(member => (
        <Character
        key={member.identity}
        character={member}
        size="avatar-sm mx-1" />
      ))}
    </div>}
    <div className='d-flex flex-column flex-md-row'>
      <ResourcesPanel gold={gold} />
    </div>
    <div>
      <Button value={buttonOne} onClick={onButtonOne} />
      <Button value={buttonTwo} onClick={onButtonTwo} />
      <Button value={musicButtonValue} onClick={toggleMuted} />
    </div>
  </div>
}
