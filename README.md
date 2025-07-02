# 🚀 Dev-Dashboard - Developer Productivity Dashboard

A beautiful, modern productivity dashboard designed specifically for developers. Built with React, Tailwind CSS, and featuring stunning 3D animations powered by Spline.

![Dev-Dashboard](https://user-images.githubusercontent.com/74038190/225813708-98b745f2-7d22-48cf-9150-083f1b00d6c9.gif)

## ✨ Features

### 🎨 **Modern Design**
- Glassmorphism UI with backdrop blur effects
- Responsive design (mobile & desktop friendly)
- Dark/Light mode with system preference detection
- Smooth, aesthetic animations and micro-interactions
- Professional color system with consistent branding

### 🛠️ **Productivity Widgets**

#### 📊 **Advanced GitHub Analyzer**
- Real-time repository statistics and user profile info
- Recent repositories with language indicators
- Stars, forks, follower counts, and advanced metrics
- Personalized insights and recommendations
- Animated prompt to guide user to enter their GitHub username

#### 📝 **Quick Notes Dropdown**
- Take quick notes from the header dropdown
- LocalStorage persistence
- Easy access and management

#### 🔖 **Bookmarks Dropdown**
- Save and access bookmarks from the header dropdown
- Visual icons and quick links

#### 📰 **Tech News Feed**
- Live articles from Dev.to API
- Filter by technology tags (JavaScript, React, Python, etc.)
- Article previews with author info and engagement metrics

#### 🎯 **3D Hero Section**
- Interactive Spline 3D animation
- Live dashboard indicator

#### 🧑‍💻 **Learning Path Tracker**
- Track your learning progress and goals
- Beginner-friendly, visual progress

#### 🐞 **Code Debugger**
- Beginner-friendly code debugging panel
- Example code and modal popup for learning

#### 🌙 **Dark Mode Toggle**
- Easily switch between light and dark themes

#### 👋 **Welcome Animation**
- Animated, aesthetic welcome screen with space zoom effect

## 🛠️ **Tech Stack**

- **Frontend:** React 18 (JavaScript/JSX - No TypeScript)
- **Styling:** Tailwind CSS with custom design system
- **3D Graphics:** Spline via @splinetool/react-spline
- **Build Tool:** Vite for fast development and building
- **State Management:** React Hooks (useState, useEffect)
- **Data Persistence:** localStorage for client-side storage
- **APIs:** GitHub API, Dev.to API


## 📁 **Project Structure**

```
dev-dashboard/
├── src/
│   ├── components/           # React components
│   │   ├── Hero3D.jsx       # 3D Spline hero section
│   │   ├── GitHubStats.jsx  # GitHub API integration
│   │   ├── NotesWidget.jsx  # Notes management
│   │   ├── NewsFeed.jsx     # Dev.to news feed
│   │   ├── Bookmarks.jsx    # Bookmark manager
│   │   └── DarkModeToggle.jsx # Theme switcher
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles + Tailwind
├── public/                  # Static assets
├── index.html               # HTML template
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies and scripts
```

## 🎨 **Customization**

### **Colors**
The design system uses a comprehensive color palette defined in `tailwind.config.js`:
- **Primary:** Blue (#3B82F6) - Used for main actions and highlights
- **Secondary:** Purple (#8B5CF6) - Used for accents and secondary elements
- **Accent:** Red (#EF4444) - Used for alerts and important actions
- **Gray Scale:** Custom gray palette for backgrounds and text

### **Typography**
- **Font Family:** Inter (loaded from Google Fonts)
- **Font Weights:** 300, 400, 500, 600, 700
- **Line Heights:** 150% for body text, 120% for headings

### **Adding New Widgets**
1. Create a new component in `src/components/`
2. Import and add to the dashboard grid in `App.jsx`
3. Follow the existing widget pattern with the `widget-card` class

## 🔧 **API Configuration**

### **GitHub API**
- Uses public GitHub API (no authentication required)
- Rate limit: 60 requests per hour per IP
- Configure username in the GitHub Stats widget

### **Dev.to API**
- Uses public Dev.to API
- No authentication required
- Fetches latest articles by technology tags

## 📱 **Responsive Design**

The dashboard is fully responsive with breakpoints:
- **Mobile:** < 768px (single column layout)
- **Tablet:** 768px - 1024px (two column layout)
- **Desktop:** > 1024px (three column layout)

## 🎯 **Performance Features**

- **Lazy Loading:** Components load only when needed
- **LocalStorage Caching:** Reduces API calls and improves performance
- **Optimized Bundle:** Vite provides efficient code splitting
- **Image Optimization:** Uses WebP format where supported

## 🛡️ **Security & Privacy**

- **No server-side storage** - all data stays on your device
- **HTTPS-only external requests**
- **No tracking or analytics**
- **Secure localStorage** usage for data persistence

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Spline** for 3D graphics capabilities
- **Dev.to** for the excellent articles API
- **GitHub** for the comprehensive developer API
- **Tailwind CSS** for the utility-first CSS framework
- **Pexels** for stock photos used in the design

---

**Built with ❤️ for the developer community**

*Boost your productivity with a dashboard designed by developers, for developers.*
