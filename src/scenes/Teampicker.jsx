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
    <h2 className='text-center'>Your Team</h2>
    <div className="wrapper d-flex justify-content-around">
      <Character size="avatar" character={team[0]}/>
      <Character size="avatar" character={team[1]}/>
      <Character size="avatar" character={team[2]}/>
    </div>
    {team.length < 3 ? <h2 className='text-center mt-2'>Pick one</h2> : <h2></h2> }
    <div className="d-flex justify-content-around">
      { team.length < 3 ?
        picks.map((pick, i) => (
          <DetailedCharacter
            side={i == 1 ? "left" : "right "}
            key={pick.identity}
            character={pick}
            pickCharacter={pickCharacter} />
        )) : <Button onClick={onClick} value="Start adventure"/>
      }
    </div>
  </div>
}
