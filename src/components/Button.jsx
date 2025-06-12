export function Button({onClick, value}) {
  return <button onClick={onClick} className="m-1 btn btn-light">{value}</button>
}
