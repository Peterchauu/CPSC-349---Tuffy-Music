import React from 'react';

function Header({ user, isDarkMode, toggleDarkMode, onLogout }) {
  return (
    <header>
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/11/CSUF_Titans_Logo.svg" alt="CSUF Logo" />
      <h1>Tuffy Music</h1>
      <div className="user-controls">
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Light' : 'Dark'}
        </button>
        <button onClick={onLogout}>Logout</button>
        <span>{user.email}</span>
      </div>
    </header>
  );
}

export default Header;