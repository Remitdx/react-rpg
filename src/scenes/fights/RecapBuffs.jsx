export function RecapBuffs({ buff, buffDatas }) {

  if (buff.includes(true)) {
    return <div className="fight-item recap-buffs wrapper">
      {buffDatas.map((item, i) =>
        <div className="d-flex justify-content-center align-items-center" key={item.title}>
          { buff[i] ? <img
              className="item-sm"
              src={`${import.meta.env.BASE_URL}/images/${item.img}BW.png`}
              alt={item.title} /> :
            <img
              className="item-sm"
              src={`${import.meta.env.BASE_URL}/images/${item.img}.png`}
              alt={item.title} />
          }
        </div>
      )}
    </div>
  }
}
