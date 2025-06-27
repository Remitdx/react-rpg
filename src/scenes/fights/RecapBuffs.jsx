import { useWindowSize } from "@uidotdev/usehooks"

export function RecapBuffs({ buff, buffDatas, bossHealth }) {

  const windowSize = useWindowSize()

  const showDescription = (e) => {
    windowSize.width > 768 ? e.currentTarget.children[1].classList.remove("d-none") : null
  }

  const hideDescription = (e) => {
    e.currentTarget.children[1].classList.add("d-none")
  }

  if (buff.includes(true) && bossHealth > 0) {
    return <div className="fight-item recap-buffs wrapper position-relative">
      {buffDatas.map((item, i) =>
        <div onMouseEnter={showDescription} onMouseLeave={hideDescription} className="d-flex justify-content-center align-items-center" key={item.title}>
          { buff[i] ? <img
              className="item-sm"
              src={`${import.meta.env.BASE_URL}/images/${item.img}BW.png`}
              alt={item.title} /> :
            <img
              className="item-sm"
              src={`${import.meta.env.BASE_URL}/images/${item.img}.png`}
              alt={item.title} />
          }
          <p className="d-none item-description">{item.description}</p>
        </div>
      )}
    </div>
  }
}
