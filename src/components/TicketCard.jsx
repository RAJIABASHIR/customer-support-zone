import React from 'react';

function formatDate(date) {
  try {
    return new Date(date).toLocaleDateString();
  } catch {
    return date;
  }
}

export default function TicketCard({ ticket, onAdd }) {
  const badge =
    ticket.status === 'Open' ? 'bg-emerald-50 text-emerald-700' :
    ticket.status === 'In-Progress' ? 'bg-amber-50 text-amber-700' :
    'bg-gray-100 text-gray-700';

  const priorityClass =
    ticket.priority === 'High' ? 'text-red-500 font-semibold' :
    ticket.priority === 'Medium' ? 'text-amber-500 font-semibold' :
    'text-green-500 font-semibold';

  return (
    <article
      className="ticket-card cursor-pointer hover:-translate-y-1 transition"
      onClick={() => onAdd(ticket.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onAdd(ticket.id); }}
    >
      <div className="flex justify-between">
        <div className="max-w-[70%]">
          <h4 className="font-semibold text-sm">{ticket.title}</h4>
          <p className="text-xs text-gray-500 mt-2 text-clamp-3">{ticket.description}</p>
        </div>
        <div className="text-right">
          <div className={`inline-block px-3 py-1 rounded-full text-xs ${badge}`}>{ticket.status}</div>
        </div>
      </div>

      <div className="flex justify-between items-end mt-4 text-xs text-gray-500">
        <div>
          <div className="text-[11px] text-gray-400">{ticket.id}</div>
          <div className={`mt-1 ${priorityClass}`}>{ticket.priority.toUpperCase()} PRIORITY</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-700">{ticket.customer}</div>
          <div className="text-[11px] text-gray-400 mt-1">{formatDate(ticket.createdAt)}</div>
        </div>
      </div>
    </article>
  );
}