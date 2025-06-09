export function ResourcesPanel({ gold }) {
  return <div className="d-flex align-items-center">
      <div>{gold}</div>
      <img className="avatar-sm mx-3" src={`${import.meta.env.BASE_URL}/images/gold.png`} alt="gold" />
    </div>
}
