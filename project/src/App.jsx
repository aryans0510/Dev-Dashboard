import { useState, useEffect } from 'react'
import Hero3D from './components/Hero3D'
import GitHubProfileBox from './components/GitHubStats'
import NotesWidget from './components/NotesWidget'
import NewsFeed from './components/NewsFeed'
import QuickNotesDropdown from './components/QuickNotesDropdown'
import BookmarksDropdown from './components/BookmarksDropdown'
import DarkModeToggle from './components/DarkModeToggle'
import WelcomeAnimation from './components/WelcomeAnimation'

import LearningPathTracker from './components/LearningPathTracker'
import CodeDebugger from './components/CodeDebugger'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode !== null) {
      return JSON.parse(savedMode)
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => setShowWelcome(false), 7300)
      return () => clearTimeout(timer)
    }
  }, [showWelcome])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      {showWelcome && <WelcomeAnimation onFinish={() => setShowWelcome(false)} />}
      {/* Header */}
      <header className="sticky top-0 z-50 px-4 sm:px-6 py-3 sm:py-4 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-800 transition-all duration-500 relative animate-fade-in">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-0">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start">
            {/* Unique Animated Logo */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-6 shadow-lg hover:shadow-2xl animate-pulse-glow relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              
              {/* Custom Dev Logo */}
              <svg className="w-6 h-6 text-white transition-transform duration-300 hover:scale-125 relative z-10" viewBox="0 0 24 24" fill="none">
                {/* Main bracket */}
                <path d="M8 4L4 12L8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 4L20 12L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                
                {/* Code dots */}
                <circle cx="12" cy="8" r="1" fill="currentColor" className="animate-pulse"/>
                <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-pulse" style={{animationDelay: '0.2s'}}/>
                <circle cx="12" cy="16" r="1" fill="currentColor" className="animate-pulse" style={{animationDelay: '0.4s'}}/>
                
                {/* Terminal cursor */}
                <rect x="10" y="10" width="2" height="2" fill="currentColor" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
              </svg>
            </div>
            {/* Enhanced Animated Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white relative group transition-all duration-500 hover:scale-105 text-center sm:text-left">
              Dev-Dashboard
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full transition-all duration-700 group-hover:w-full animate-pulse"></span>
            </h1>
          </div>
          
          {/* Header Actions with staggered animations */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 w-full sm:w-auto justify-center sm:justify-end">
            <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <QuickNotesDropdown />
            </div>
            <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <BookmarksDropdown />
            </div>
          </div>
        </div>
        
        {/* Dark Mode Toggle - Rightmost side, vertically centered */}
        <div className="absolute right-4 sm:right-12 top-1/2 sm:top-1/3 transform -translate-y-1/2 animate-fade-in-left" style={{animationDelay: '0.3s'}}>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 bg-black text-white">
        {/* Hero Section */}
        <section className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <Hero3D />
        </section>
        {/* Dashboard Grid */}
        <section className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <div className="xl:col-span-2 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <GitHubProfileBox />
          </div>
          <div className="space-y-4 sm:space-y-6 sticky top-24 self-start animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <CodeDebugger />
          </div>
        </section>
        {/* Learning Path Section */}
        <section className="mt-4 sm:mt-6 animate-fade-in-up" style={{animationDelay: '1.0s'}}>
          <LearningPathTracker />
        </section>
        
        {/* News Feed Section */}
        <section className="mt-4 sm:mt-6 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
          <NewsFeed />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-900/10 bg-black text-white backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-gray-400 gap-4">
            <div className="text-center md:text-left">
              <p className="mb-1">&copy; {new Date().getFullYear()} <span className="font-bold text-white">ArYaN</span>. All rights reserved.</p>
            </div>
            <div className="flex space-x-4 text-lg">
              <a href="https://www.instagram.com/_.aryann05/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41a4.92 4.92 0 0 1 1.77 1.03 4.92 4.92 0 0 1 1.03 1.77c.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43a4.92 4.92 0 0 1-1.03 1.77 4.92 4.92 0 0 1-1.77 1.03c-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41a4.92 4.92 0 0 1-1.77-1.03 4.92 4.92 0 0 1-1.03-1.77c-.17-.46-.354-1.26-.41-2.43C2.212 15.784 2.2 15.4 2.2 12.2s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43a4.92 4.92 0 0 1 1.03-1.77 4.92 4.92 0 0 1 1.77-1.03c.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07 5.77.128 4.87.312 4.1.54a7.07 7.07 0 0 0-2.56 1.64A7.07 7.07 0 0 0 .54 4.1c-.228.77-.412 1.67-.47 2.952C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.282.242 2.182.47 2.952a7.07 7.07 0 0 0 1.64 2.56 7.07 7.07 0 0 0 2.56 1.64c.77.228 1.67.412 2.952.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.282-.058 2.182-.242 2.952-.47a7.07 7.07 0 0 0 2.56-1.64 7.07 7.07 0 0 0 1.64-2.56c.228-.77.412-1.67.47-2.952.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.282-.242-2.182-.47-2.952a7.07 7.07 0 0 0-1.64-2.56A7.07 7.07 0 0 0 19.9.54c-.77-.228-1.67-.412-2.952-.47C15.668.012 15.264 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.844-11.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
              </a>
              <a href="https://github.com/aryans0510" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="GitHub">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
              </a>
              <a href="mailto:aryands0510@gmail.com" className="hover:text-white transition-colors" title="Email">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8.99l8 7 8-7V18H4z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/aryan-singh-6b408836a/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}