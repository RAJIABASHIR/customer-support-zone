import React from 'react';

export default function TaskStatus({ tickets, selectedIds, onComplete }) {
  const resolved = tickets.filter(t => t.status === 'Resolved');

  return (
    <aside className="w-full md:w-80">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h4 className="font-semibold text-gray-800">Task Status</h4>
        <p className="text-xs text-gray-500 mt-1">Select a ticket to add to Task Status</p>

        <div className="mt-4">
          {selectedIds.length === 0 && <div className="text-sm text-gray-400">No tasks selected yet.</div>}
          {selectedIds.map(id => {
            const ticket = tickets.find(t => t.id === id);
            if (!ticket) return null;
            return (
              <div key={id} className="flex items-center justify-between mb-3 p-3 bg-gradient-to-b from-white to-slate-50 rounded-md border">
                <div className="font-medium text-sm">{ticket.title}</div>
           <button
           className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition"
             onClick={(e) => { e.stopPropagation(); onComplete(id); }}
>
            Complete
          </button>
              </div>
            );
          })}
        </div>

        <hr className="my-3" />

        <h4 className="text-gray-800 font-semibold">Resolved Task</h4>
        <div className="mt-3">
          {resolved.length === 0 && <div className="text-sm text-gray-400">No resolved tasks yet.</div>}
          {resolved.map(r => (
            <div key={r.id} className="mb-2 p-2 rounded bg-white border text-sm text-gray-700">{r.title}</div>
          ))}
        </div>
      </div>
    </aside>
  );
}