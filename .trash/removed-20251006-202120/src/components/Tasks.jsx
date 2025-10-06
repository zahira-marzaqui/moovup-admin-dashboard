import React from "react";

const statusMeta = {
  todo: { label: "À faire", color: "#f59e0b" },
  doing: { label: "En cours", color: "#3b82f6" },
  done: { label: "Terminé", color: "#22c55e" },
  blocked: { label: "Bloqué", color: "#ef4444" },
};

export default function Tasks({ items = [] }) {
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>Tâche</th>
            <th>Assignee</th>
            <th>Échéance</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t, i) => {
            const meta = statusMeta[t.status] || statusMeta.todo;
            return (
              <tr key={i}>
                <td>{t.title}</td>
                <td>{t.owner}</td>
                <td>{t.due}</td>
                <td>
                  <span
                    className="tag"
                    style={{
                      borderColor: meta.color,
                      color: meta.color,
                      background: "transparent",
                    }}
                  >
                    <span className="dot" style={{ background: meta.color }} />
                    {meta.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
