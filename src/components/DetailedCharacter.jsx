export function DetailedCharacter({ pickCharacter, character }) {
  if (!character) {
    return <div className="avatar">-</div>
  } else {
    return <div onClick={pickCharacter}>
    <img
      src={`${import.meta.env.BASE_URL}/images/${character.identity}.png`}
      alt={character.identity}
      className="avatar pick" />
    <div>
      <p><strong>{character.identity}</strong></p>
      <p>health: {character.health}</p>
      <p>strength: {character.strength}</p>
      <p>agility: {character.agility}</p>
    </div>
  </div>
  }
}
