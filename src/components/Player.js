import React from 'react';

function Player({ song, onClose }) {
  if (!song) return null;
  
  return (
    <div className="player">
      <img src={song.album.cover_medium} alt="album" />
      <div className="info">
        <h2>{song.title}</h2>
        <h3>{song.artist.name}</h3>
        <audio controls autoPlay src={song.preview}>
          Your browser does not support audio
        </audio>
      </div>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
}

export default Player;