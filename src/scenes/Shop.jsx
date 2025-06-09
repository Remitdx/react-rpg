import { Header } from '../components/Header'

export function Shop({ team, onWhere, gold }) {
  return <div>
    <Header team={team} gold={gold} onWhere={onWhere} buttonValue="Map" />
    <div className="wrapper grid shop-bg my-3"></div>
  </div>

}
