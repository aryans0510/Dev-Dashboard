export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <label className="ui-switch" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      />
      <span className="slider">
        <span className="circle"></span>
      </span>
    </label>
  )
}