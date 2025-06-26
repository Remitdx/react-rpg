export function Button({onClick, value, theme = "btn-light"}) {
  return <button onClick={onClick} className={`m-1 btn ${theme}`}>{value}</button>
}
