import { Tile } from '../components/Tile'
import { Header } from '../components/Header'

export function Map({ team, gold, onWhere, mapDatas, onFight }) {
  return <div>
      <Header team={team} gold={gold} onWhere={onWhere} buttonValue="Shop" />
      <div className="grid map-bg wrapper my-3">
        {/* {mapDatas.map((boss, i) =>
          boss ? <Tile
            boss={boss}
            key={boss.boss}
            onClick={onFight} /> :
            <div key={i} className="tile"></div>
        )} */}
      </div>
    </div>

}
