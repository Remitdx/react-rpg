import { Character } from '../components/Character'
import { Button } from '../components/Button'
import { Tile } from '../components/Tile'
import { ResourcesPanel } from '../components/ResourcesPanel'

export function Map({ team, gold, onShop, mapDatas, onFight }) {
  return <div className='map-wrapper'>
      <div className="header d-flex">
        <div className="d-flex">
          {team.map(member => (
            <Character
            key={member.identity}
            character={member} />
          ))}
          </div>
        <Button value="Shop" onClick={onShop}/>
        <ResourcesPanel gold={gold}/>
      </div>
      <div className="map">
      {mapDatas.map((boss, i) =>
        boss ? <Tile
          boss={boss}
          key={boss.boss}
          onClick={onFight} /> :
          <div key={i} className="tile empty-tile"></div>
      )}
      </div>
    </div>

}
