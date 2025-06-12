import { Header } from '../components/Header'

export function Shop({ team, onMap, onTips, buff, buffDatas, gold }) {
  return <div>
    <Header
      team={team}
      gold={gold}
      onButtonOne={onMap}
      buttonOne="Map"
      onButtonTwo={onTips}
      buttonTwo="Tips" />
    <div className="wrapper grid main-window shop-bg my-3"></div>
  </div>

}
