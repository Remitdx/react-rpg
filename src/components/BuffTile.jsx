import { useWindowSize } from "@uidotdev/usehooks"
import { Button } from "./Button"

export function BuffTile({ onBuy, item, buff }) {

  const windowSize = useWindowSize()

    const showDescription = (e) => {
      windowSize.width > 768 ? e.currentTarget.children[3].classList.remove("d-none") : null
    }

    const hideDescription = (e) => {
      e.currentTarget.children[3].classList.add("d-none")
    }

  if (!buff) {
    return <div onClick={onBuy} onMouseEnter={showDescription} onMouseLeave={hideDescription} className="grid-item-pointer item-available position-relative d-flex flex-column align-items-center justify-content-center">
      <img
        src={`${import.meta.env.BASE_URL}/images/${item.img}.png`}
        alt={item.title}
        className="avatar-sm my-1" />
      <p>{item.title}</p>
      <Button value={`cost: ${item.cost}`} />
      <p className="d-none item-description">{item.description}</p>
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
