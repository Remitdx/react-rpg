export function BuffTile({ onBuy, item, buff }) {

  if (!buff) {
    return <div onClick={onBuy} className="tile grid-item-pointer d-flex flex-column align-items-center justify-content-center">
      <img
        src={`${import.meta.env.BASE_URL}/images/${item.img}.png`}
        alt={item.title}
        className="avatar-sm my-1" />
      <p>{item.title}</p>
    </div>
  }
}
