export function Order({ order, bossHealth }) {
  if (bossHealth > 0) {
    return <div className="fight-item wrapper order-list d-flex flex-md-column-reverse justify-content-center align-items-center">
      <div>next</div>
      {order.map(fighter =>
      <div key={fighter.identity}>
        <img className="item-sm" src={`${import.meta.env.BASE_URL}/images/${fighter.identity}.png`} alt={fighter.identity} />
      </div>
      )}
    </div>
  }
}
