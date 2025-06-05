export function Button({onClick, value}) {
  return <button onClick={onClick} className="btn btn-dark">{value}</button>
}
