import React, { useState, useEffect } from 'react';

export default function LearningPathTracker() {
  const [learningPath, setLearningPath] = useState(() => {
    const saved = localStorage.getItem('learning-path');
    return saved ? JSON.parse(saved) : getDefaultLearningPath();
  });
  const [selectedPath, setSelectedPath] = useState('frontend');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', difficulty: 'beginner' });

  const paths = {
    frontend: {
      name: 'Frontend Development',
      icon: '🎨',
      color: 'blue'
    },
    backend: {
      name: 'Backend Development', 
      icon: '⚙️',
      color: 'green'
    },
    fullstack: {
      name: 'Full Stack Development',
      icon: '🚀',
      color: 'purple'
    },
    mobile: {
      name: 'Mobile Development',
      icon: '📱',
      color: 'orange'
    }
  };

  function getDefaultLearningPath() {
    return {
      frontend: {
        completed: [],
        inProgress: [],
        tasks: [
          { id: 1, title: 'Learn HTML Basics', description: 'Structure and semantic HTML', difficulty: 'beginner', estimatedHours: 8, completed: false },
          { id: 2, title: 'Master CSS Fundamentals', description: 'Styling, layouts, and responsive design', difficulty: 'beginner', estimatedHours: 12, completed: false },
          { id: 3, title: 'JavaScript Essentials', description: 'Variables, functions, DOM manipulation', difficulty: 'beginner', estimatedHours: 20, completed: false },
          { id: 4, title: 'React Basics', description: 'Components, props, state management', difficulty: 'intermediate', estimatedHours: 25, completed: false },
          { id: 5, title: 'Advanced React', description: 'Hooks, context, performance optimization', difficulty: 'intermediate', estimatedHours: 30, completed: false },
          { id: 6, title: 'Build a Portfolio', description: 'Create a personal portfolio website', difficulty: 'intermediate', estimatedHours: 15, completed: false }
        ]
      },
      backend: {
        completed: [],
        inProgress: [],
        tasks: [
          { id: 1, title: 'Learn Python Basics', description: 'Syntax, data structures, functions', difficulty: 'beginner', estimatedHours: 15, completed: false },
          { id: 2, title: 'Database Fundamentals', description: 'SQL, database design principles', difficulty: 'beginner', estimatedHours: 12, completed: false },
          { id: 3, title: 'API Development', description: 'REST APIs with Flask/FastAPI', difficulty: 'intermediate', estimatedHours: 20, completed: false },
          { id: 4, title: 'Authentication & Security', description: 'JWT, OAuth, security best practices', difficulty: 'intermediate', estimatedHours: 18, completed: false },
          { id: 5, title: 'Deployment & DevOps', description: 'Docker, cloud deployment', difficulty: 'advanced', estimatedHours: 25, completed: false }
        ]
      },
      fullstack: {
        completed: [],
        inProgress: [],
        tasks: [
          { id: 1, title: 'Full Stack Fundamentals', description: 'Client-server architecture', difficulty: 'beginner', estimatedHours: 10, completed: false },
          { id: 2, title: 'MERN Stack', description: 'MongoDB, Express, React, Node.js', difficulty: 'intermediate', estimatedHours: 40, completed: false },
          { id: 3, title: 'Database Integration', description: 'Connect frontend to backend', difficulty: 'intermediate', estimatedHours: 15, completed: false },
          { id: 4, title: 'User Authentication', description: 'Login/signup functionality', difficulty: 'intermediate', estimatedHours: 20, completed: false },
          { id: 5, title: 'Deploy Full App', description: 'Deploy to production', difficulty: 'advanced', estimatedHours: 12, completed: false }
        ]
      },
      mobile: {
        completed: [],
        inProgress: [],
        tasks: [
          { id: 1, title: 'React Native Basics', description: 'Mobile app development fundamentals', difficulty: 'beginner', estimatedHours: 20, completed: false },
          { id: 2, title: 'Navigation & Routing', description: 'App navigation patterns', difficulty: 'intermediate', estimatedHours: 15, completed: false },
          { id: 3, title: 'State Management', description: 'Redux, Context API for mobile', difficulty: 'intermediate', estimatedHours: 18, completed: false },
          { id: 4, title: 'Native Features', description: 'Camera, GPS, notifications', difficulty: 'advanced', estimatedHours: 25, completed: false },
          { id: 5, title: 'App Store Deployment', description: 'Publish to app stores', difficulty: 'advanced', estimatedHours: 10, completed: false }
        ]
      }
    };
  }

  useEffect(() => {
    localStorage.setItem('learning-path', JSON.stringify(learningPath));
  }, [learningPath]);

  const toggleTask = (taskId) => {
    setLearningPath(prev => ({
      ...prev,
      [selectedPath]: {
        ...prev[selectedPath],
        tasks: prev[selectedPath].tasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      }
    }));
  };

  const addCustomTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now(),
      ...newTask,
      estimatedHours: 10,
      completed: false
    };

    setLearningPath(prev => ({
      ...prev,
      [selectedPath]: {
        ...prev[selectedPath],
        tasks: [...prev[selectedPath].tasks, task]
      }
    }));

    setNewTask({ title: '', description: '', difficulty: 'beginner' });
    setShowAddTask(false);
  };

  const getProgress = (path) => {
    const tasks = learningPath[path].tasks;
    const completed = tasks.filter(task => task.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'bg-green-500',
      intermediate: 'bg-yellow-500',
      advanced: 'bg-red-500'
    };
    return colors[difficulty] || 'bg-gray-500';
  };

  const getNextTask = () => {
    const tasks = learningPath[selectedPath].tasks;
    return tasks.find(task => !task.completed);
  };

  const currentPath = learningPath[selectedPath];
  const progress = getProgress(selectedPath);
  const nextTask = getNextTask();

  return (
    <div className="widget-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <span className="text-2xl">📚</span>
          <span>Learning Path Tracker</span>
        </h2>
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className="btn-primary text-sm"
        >
          {showAddTask ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      {/* Path Selection */}
      <div className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(paths).map(([key, path]) => (
            <button
              key={key}
              onClick={() => setSelectedPath(key)}
              className={`p-3 rounded-lg border transition-colors text-left ${
                selectedPath === key
                  ? `bg-${path.color}-600 border-${path.color}-500 text-white`
                  : 'bg-gray-800/30 border-gray-700/50 text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              <div className="text-lg mb-1">{path.icon}</div>
              <div className="text-xs font-medium">{path.name}</div>
              <div className="text-xs opacity-75">{getProgress(key)}% Complete</div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white">
            {paths[selectedPath].icon} {paths[selectedPath].name}
          </h3>
          <span className="text-lg font-bold text-primary-400">{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-3 text-sm text-gray-400">
          {currentPath.tasks.filter(t => t.completed).length} of {currentPath.tasks.length} tasks completed
        </div>
      </div>

      {/* Add Custom Task */}
      {showAddTask && (
        <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <form onSubmit={addCustomTask} className="space-y-4">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              className="w-full px-3 py-2 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
            <textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              className="w-full px-3 py-2 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows="2"
            />
            <select
              value={newTask.difficulty}
              onChange={(e) => setNewTask({...newTask, difficulty: e.target.value})}
              className="px-3 py-2 bg-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <div className="flex space-x-2">
              <button type="submit" className="btn-primary">
                Add Task
              </button>
              <button 
                type="button" 
                onClick={() => setShowAddTask(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Next Task Suggestion */}
      {nextTask && (
        <div className="mb-6 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
          <h4 className="font-semibold text-primary-300 mb-2">🎯 Next Task</h4>
          <div className="text-white font-medium">{nextTask.title}</div>
          <div className="text-sm text-gray-300 mt-1">{nextTask.description}</div>
          <div className="flex items-center space-x-2 mt-2">
            <span className={`px-2 py-1 text-xs rounded-full text-white ${getDifficultyColor(nextTask.difficulty)}`}>
              {nextTask.difficulty}
            </span>
            <span className="text-xs text-gray-400">~{nextTask.estimatedHours}h</span>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-3">
        <h4 className="font-semibold text-white">Learning Tasks</h4>
        {currentPath.tasks.map(task => (
          <div key={task.id} className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mt-1 w-4 h-4 text-primary-600 bg-gray-700 border-gray-600 rounded focus:ring-primary-500"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                  {task.title}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full text-white ${getDifficultyColor(task.difficulty)}`}>
                  {task.difficulty}
                </span>
                <span className="text-xs text-gray-400">~{task.estimatedHours}h</span>
              </div>
              <div className={`text-sm ${task.completed ? 'text-gray-500' : 'text-gray-300'}`}>
                {task.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Tips */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <h4 className="font-semibold text-blue-300 mb-2">💡 Learning Tips</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Practice coding daily, even if just for 30 minutes</li>
          <li>• Build projects to apply what you learn</li>
          <li>• Join coding communities and forums</li>
          <li>• Don't rush - focus on understanding fundamentals</li>
        </ul>
      </div>
    </div>
  );
} 