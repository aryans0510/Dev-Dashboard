import { useState, useEffect } from 'react'

export default function NewsFeed() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTag, setSelectedTag] = useState('javascript')

  const tags = [
    'javascript', 'react', 'python', 'webdev', 'beginners', 
    'tutorial', 'programming', 'opensource', 'devops', 'css'
  ]

  const fetchArticles = async (tag) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`https://dev.to/api/articles?tag=${tag}&per_page=10&top=7`)
      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }
      const data = await response.json()
      setArticles(data)
    } catch (err) {
      setError(err.message)
      // Fallback to mock data if API fails
      setArticles([
        {
          id: 1,
          title: "10 JavaScript Tips Every Developer Should Know",
          description: "Improve your JavaScript skills with these essential tips and tricks.",
          url: "#",
          user: { name: "Dev Community", profile_image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100&h=100&fit=crop" },
          published_at: new Date().toISOString(),
          tag_list: ["javascript", "tips", "webdev"],
          positive_reactions_count: 124
        },
        {
          id: 2,
          title: "Building Modern Web Apps with React",
          description: "A comprehensive guide to creating scalable React applications.",
          url: "#",
          user: { name: "React Expert", profile_image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?w=100&h=100&fit=crop" },
          published_at: new Date(Date.now() - 86400000).toISOString(),
          tag_list: ["react", "webdev", "frontend"],
          positive_reactions_count: 89
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles(selectedTag)
  }, [selectedTag])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    return `${diffDays} days ago`
  }

  return (
    <div className="widget-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <span className="text-2xl">📰</span>
          <span>Tech News</span>
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">via Dev.to</span>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Tag Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-primary-600 text-white'
                  : 'bg-black text-white hover:bg-black'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-6">
          <p className="text-yellow-300">⚠️ Using cached articles (API temporarily unavailable)</p>
        </div>
      )}

      {/* Articles List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {articles.length === 0 && !loading ? (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">📰</div>
            <p>No articles found for this tag.</p>
          </div>
        ) : (
          articles.map((article) => (
            <article
              key={article.id}
              className="p-4 bg-black text-white rounded-lg border border-gray-900/10 hover:bg-black transition-colors animate-slide-up"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={article.user.profile_image || `https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100&h=100&fit=crop`}
                  alt={article.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-300">{article.user.name}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-400">{formatDate(article.published_at)}</span>
                  </div>
                  
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-400 transition-colors"
                    >
                      {article.title}
                    </a>
                  </h3>
                  
                  {article.description && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {article.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {article.tag_list?.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-black text-white rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
                        <span>❤️</span>
                        <span>{article.positive_reactions_count || 0}</span>
                      </span>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        Read more →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}