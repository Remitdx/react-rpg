import { Button } from '../components/Button';

export function End({onMenu}) {
  return <div className="wrapper">
      <h1>Hi ! I'm Rémi and looking for a job.</h1>
      <h2>French full-stack engineer Ruby on rails / React</h2>
      <p>This was my React demo</p>
      <p>Find me there :</p>
      <div className="d-flex">
        <Button onClick={onMenu} value={"Main menu"} />
        <p>Github : </p>
        <p>Portfolio : </p>
      </div>
    </div>
}
