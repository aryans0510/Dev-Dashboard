import React, { useState, useEffect, useRef } from 'react';

export default function QuickNotesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [newNote, setNewNote] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const note = {
      id: Date.now(),
      text: newNote,
      priority: 'normal',
      createdAt: new Date().toISOString()
    };

    setNotes([note, ...notes]);
    setNewNote('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const togglePriority = (id) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, priority: note.priority === 'high' ? 'normal' : 'high' }
        : note
    ));
  };

  const recentNotes = notes.slice(0, 5); // Show only 5 most recent notes

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Quick Notes Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-lg transition-colors duration-200 border border-gray-700/50"
      >
        <span className="text-lg">📝</span>
        <span className="text-sm font-medium">Quick Notes</span>
        {notes.length > 0 && (
          <span className="px-2 py-1 text-xs bg-primary-600 text-white rounded-full">
            {notes.length}
          </span>
        )}
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Quick Notes</h3>
              <span className="text-sm text-gray-400">{notes.length} notes</span>
            </div>

            {/* Add New Note */}
            <form onSubmit={addNote} className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a quick note..."
                  className="flex-1 px-3 py-2 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm"
                >
                  Add
                </button>
              </div>
            </form>

            {/* Notes List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {recentNotes.length === 0 ? (
                <div className="text-center py-4 text-gray-400 text-sm">
                  No notes yet. Add your first quick note!
                </div>
              ) : (
                recentNotes.map(note => (
                  <div 
                    key={note.id} 
                    className={`p-3 rounded-lg border transition-colors ${
                      note.priority === 'high' 
                        ? 'bg-red-500/10 border-red-500/20' 
                        : 'bg-gray-700/30 border-gray-600/50 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-white text-sm leading-relaxed">{note.text}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs text-gray-400">
                            {new Date(note.createdAt).toLocaleDateString()}
                          </span>
                          {note.priority === 'high' && (
                            <span className="px-2 py-1 text-xs bg-red-600 text-white rounded-full">
                              High Priority
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-1 ml-2">
                        <button
                          onClick={() => togglePriority(note.id)}
                          className={`p-1 rounded text-xs transition-colors ${
                            note.priority === 'high' 
                              ? 'text-red-400 hover:text-red-300' 
                              : 'text-gray-400 hover:text-gray-300'
                          }`}
                          title={note.priority === 'high' ? 'Remove priority' : 'Mark as high priority'}
                        >
                          ⭐
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="p-1 rounded text-red-400 hover:text-red-300 text-xs transition-colors"
                          title="Delete note"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notes.length > 5 && (
              <div className="mt-4 pt-3 border-t border-gray-700">
                <div className="text-center">
                  <span className="text-sm text-gray-400">
                    Showing 5 of {notes.length} notes
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 