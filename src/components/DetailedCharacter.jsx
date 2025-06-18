export function DetailedCharacter({ pickCharacter, character }) {
  if (!character) {
    return <div className="avatar">-</div>
  } else {
    return <div className="d-flex flex-column flex-md-row align-items-md-end">
    <div className="picker-character d-flex flex-column align-items-center">
      <img
        onClick={pickCharacter}
        src={`${import.meta.env.BASE_URL}/images/${character.identity}.png`}
        alt={character.identity}
        className="avatar mb-2" />
        <p><strong>{character.identity}</strong></p>
        <div className="d-flex">
          { character.type.map( type =>
            <img className="item-sm m-2" src={`${import.meta.env.BASE_URL}/images/${type}.png`} key={type} alt={type} />
          )}
        </div>
    </div>
    <div className="picker-stats">
      <p>health: {character.health}</p>
      <p>strength: {character.strength}</p>
      <p>armor: {character.armor}</p>
      <p>resistance: {character.resistance}</p>
      <p>agility: {character.agility}</p>
    </div>
  </div>
  }
}
