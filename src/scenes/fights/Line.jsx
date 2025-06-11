import { Character } from '../../components/Character';

export function Line({line}) {

  console.log(line)

  return <div className="backline d-flex">
    {line.map(character =>
      <div key={character.identity}>
        <Character size="avatar-sm" character={character}/>
      </div>
    )}
  </div>
}
