export function HealthBar({ maxHealth, currentHealth }) {

  const healthRatio = Math.floor(currentHealth / maxHealth * 100)

  const healthColor = () => {
    return healthRatio > 75 ? "green" : healthRatio > 30 ? "yellow" : "red"
  }

  return <>
    <div className="healthbar-bg">
      <div className={`healthbar ${healthColor()}`} style={{width:`${healthRatio}%`}}></div>
    </div>
    <p>Health :{currentHealth}</p>
  </>
}
