export function AttackLogs({attackLogs}) {
  return <div className="fight-item attack-logs">
    <ul>
      {attackLogs.map(log => (
        <li>{log}</li>
      ))}
    </ul>
  </div>
}
