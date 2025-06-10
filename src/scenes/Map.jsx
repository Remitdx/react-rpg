import { Tile } from '../components/Tile'
import { Header } from '../components/Header'

export function Map({ team, gold, onWhere, boss, bossDatas, onFight }) {
  return <div>
      <Header team={team} gold={gold} onWhere={onWhere} buttonValue="Shop" />
      <div className="grid map-bg main-window wrapper my-3">
        {bossDatas.map((item, i) =>
          <Tile
            boss={boss[i]}
            item={item}
            key={i}
            onClick={onFight} />
        )}
      </div>
    </div>

}
