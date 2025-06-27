export function FightLogs({logs}) {

  const logAboutBoss = (log) => {
    return log.startsWith("- GOATGUY") ||
      log.startsWith("- PRINCESS") ||
      log.startsWith("- SIRENA") ||
      log.startsWith("- KING") ||
      log.startsWith("- MINOTAUR") ||
      log.startsWith("- MEDUSA") ? "yellow" : ""
  }

  return <div className="fight-item fight-logs">
    {logs.map((log, i) => (
      <p key={i} className={logAboutBoss(log)}>{log}</p>
    ))}
  </div>
}
