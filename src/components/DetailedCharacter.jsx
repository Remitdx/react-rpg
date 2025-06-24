export function DetailedCharacter({ pickCharacter, character, side }) {
  return <div className={`d-flex flex-column flex-md-row${side == "left" ? "-reverse" : ""} align-items-md-end`}>
    <div onClick={pickCharacter} className={`picker-character-${side} z-1 wrapper d-flex flex-column align-items-center`}>
      <img
        src={`${import.meta.env.BASE_URL}/images/${character.identity}.png`}
        alt={character.identity}
        className="avatar mb-2 z-0" />
      <p><strong>{character.identity}</strong></p>
      <div className="d-flex z-0">
        { character.type.map( type =>
          <img className="item-sm m-2 z-0" src={`${import.meta.env.BASE_URL}/images/${type}.png`} key={type} alt={type} />
        )}
    </div>
  </div>
  <div className={`picker-stats-${side}`}>
    <p>health: {character.health}</p>
    <p>strength: {character.strength}</p>
    <p>armor: {character.armor}</p>
    <p>resistance: {character.resistance}</p>
    <p>agility: {character.agility}</p>
  </div>
</div>
}
