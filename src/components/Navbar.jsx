import React, { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-6xl">
        <div className="font-bold text-lg">CS - Ticket System</div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#">Home</a>
          <a href="#">FAQ</a>
          <a href="#">Changelog</a>
          <a href="#">Blog</a>
          <a href="#">Download</a>
          <a href="#">Contact</a>
          <button className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-md text-sm font-medium shadow">+ New Ticket</button>
        </nav>
        <button
          className="hidden" 
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>
      {menuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col gap-4 p-6">
            <a href="#">Home</a>
            <a href="#">FAQ</a>
            <a href="#">Changelog</a>
            <a href="#">Blog</a>
            <a href="#">Download</a>
            <a href="#">Contact</a>
            <button className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-md text-sm font-medium shadow">+ New Ticket</button>
          </nav>
        </div>
      )}
    </header>
  );
}
