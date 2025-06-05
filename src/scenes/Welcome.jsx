import { Button } from '../components/Button'

export function Welcome({onClick}) {
  return <>
    <h1>React RPG fighter</h1>
    <p>Pick champions, fight, free your land.</p>
    <Button onClick={onClick} value={"Jouer"} />
  </>
}
