import { Header } from '../components/Header'
import { Button } from '../components/Button'
import { BuffTile } from '../components/BuffTile'

export function Shop({ team, onMap, onTips, onBuy, onSell, buff, buffDatas, gold }) {
  return <>
    <Header
      team={team}
      gold={gold}
      onButtonOne={onMap}
      buttonOne="Map"
      onButtonTwo={onTips}
      buttonTwo="Tips" />
    <div className="wrapper shop-grid main-window shop-bg my-3">
      {buffDatas.map((item, i) =>
        <BuffTile
          buff={buff[i]}
          item={item}
          key={i}
          onBuy={onBuy} />
      )}
      <div className="sell d-flex align-items-center justify-content-center">
        <Button value="Sell all" onClick={onSell} />
      </div>
    </div>
  </>

}
