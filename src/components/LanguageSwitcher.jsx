import React from 'react';
import './LanguageSwitcher.css';
import { useLanguage } from '../hooks/useLanguage';

function LanguageSwitcher() {
  const { language, changeLanguage, languages } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [dropdownPos, setDropdownPos] = React.useState({ top: 0, left: 0 });
  const buttonRef = React.useRef(null);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    if (dropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
  }, [dropdownOpen]);

  const languageNames = {
    fr: '🇫🇷 FR',
    en: '🇬🇧 EN',
    de: '🇩🇪 DE',
    ar: '🇸🇦 AR'
  };

  return (
    <div className="language-switcher">
      <button 
        ref={buttonRef}
        className="language-btn"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        title="Sélectionner la langue / Select language"
      >
        🌐 {languageNames[language] || 'FR'}
      </button>
      {dropdownOpen && (
        <div 
          ref={dropdownRef}
          className="language-dropdown"
          style={{
            top: `${dropdownPos.top}px`,
            left: `${dropdownPos.left}px`
          }}
        >
          {languages.map(lang => (
            <button
              key={lang}
              className={`language-option ${language === lang ? 'active' : ''}`}
              onClick={() => {
                changeLanguage(lang);
                setDropdownOpen(false);
              }}
            >
              {languageNames[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
