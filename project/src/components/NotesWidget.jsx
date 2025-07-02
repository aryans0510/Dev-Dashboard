import { useState, useEffect } from 'react'

export default function NotesWidget() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('dashboard-notes')
    return savedNotes ? JSON.parse(savedNotes) : []
  })
  const [newNote, setNewNote] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    localStorage.setItem('dashboard-notes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        text: newNote.trim(),
        createdAt: new Date().toISOString(),
        priority: 'normal'
      }
      setNotes([note, ...notes])
      setNewNote('')
      setIsAdding(false)
    }
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const togglePriority = (id) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, priority: note.priority === 'high' ? 'normal' : 'high' }
        : note
    ))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="widget-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <span className="text-2xl">📝</span>
          <span>Quick Notes</span>
        </h2>
        <span className="text-sm text-white bg-black px-2 py-1 rounded">
          {notes.length} notes
        </span>
      </div>

      {/* Add Note Section */}
      <div className="mb-6">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span className="text-xl">+</span>
            <span>Add new note</span>
          </button>
        ) : (
          <div className="space-y-3">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write your note here..."
              className="w-full h-24 px-4 py-3 bg-black text-white border border-gray-900/10 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={addNote}
                disabled={!newNote.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex-1"
              >
                Add Note
              </button>
              <button
                onClick={() => {
                  setIsAdding(false)
                  setNewNote('')
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notes List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">📋</div>
            <p>No notes yet. Add your first note above!</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`p-4 rounded-lg border transition-all duration-200 animate-slide-up ${
                note.priority === 'high'
                  ? 'bg-accent-900/20 border-accent-600/50'
                  : 'bg-black text-white border border-gray-900/10'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePriority(note.id)}
                    className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      note.priority === 'high'
                        ? 'bg-accent-500 border-accent-500'
                        : 'border-gray-500 hover:border-accent-500'
                    }`}
                    title={note.priority === 'high' ? 'High priority' : 'Normal priority'}
                  />
                  <span className="text-xs text-gray-400">
                    {formatDate(note.createdAt)}
                  </span>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                  title="Delete note"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                {note.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}