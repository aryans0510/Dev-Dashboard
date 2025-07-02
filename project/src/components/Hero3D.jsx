import { useState, useEffect } from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero3D() {
  // Motivational quotes and coding tips
  const motivationalQuotes = [
    "Success is not the key to happiness. Happiness is the key to success.",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Don't watch the clock; do what it does. Keep going.",
    "Code is like humor. When you have to explain it, it's bad.",
    "Strive for progress, not perfection."
  ]
  const codingTips = [
    "Break problems into smaller pieces and solve them one at a time.",
    "Write readable code. Comments help, but clean code is better.",
    "Test your code often. Small bugs are easier to fix than big ones.",
    "Keep learning new tools and languages to stay sharp.",
    "Refactor code regularly to keep it maintainable."
  ]
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  const randomTip = codingTips[Math.floor(Math.random() * codingTips.length)]

  return (
    <div className="relative w-full h-[40rem] rounded-2xl overflow-hidden glass-card p-0 m-0">
      {/* Spline 3D Scene (now GIF) */}
      <div className="w-full h-full rounded-2xl overflow-hidden relative">
        <img
          src="https://user-images.githubusercontent.com/74038190/225813708-98b745f2-7d22-48cf-9150-083f1b00d6c9.gif"
          alt="Developer Animation"
          className="absolute inset-0 w-full h-full min-h-full min-w-full object-cover"
          style={{ padding: 0, margin: 0 }}
        />
      </div>

      {/* Motivational Quote - Bottom Left Glassmorphic Card */}
      <div className="absolute bottom-10 left-10 z-20 max-w-sm">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-5 shadow-2xl shadow-black/30 hover:scale-105 transition-transform duration-300" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
          <span className="block text-xs font-bold text-primary-200 uppercase tracking-widest mb-2 drop-shadow">Motivational Quote</span>
          <p className="text-white text-lg italic font-semibold drop-shadow-lg">“{randomQuote}”</p>
        </div>
      </div>

      {/* Coding Tip - Right Glassmorphic Card */}
      <div className="absolute top-10 right-10 z-20 max-w-sm flex justify-end">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-5 shadow-2xl shadow-black/30 hover:scale-105 transition-transform duration-300 text-right" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}>
          <span className="block text-xs font-bold text-secondary-200 uppercase tracking-widest mb-2 drop-shadow">Today's Coding Tip</span>
          <p className="text-white text-lg font-semibold drop-shadow-lg">{randomTip}</p>
        </div>
      </div>

      {/* Time Display */}
      <div className="absolute top-6 right-6 z-10">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
          <span className="text-white text-sm font-mono">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  )
}