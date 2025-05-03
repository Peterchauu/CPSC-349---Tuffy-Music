import React from 'react';

function SongList({ songs, onPlay, onAddToPlaylist }) {
  if (!songs || songs.length === 0) {
    return <p>No songs found</p>;
  }
  
  return (
    <div className="playlist">
      {songs.map(song => (
        <div key={song.id} className="song">
          <img 
            src={song.album.cover_medium} 
            alt={song.title} 
            onClick={() => onPlay(song)} 
          />
          <div className="song-info">
            <p className="title">{song.title}</p>
            <p className="artist">{song.artist.name}</p>
            <button onClick={() => onAddToPlaylist(song)}>
              Add to Playlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SongList;