export function Tile({ onClick, item, boss }) {

  if (boss == 1) {
    return <div className="tile d-flex flex-column align-items-center justify-content-center">?</div>
  } else {
    return <div onClick={onClick} className="tile d-flex flex-column align-items-center justify-content-center">
      <img
        src={ boss == 2 ? `${import.meta.env.BASE_URL}/images/${item.identity}BW.png` : `${import.meta.env.BASE_URL}/images/${item.identity}.png`}
        alt={item.identity}
        className="avatar" />
      <p>{item.identity}</p>
    </div>
  }
}
