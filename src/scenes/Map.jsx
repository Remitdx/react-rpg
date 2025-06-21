import { BossTile } from '../components/BossTile'
import { Header } from '../components/Header'

export function Map({ team, gold, onShop, onTips, boss, bossDatas, onFight, muted, onMute }) {
  return <div>
    <Header
      team={team}
      gold={gold}
      onMute={onMute}
      muted={muted}
      onButtonOne={onShop}
      buttonOne="Shop"
      onButtonTwo={onTips}
      buttonTwo="Tips" />
    <div className="map-grid map-bg main-window wrapper my-3">
      {bossDatas.map((item, i) =>
        <BossTile
          boss={boss[i]}
          item={item}
          key={i}
          onClick={onFight} />
      )}
    </div>
  </div>
}
