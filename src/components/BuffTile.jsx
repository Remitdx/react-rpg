import { Button } from "./Button"

export function BuffTile({ onBuy, item, buff }) {
  if (!buff) {
    return <div onClick={onBuy} className="grid-item-pointer d-flex flex-column align-items-center justify-content-center">
      <img
        src={`${import.meta.env.BASE_URL}/images/${item.img}.png`}
        alt={item.title}
        className="avatar-sm my-1" />
      <p>{item.title}</p>
      <Button value={`cost: ${item.cost}`} />
    </div>
  } else {
    return <div onClick={onBuy} className="grid-item-pointer item-bought d-flex flex-column align-items-center justify-content-center">
      <img
        src={`${import.meta.env.BASE_URL}/images/${item.img}BW.png`}
        alt={item.title}
        className="avatar-sm my-1" />
      <p>{item.title}</p>
      <Button value="Refund" theme="btn-dark"/>
    </div>
  }
}
