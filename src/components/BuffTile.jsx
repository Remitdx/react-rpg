export function BuffTile({ onBuy, item, buff }) {

  if (!buff) {
    return <div className="grid-item-pointer d-flex flex-column align-items-center justify-content-center">
      <img
        onClick={onBuy}
        src={`${import.meta.env.BASE_URL}/images/${item.img}.png`}
        alt={item.title}
        className="avatar-sm my-1" />
      <p>{item.title}</p>
    </div>
  }
}
