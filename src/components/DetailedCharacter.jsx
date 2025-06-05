export function DetailedCharacter({ onClick, character }) {
  return <div>
    <img
      src={`${import.meta.env.BASE_URL}/public/images/${character.type}.png`}
      alt={character.type}
      className="avatar"
      onClick={onClick} />
    <div>
      <p>health: {character.health}</p>
      <p>strength: {character.strength}</p>
      <p>agility: {character.agility}</p>
    </div>
  </div>
}
