import { useEffect, useState } from 'react';
import { CurrentlyPlaying } from './components/CurrentlyPlaying';
import { Playlist } from './components/Playlist';

// Define types for playlist item
interface PlaylistItem {
  id: number; // Updated to match the API response
  title: string;
  artist: string;
  genre: string; // Updated to match the API response
  duration: string; // Updated to match the API response
  cover: string;
}

// Define types for MusicPlayer state
interface MusicPlayerState {
  playlist: PlaylistItem[];
  currentSong: PlaylistItem | null;
}

function MusicPlayer() {
  const [state, setState] = useState<MusicPlayerState>({
    playlist: [],
    currentSong: null,
  });

  // Fetch playlist data from API
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/playlist')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error:${response.status}`);
        }
        return response.json();
  })
      .then((data: PlaylistItem[]) => {
        setState({
          playlist: data,
          currentSong: data[1] || null, // Set the second song as currently playing
        });
      })
      .catch((error) => console.error('Error fetching playlist:', error));
  }, []);

  const handleSongSelect = (song: PlaylistItem) => {
    setState((prevState) => ({
      ...prevState,
      currentSong: song,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 md:w-1/3">
        <CurrentlyPlaying
          song={state.currentSong}
          playlist={state.playlist} // Pass the playlist here
        />
      </div>
      <div className="flex-1 md:w-2/3">
        <Playlist
          items={state.playlist}
          currentSong={state.currentSong}
          onSongSelect={handleSongSelect}
        />
      </div>
    </div>
  );
}

export default MusicPlayer;