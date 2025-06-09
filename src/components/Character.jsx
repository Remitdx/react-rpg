export function Character({ character }) {

  if (!character) {
    return <div className="avatar">-</div>
  } else {
    return <div>
      <img
        src={`${import.meta.env.BASE_URL}/images/${character.identity}.png`}
        alt={character.identity}
        className="avatar" />
    </div>
  }
}
