import React from 'react';

function AddToPlaylistModal({ song, playlists, onAdd, onClose }) {
  if (!song) return null;
  
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Add to Playlist</h3>
        {Object.keys(playlists).length === 0 ? (
          <p>No playlists yet</p>
        ) : (
          <ul>
            {Object.keys(playlists).map(name => (
              <li 
                key={name} 
                onClick={() => onAdd(name, song)}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AddToPlaylistModal;