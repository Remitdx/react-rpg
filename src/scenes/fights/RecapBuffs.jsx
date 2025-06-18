export function RecapBuffs({ buff, buffDatas }) {

  return <div className="fight-item recap-buffs wrapper">
    {buffDatas.map(item =>
      <div className="d-flex justify-content-center align-items-center" key={item.title}>
        <img className="item-sm" src={`${import.meta.env.BASE_URL}/images/${item.img}.png`} alt={item.title} />
      </div>
    )}
  </div>
}
