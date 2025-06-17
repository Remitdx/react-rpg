export function FightLogs({logs}) {
  return <div className="fight-item fight-logs">
    {logs.map((log, i) => (
      <p key={i}>{log}</p>
    ))}
  </div>
}
