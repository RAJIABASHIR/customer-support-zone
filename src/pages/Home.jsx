import React, { useEffect, useState, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import TicketCard from '../components/TicketCard';
import TaskStatus from '../components/TaskStatus';
import Footer from '../components/Footer';

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/data.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) {
          setTickets(data.map(t => ({ ...t })));
          setError(null);
        }
      } catch (err) {
        console.error("Failed to load /data.json", err);
        if (mounted) setError(err.message || "Failed to load data");
        toast.error("Failed to load ticket data");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Counts
  const inProgressCount = useMemo(
    () => tickets.filter(t => t.status === 'In-Progress').length,
    [tickets]
  );
  const resolvedCount = useMemo(
    () => tickets.filter(t => t.status === 'Resolved').length,
    [tickets]
  );
  function addToTask(ticketId) {
    if (selectedIds.includes(ticketId)) {
      toast.info('Ticket is already in Task Status');
      return;
    }
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId
          ? { ...t, status: t.status === 'Resolved' ? 'Resolved' : 'In-Progress' }
          : t
      )
    );
    setSelectedIds(prev => [...prev, ticketId]);
    toast.success('Added to Task Status');
  }

  // Complete task
  function completeTask(ticketId) {
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId
          ? { ...t, status: 'Resolved' }
          : t
      )
    );
    setSelectedIds(prev => prev.filter(id => id !== ticketId));
    toast.success('Ticket marked as Resolved');
  }

  const visibleTickets = tickets.filter(t => t.status !== 'Resolved');

  return (
    <>
      <Navbar />
      <Banner inProgress={inProgressCount || 0} resolved={resolvedCount || 0} />

      <main className="container mx-auto px-6 mt-8 max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Tickets</h3>

          {loading && (
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <div className="text-sm text-gray-500">Loading tickets…</div>
            </div>
          )}

          {error && !loading && (
            <div className="p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-md mb-4">
              Error loading tickets: {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleTickets.length === 0 && (
                <div className="p-4 bg-white rounded-md border text-gray-500">
                  No tickets available.
                </div>
              )}
              {visibleTickets.map(t => (
                <TicketCard key={t.id} ticket={t} onAdd={addToTask} />
              ))}
            </div>
          )}
        </div>

        <TaskStatus
          tickets={tickets}
          selectedIds={selectedIds}
          onComplete={completeTask}
        />
      </main>

      <Footer />
      <ToastContainer position="top-right" autoClose={2400} hideProgressBar={false} />
    </>
  );
}