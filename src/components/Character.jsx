export function Character({ size, character, dead }) {

  if (!character) {
    return <div className="avatar">-</div>
  } else if (dead) {
    return <div>
      <img
        src={`${import.meta.env.BASE_URL}/images/${character.identity}BW.png`}
        alt={character.identity}
        className={size} />
    </div>
  } else {
    return <div>
      <img
        src={`${import.meta.env.BASE_URL}/images/${character.identity}.png`}
        alt={character.identity}
        className={size} />
    </div>
  }
}
