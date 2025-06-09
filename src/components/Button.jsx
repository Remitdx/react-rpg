export function Button({onClick, value}) {
  return <button onClick={onClick} className="btn btn-light">{value}</button>
}
