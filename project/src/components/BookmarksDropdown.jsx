import React, { useState, useEffect, useRef } from 'react';

export default function BookmarksDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newBookmark, setNewBookmark] = useState({ title: '', url: '', category: 'development' });
  const [showForm, setShowForm] = useState(false);
  const dropdownRef = useRef(null);

  const categories = {
    development: { name: 'Development', icon: '💻', color: 'blue' },
    design: { name: 'Design', icon: '🎨', color: 'purple' },
    news: { name: 'News', icon: '📰', color: 'green' },
    tools: { name: 'Tools', icon: '🛠️', color: 'yellow' },
    learning: { name: 'Learning', icon: '📚', color: 'red' }
  };

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addBookmark = (e) => {
    e.preventDefault();
    if (!newBookmark.title.trim() || !newBookmark.url.trim()) return;

    const bookmark = {
      id: Date.now(),
      ...newBookmark,
      createdAt: new Date().toISOString()
    };

    setBookmarks([bookmark, ...bookmarks]);
    setNewBookmark({ title: '', url: '', category: 'development' });
    setShowForm(false);
  };

  const deleteBookmark = (id) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
  };

  const recentBookmarks = bookmarks.slice(0, 5);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-lg transition-colors duration-200 border border-gray-700/50"
      >
        <span className="text-lg">🔖</span>
        <span className="text-sm font-medium">Bookmarks</span>
        {bookmarks.length > 0 && (
          <span className="px-2 py-1 text-xs bg-primary-600 text-white rounded-full">
            {bookmarks.length}
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

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Bookmarks</h3>
              <button
                onClick={() => setShowForm(!showForm)}
                className="text-sm text-primary-400 hover:text-primary-300"
              >
                {showForm ? 'Cancel' : '+ Add'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={addBookmark} className="mb-4 p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                <input
                  type="text"
                  placeholder="Bookmark title"
                  value={newBookmark.title}
                  onChange={(e) => setNewBookmark({...newBookmark, title: e.target.value})}
                  className="w-full px-3 py-2 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm mb-2"
                  required
                />
                <input
                  type="url"
                  placeholder="URL"
                  value={newBookmark.url}
                  onChange={(e) => setNewBookmark({...newBookmark, url: e.target.value})}
                  className="w-full px-3 py-2 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm mb-2"
                  required
                />
                <select
                  value={newBookmark.category}
                  onChange={(e) => setNewBookmark({...newBookmark, category: e.target.value})}
                  className="w-full px-3 py-2 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm mb-2"
                >
                  {Object.entries(categories).map(([key, cat]) => (
                    <option key={key} value={key}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
                <div className="flex space-x-2">
                  <button type="submit" className="flex-1 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm">
                    Add Bookmark
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {recentBookmarks.length === 0 ? (
                <div className="text-center py-4 text-gray-400 text-sm">
                  No bookmarks yet. Add your first bookmark!
                </div>
              ) : (
                recentBookmarks.map(bookmark => (
                  <div key={bookmark.id} className="p-3 bg-gray-700/30 border border-gray-600/50 rounded-lg hover:bg-gray-700/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm">{categories[bookmark.category].icon}</span>
                          <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-sm font-medium hover:text-primary-400 transition-colors"
                          >
                            {bookmark.title}
                          </a>
                        </div>
                        <div className="text-xs text-gray-400 truncate">{bookmark.url}</div>
                      </div>
                      <button
                        onClick={() => deleteBookmark(bookmark.id)}
                        className="p-1 rounded text-red-400 hover:text-red-300 text-xs transition-colors ml-2"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {bookmarks.length > 5 && (
              <div className="mt-4 pt-3 border-t border-gray-700">
                <div className="text-center">
                  <span className="text-sm text-gray-400">
                    Showing 5 of {bookmarks.length} bookmarks
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