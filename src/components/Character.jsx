export function Character({ onClick, character }) {

  if (!character) {
    return <div className="avatar">-</div>
  } else {
    return <div>
      <img
        src={`${import.meta.env.BASE_URL}/public/images/${character.type}.png`}
        alt={character.type}
        className="avatar"
        onClick={onClick} />
    </div>
  }
}
