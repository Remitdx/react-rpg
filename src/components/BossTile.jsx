export function BossTile({ onClick, item, boss }) {

  if (boss == 0) {
    return <div className="grid-item-pointer d-flex flex-column align-items-center justify-content-center">
      <img
        onClick={onClick}
        src={`${import.meta.env.BASE_URL}/images/${item.identity}.png`}
        alt={item.identity}
        className="avatar" />
    </div>
  } else {
    return <div className="d-flex flex-column align-items-center justify-content-center">
      <img
        src={boss == 2 ? `${import.meta.env.BASE_URL}/images/${item.identity}BW.png` : `${import.meta.env.BASE_URL}/images/question.png`}
        alt={boss == 2 ? item.identity : "question-mark"}
        className="avatar" />
    </div>
  }
}
