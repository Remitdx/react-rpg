import { Header } from "../components/Header";

export function Tips({team, gold, onShop, onMap}) {
  return <div>
    <Header
      team={team}
      gold={gold}
      onButtonOne={onMap}
      buttonOne="Map"
      onButtonTwo={onShop}
      buttonTwo="Shop" />
    <div className="tips wrapper main-window my-3">
      <h1 className="text-center">Tips</h1>
      <div className="d-flex flex-column flex-md-row justify-content-around align-items-center">
        <div className="wrapper m-1">
          <h2 className="text-center">Roles</h2>
          <p className="d-flex align-items-end">
            <img className="item-sm" src={`${import.meta.env.BASE_URL}/images/tank.png`}/>
            : Champion is targeted first by opponents
          </p>
          <p className="d-flex align-items-end">
            <img className="item-sm" src={`${import.meta.env.BASE_URL}/images/attack.png`} />
            : Champion hits with physical damages
          </p>
          <p className="d-flex align-items-end">
            <img className="item-sm" src={`${import.meta.env.BASE_URL}/images/magic.png`}/>
            : Champion hits with magic damages
          </p>
          <p className="d-flex align-items-end">
            <img className="item-sm" src={`${import.meta.env.BASE_URL}/images/heal.png`} />
            : Champion can heal allies
          </p>
        </div>
        <div className="wrapper m-1">
          <h2 className="text-center">Statistics</h2>
          <p><strong>Health</strong> : Character or Boss die when reaching 0</p>
          <p><strong>Armor</strong> : reduce incoming physical damages</p>
          <p><strong>Resistance</strong> : reduce incoming magic damages</p>
          <p><strong>Strengh</strong> : Damages dealed before reduction by armor or resistance</p>
          <p><strong>Agility</strong> : Determine the attack order and frequency</p>
        </div>
      </div>
    </div>
  </div>
}
