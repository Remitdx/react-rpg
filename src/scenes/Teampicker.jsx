import { DetailedCharacter } from '../components/DetailedCharacter'
import { Character } from '../components/Character'

export function TeamPicker({team, charactersLeft}) {

  console.log(charactersLeft[0].type)

  return <div>
      <h1>TeamPicker</h1>
      <div className="team d-flex justify-content-around">
        {<Character character={team[0]} />}
        {<Character character={team[1]} />}
        {<Character character={team[2]} />}
      </div>
    <div className="picker d-flex justify-content-around">
      <DetailedCharacter character={charactersLeft[0]} />
      <DetailedCharacter character={charactersLeft[2]} />
      </div>
    </div>
}
