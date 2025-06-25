export function ResourcesPanel({ gold }) {
  return <div className="gold">
      <div className="gold-amount">{gold}</div>
      <img className="avatar-sm" src={`${import.meta.env.BASE_URL}/images/gold.png`} alt="gold" />
    </div>
}
