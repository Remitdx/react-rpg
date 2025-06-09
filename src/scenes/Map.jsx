import { Character } from '../components/Character'

export function Map({ team }) {
  return <div>
      <h1>Map</h1>
        {team.map(member => (
          <Character
            key={member.type}
            character={member} />
        ))}
    </div>

}
