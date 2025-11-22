import React from 'react';
import './Header.css';
import { useTheme } from './ThemeContext';

function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [dateTime, setDateTime] = React.useState(new Date());
  const { isDark, toggleTheme } = useTheme();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const formatDateTime = () => {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    
    const day = days[dateTime.getDay()];
    const date = dateTime.getDate();
    const month = months[dateTime.getMonth()];
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');
    
    return {
      dayMonth: `${day} ${date} ${month}`,
      time: `${hours}:${minutes}:${seconds}`
    };
  };

  const { dayMonth, time } = formatDateTime();

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-top-content">
          <div className="datetime-container">
            <div className="datetime">
              <span className="datetime-label">📅</span>
              <span className="datetime-value">{dayMonth}</span>
            </div>
            <div className="time">
              <span className="time-label">🕐</span>
              <span className="time-value">{time}</span>
            </div>
          </div>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDark ? 'Mode clair' : 'Mode sombre'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      <div className="container">
        <div className="logo">
          <h1>💪 Rahma Service</h1>
        </div>
        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={handleNavClick}>Accueil</a>
          <a href="#about" onClick={handleNavClick}>À Propos</a>
          <a href="#services" onClick={handleNavClick}>Services</a>
          <a href="#pricing" onClick={handleNavClick}>Tarifs</a>
          <a href="#contact" onClick={handleNavClick}>Contact</a>
        </nav>
        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
