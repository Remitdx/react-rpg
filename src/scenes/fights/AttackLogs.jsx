export function AttackLogs({attackLogs}) {
  return <div className="fight-item attack-logs">
    <ul>
      {attackLogs.map((log, i) => (
        <li key={i}>{log}</li>
      ))}
    </ul>
  </div>
}
