import { Button } from '../../components/Button';
import { Character } from '../../components/Character';

export function Line({line, order, onClick}) {
  return <div className="backline d-flex align-items-end">
    {line.map(character =>
      <div key={character.identity}>
        {order[0] == character ? <Button value="Attack" onClick={onClick}/> : null }
        {order[0] == character ? <Character size="avatar" character={character} />  : <Character size="avatar-sm" character={character}/>}
      </div>
    )}
  </div>
}
