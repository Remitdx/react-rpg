export function Order({ order, bossHealth, characterOneHealth, characterTwoHealth, characterThreeHealth }) {
  if (bossHealth > 0 && !(characterOneHealth > 0 && characterTwoHealth > 0 && characterThreeHealth > 0)) {
    return <div className="fight-item order-list d-flex justify-content-center align-items-center">
      <div className="wrapper d-flex flex-md-column-reverse">
        <div>next</div>
        {order.map(fighter =>
        <div key={fighter.identity}>
          <img className="item-sm" src={`${import.meta.env.BASE_URL}/images/${fighter.identity}.png`} alt={fighter.identity} />
        </div>
        )}
      </div>
    </div>
  }
}
