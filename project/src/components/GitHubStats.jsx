import { useState, useEffect } from 'react'

// Enhanced GitHub data analysis with more comprehensive metrics
function analyzeGitHubData(user, repos) {
  const analysis = {
    tips: [],
    metrics: {},
    insights: {},
    recommendations: []
  };

  if (!repos.length) {
    analysis.tips.push('No public repositories found. Start by creating your first project!');
    return analysis;
  }

  // Basic metrics
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const languages = new Set(repos.map(r => r.language).filter(Boolean));
  const hasReadme = repos.filter(r => r.description && r.description.trim() !== '');
  const recentlyUpdated = repos.filter(r => {
    const updated = new Date(r.updated_at);
    const daysAgo = (Date.now() - updated.getTime()) / (1000 * 60 * 60 * 24);
    return daysAgo < 30;
  });

  // Advanced metrics
  const avgRepoSize = repos.reduce((sum, repo) => sum + repo.size, 0) / repos.length;
  const popularRepos = repos.filter(r => r.stargazers_count > 5);
  const archivedRepos = repos.filter(r => r.archived);
  const forkRepos = repos.filter(r => r.fork);
  const originalRepos = repos.filter(r => !r.fork);

  // Repository health analysis
  const reposWithIssues = repos.filter(r => r.open_issues_count > 0);
  const reposWithWiki = repos.filter(r => r.has_wiki);
  const reposWithPages = repos.filter(r => r.has_pages);

  // Skill assessment
  const languageStats = {};
  repos.forEach(repo => {
    if (repo.language) {
      languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
    }
  });

  const topLanguages = Object.entries(languageStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  // Activity analysis
  const now = new Date();
  const accountAge = (now - new Date(user.created_at)) / (1000 * 60 * 60 * 24 * 365);
  const reposPerYear = repos.length / Math.max(accountAge, 1);

  // Set metrics
  analysis.metrics = {
    totalRepos: repos.length,
    totalStars,
    totalForks,
    languageCount: languages.size,
    avgRepoSize: Math.round(avgRepoSize),
    popularReposCount: popularRepos.length,
    recentlyUpdatedCount: recentlyUpdated.length,
    accountAge: Math.round(accountAge * 10) / 10,
    reposPerYear: Math.round(reposPerYear * 10) / 10
  };

  // Generate insights
  analysis.insights = {
    topLanguages,
    hasReadmePercentage: Math.round((hasReadme.length / repos.length) * 100),
    recentlyActive: recentlyUpdated.length > 0,
    isCollaborative: forkRepos.length > 0,
    hasArchivedWork: archivedRepos.length > 0
  };

  // Enhanced tips and recommendations
  if (hasReadme.length < repos.length * 0.7) {
    analysis.tips.push('Add descriptions to your repositories for better discoverability.');
    analysis.recommendations.push('Consider adding README files to repositories without descriptions');
  }

  if (languages.size < 3) {
    analysis.tips.push('Try exploring more programming languages to broaden your skills.');
    analysis.recommendations.push('Diversify your tech stack by learning new languages');
  }

  if (recentlyUpdated.length === 0) {
    analysis.tips.push('Update your repositories regularly to keep them active.');
    analysis.recommendations.push('Set aside time weekly to maintain and update projects');
  }

  if (popularRepos.length === 0) {
    analysis.tips.push('Promote your projects to get more stars and feedback!');
    analysis.recommendations.push('Share your projects on social media and developer communities');
  }

  if (reposWithIssues.length === 0 && repos.length > 2) {
    analysis.tips.push('Consider using GitHub Issues for project management and collaboration.');
    analysis.recommendations.push('Enable issues on your repositories to encourage community contribution');
  }

  if (reposWithWiki.length === 0) {
    analysis.tips.push('Documentation is key! Consider adding wikis to your projects.');
    analysis.recommendations.push('Create wikis for complex projects to help others understand your work');
  }

  if (forkRepos.length === 0) {
    analysis.tips.push('Contributing to open source is a great way to grow!');
    analysis.recommendations.push('Start by forking and contributing to existing projects');
  }

  if (accountAge > 1 && reposPerYear < 2) {
    analysis.tips.push('Consider increasing your coding activity to build a stronger portfolio.');
    analysis.recommendations.push('Set coding goals and commit to regular project development');
  }

  if (analysis.tips.length === 0) {
    analysis.tips.push('Excellent! Your GitHub profile shows great activity and diversity.');
  }

  return analysis;
}

export default function GitHubProfileBox() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState(() => localStorage.getItem('github-username') || '')
  const [analysis, setAnalysis] = useState({})
  const [activeTab, setActiveTab] = useState('overview')

  const fetchGitHubStats = async (user) => {
    if (!user) return
    setLoading(true)
    setError(null)
    setAnalysis({})
    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${user}`),
        fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=100`)
      ])
      if (!userResponse.ok) {
        throw new Error('User not found')
      }
      const userData = await userResponse.json()
      const reposData = await reposResponse.json()
      setStats({
        user: userData,
        repos: reposData.slice(0, 10) // show 10 most recent
      })
      setAnalysis(analyzeGitHubData(userData, reposData))
      localStorage.setItem('github-username', user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (username) {
      fetchGitHubStats(username)
    }
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim()) {
      fetchGitHubStats(username.trim())
    }
  }

  const renderMetricCard = (title, value, subtitle, color = 'blue') => (
    <div className={`bg-${color}-500/10 border border-${color}-500/20 rounded-lg p-4 text-center`}>
      <div className={`text-2xl font-bold text-${color}-400`}>{value}</div>
      <div className="text-sm font-medium text-gray-300">{title}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </div>
  )

  const analyzerCard = (
    <div className="widget-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <span className="text-2xl">📊</span>
          <span>Advanced GitHub Analyzer</span>
        </h2>
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      
      {/* Animated Prompt Box */}
      {(!username || username.trim() === '') && !loading && (
        <div className="mb-6 flex justify-center">
          <div
            className="animate-bounce-in-fade bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold flex flex-col items-center gap-2 transition-opacity duration-700"
          >
            <span>
              Enter your <span className="font-bold mx-1">GitHub username</span> to get started!
            </span>
            <svg className="w-6 h-6 mt-2 text-white/80 animate-float" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m0 0l-4-4m4 4l4-4" />
            </svg>
          </div>
        </div>
      )}
      {/* Username Input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="flex-1 px-4 py-2 bg-black text-white border border-gray-900/10 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 text-center">
          <p className="text-red-300">❌ {error}</p>
        </div>
      )}

      {/* Stats & Analysis Display */}
      {stats && analysis.metrics && (
        <div className="space-y-6">
          {/* Profile Overview */}
          <div className="glassmorphic-card p-6 rounded-xl shadow-xl animate-fade-in-up">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={stats.user.avatar_url} 
                alt={stats.user.login}
                className="w-16 h-16 rounded-full border-2 border-primary-500"
              />
              <div>
                <h3 className="text-xl font-bold text-white">{stats.user.name || stats.user.login}</h3>
                <p className="text-gray-400">@{stats.user.login}</p>
                {stats.user.bio && <p className="text-gray-300 text-sm mt-1">{stats.user.bio}</p>}
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-gray-800/50 rounded-lg p-1">
              {['overview', 'metrics', 'insights', 'recommendations'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab 
                      ? 'bg-primary-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {renderMetricCard('Repositories', analysis.metrics.totalRepos, 'Total projects')}
                {renderMetricCard('Stars', analysis.metrics.totalStars, 'Total stars earned')}
                {renderMetricCard('Forks', analysis.metrics.totalForks, 'Total forks')}
                {renderMetricCard('Languages', analysis.metrics.languageCount, 'Technologies used')}
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {renderMetricCard('Account Age', `${analysis.metrics.accountAge}y`, 'Years on GitHub', 'purple')}
                  {renderMetricCard('Repos/Year', analysis.metrics.reposPerYear, 'Average activity', 'green')}
                  {renderMetricCard('Avg Size', `${analysis.metrics.avgRepoSize}KB`, 'Repository size', 'yellow')}
                  {renderMetricCard('Popular', analysis.metrics.popularReposCount, 'Starred repos', 'pink')}
                  {renderMetricCard('Recent', analysis.metrics.recentlyUpdatedCount, 'Updated this month', 'indigo')}
                  {renderMetricCard('Readme %', `${analysis.insights.hasReadmePercentage}%`, 'Documented repos', 'teal')}
                </div>
                
                {/* Top Languages Chart */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3 text-white">Top Languages</h4>
                  <div className="space-y-2">
                    {analysis.insights.topLanguages.map(([lang, count]) => (
                      <div key={lang} className="flex items-center justify-between">
                        <span className="text-gray-300">{lang}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-primary-500 h-2 rounded-full" 
                              style={{ width: `${(count / analysis.metrics.totalRepos) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-400 w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-2">✅ Strengths</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {analysis.insights.recentlyActive && <li>• Actively maintaining projects</li>}
                      {analysis.insights.isCollaborative && <li>• Contributing to open source</li>}
                      {analysis.metrics.languageCount > 2 && <li>• Diverse technology stack</li>}
                      {analysis.metrics.totalStars > 10 && <li>• Projects gaining recognition</li>}
                    </ul>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">🎯 Opportunities</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {analysis.insights.hasReadmePercentage < 70 && <li>• Improve documentation</li>}
                      {analysis.metrics.reposPerYear < 3 && <li>• Increase project frequency</li>}
                      {analysis.metrics.popularReposCount === 0 && <li>• Promote your work</li>}
                      {!analysis.insights.isCollaborative && <li>• Contribute to open source</li>}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'recommendations' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-3">Personalized Recommendations</h4>
                <div className="space-y-3">
                  {analysis.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <span className="text-blue-400 text-lg">💡</span>
                      <span className="text-gray-300 text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recent Repositories */}
          <div className="glassmorphic-card p-6 rounded-xl shadow-xl animate-fade-in-up">
            <h3 className="text-xl font-bold mb-4 text-white">Recent Repositories</h3>
            <div className="space-y-3">
              {stats.repos.map(repo => (
                <div key={repo.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                    <div>
                      <div className="font-medium text-white">{repo.name}</div>
                      <div className="text-sm text-gray-400">{repo.description || 'No description'}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    {repo.language && (
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">{repo.language}</span>
                    )}
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personalized Tips */}
          {analysis.tips.length > 0 && (
            <div className="glassmorphic-card p-6 rounded-xl shadow-xl animate-fade-in-up">
              <h3 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-300">💡 Personalized Tips</h3>
              <ul className="list-disc pl-5 space-y-2">
                {analysis.tips.map((tip, idx) => (
                  <li key={idx} className="text-lg text-gray-800 dark:text-gray-100">{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )

  // Sticky wrapper logic
  if (!username || username.trim() === '') {
    return (
      <div className="sticky top-24 z-30">{analyzerCard}</div>
    )
  }
  return analyzerCard;
}

<style>{`
@keyframes bounceInFade {
  0% { opacity: 0; transform: scale(0.8) translateY(30px); }
  60% { opacity: 1; transform: scale(1.05) translateY(-8px); }
  80% { transform: scale(0.97) translateY(2px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-bounce-in-fade {
  animation: bounceInFade 1s cubic-bezier(.4,0,.2,1);
}
`}</style>