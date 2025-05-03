import React from 'react';

function PlaylistSection({ playlists, newPlaylistName, setNewPlaylistName, createPlaylist, playSong, removeSong }) {
  return (
    <>
      <h2>Your Playlists</h2>
      <div className="create-playlist">
        <input
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="New Playlist Name"
        />
        <button onClick={createPlaylist}>Create</button>
      </div>
      <div className="playlists">
        {Object.keys(playlists).map(name => (
          <div key={name} className="playlist-card">
            <h3>{name}</h3>
            {playlists[name].length === 0 ? (
              <p>No songs yet</p>
            ) : (
              playlists[name].map(song => (
                <div key={song.id} className="playlist-song">
                  <img 
                    src={song.album.cover_small} 
                    alt={song.title}
                    onClick={() => playSong(song)}
                  />
                  <div>
                    <p>{song.title}</p>
                    <p className="small">{song.artist.name}</p>
                  </div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeSong(name, song.id)}
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default PlaylistSection;