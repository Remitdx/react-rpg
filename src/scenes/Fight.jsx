import { Button } from '../components/Button'

export function Fight({ onMap }) {
  return <div>
    <h1>Fight</h1>
    <Button value="Retreat" onClick={onMap}/>
  </div>
}
