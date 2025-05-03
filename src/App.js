import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Login from './Login';
import Player from './components/Player';
import SongList from './components/SongList';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import PlaylistSection from './components/PlaylistSection';
import AddToPlaylistModal from './components/AddToPlaylistModal';

function App() {
  const { user, logout } = useAuth();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState('eminem');
  const [recentSongs, setRecentSongs] = useState([]);
  const [playlists, setPlaylists] = useState({});
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [currentTab, setCurrentTab] = useState('results');
  const [addToPlaylistSong, setAddToPlaylistSong] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  async function searchSongs(term) {
    try {
      const response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/search?q=${term}`,
        {
          headers: {
            'X-RapidAPI-Key': '3319ab7c91msh6b1b05141c68417p1783ffjsn6acb6efc6170',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
          }
        }
      );
      const data = await response.json();
      setSongs(data.data || []);
    } catch (error) {
      console.error('API error:', error);
    }
  }

  function playSong(song) {
    setCurrentSong(song);
    if (!recentSongs.find(s => s.id === song.id)) {
      setRecentSongs([song, ...recentSongs.slice(0, 9)]);
    }
  }

  function addToPlaylist(playlistName, song) {
    setPlaylists(prev => {
      const updated = { ...prev };
      if (!updated[playlistName]) updated[playlistName] = [];
      if (!updated[playlistName].find(s => s.id === song.id)) {
        updated[playlistName].push(song);
      }
      return updated;
    });
    setAddToPlaylistSong(null);
  }

  function removeSong(playlistName, songId) {
    setPlaylists(prev => {
      const updated = { ...prev };
      updated[playlistName] = updated[playlistName].filter(s => s.id !== songId);
      return updated;
    });
  }

  function createPlaylist() {
    if (newPlaylistName.trim() && !playlists[newPlaylistName]) {
      setPlaylists({ ...playlists, [newPlaylistName]: [] });
      setNewPlaylistName('');
    }
  }

  useEffect(() => {
    if (user) searchSongs(searchTerm);
  }, [user, searchTerm]);

  useEffect(() => {
    // Apply dark mode to body element
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (!user) return <Login />;

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <div className="content-container">
        <Header 
          user={user}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onLogout={logout}
        />

        {currentTab === 'results' && (
          <SearchBar onSearch={(term) => {
            setSearchTerm(term);
            searchSongs(term);
          }} />
        )}

        <div className="tabs">
          <button 
            className={currentTab === 'results' ? 'active' : ''}
            onClick={() => setCurrentTab('results')}
          >
            Results
          </button>
          <button 
            className={currentTab === 'playlists' ? 'active' : ''}
            onClick={() => setCurrentTab('playlists')}
          >
            Playlists
          </button>
          <button 
            className={currentTab === 'recent' ? 'active' : ''}
            onClick={() => setCurrentTab('recent')}
          >
            Recent
          </button>
        </div>

        {currentTab === 'results' && (
          <>
            <h2>Results</h2>
            <SongList 
              songs={songs} 
              onPlay={playSong}
              onAddToPlaylist={setAddToPlaylistSong} 
            />
          </>
        )}

        {currentTab === 'playlists' && (
          <PlaylistSection 
            playlists={playlists}
            newPlaylistName={newPlaylistName}
            setNewPlaylistName={setNewPlaylistName}
            createPlaylist={createPlaylist}
            playSong={playSong}
            removeSong={removeSong}
          />
        )}

        {currentTab === 'recent' && (
          <>
            <h2>Recent Plays</h2>
            <SongList 
              songs={recentSongs} 
              onPlay={playSong}
              onAddToPlaylist={setAddToPlaylistSong} 
            />
          </>
        )}
      </div>
      {currentSong && (
        <Player 
          song={currentSong} 
          onClose={() => setCurrentSong(null)} 
        />
      )}

      {addToPlaylistSong && (
        <AddToPlaylistModal
          song={addToPlaylistSong}
          playlists={playlists}
          onAdd={addToPlaylist}
          onClose={() => setAddToPlaylistSong(null)}
        />
      )}
    </div>
  );
}

export default App;
