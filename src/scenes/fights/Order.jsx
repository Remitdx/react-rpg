export function Order({order}) {
  return <div className="fight-item order-list d-flex justify-content-center align-items-center">
    <div className="wrapper d-flex flex-md-column-reverse">
      <div>next</div>
      {order.map(fighter =>
      <div key={fighter.identity}>
        <img className="item-sm" src={`${import.meta.env.BASE_URL}/images/${fighter.identity}.png`} alt={fighter.identity} />
      </div>
      )}
      <div>last</div>
    </div>
  </div>
}
