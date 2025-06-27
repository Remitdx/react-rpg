import { Header } from '../components/Header'
import { BuffTile } from '../components/BuffTile'
import { Alert } from '../components/Alert'

export function Shop({ team, onMap, onTips, onBuy, buff, buffDatas, gold, showAlert }) {
  return <>
    <Header
      team={team}
      gold={gold}
      onButtonOne={onMap}
      buttonOne="Map"
      onButtonTwo={onTips}
      buttonTwo="Tips" />
    <div className="wrapper shop-grid main-window shop-bg my-3">
      <Alert showAlert={showAlert} type="alert-warning" text="Sorry, you can't afford this !"/>
      {buffDatas.map((item, i) =>
        <BuffTile
          buff={buff[i]}
          item={item}
          key={i}
          onBuy={onBuy} />
      )}
    </div>
  </>

}
