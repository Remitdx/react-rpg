export function Tile({ onClick, boss }) {
  return <div onClick={onClick} className="tile">{boss.boss}</div>
}
