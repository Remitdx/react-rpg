import { DetailedCharacter } from '../components/DetailedCharacter'
import { Character } from '../components/Character'
import { Button } from '../components/Button'

export function TeamPicker({team, pickCharacter, charactersLeft, onClick}) {

  const shuffledArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  const picks = (shuffledArray(charactersLeft)).slice(0, 2)

  return <div className='team-picker'>
    <h2>Your Team</h2>
    <div className="wrapper d-flex justify-content-around">
      {team.length < 3 ? <Character character={team[0]}/> : <DetailedCharacter character={team[0]} />}
      {team.length < 3 ? <Character character={team[1]}/> : <DetailedCharacter character={team[1]} />}
      {team.length < 3 ? <Character character={team[2]}/> : <DetailedCharacter character={team[2]} />}
    </div>
    {team.length < 3 ? <h2>Pick one</h2> : <h2></h2> }
    <div className="wrapper d-flex justify-content-around">
      { team.length < 3 ?
        picks.map(pick => (
          <DetailedCharacter
            key={pick.identity}
            character={pick}
            pickCharacter={pickCharacter} />
        )) : <Button onClick={onClick} value="Valider"/>
      }
    </div>
  </div>
}
