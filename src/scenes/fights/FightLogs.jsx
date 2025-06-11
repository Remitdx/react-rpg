export function FightLogs({logs}) {
  return <div className="fight-item fight-logs">
    <ul>
      {logs.map((log, i) => (
        <li key={i}>{log}</li>
      ))}
    </ul>
  </div>
}
