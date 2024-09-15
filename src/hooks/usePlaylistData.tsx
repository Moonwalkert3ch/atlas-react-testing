import { useState, useEffect } from 'react';

// Update the Song interface to match the API response
interface Song {
  id: number; // Changed to number to match the API response
  title: string;
  artist: string;
  duration: string; // Updated property to match API response
}

const usePlaylistData = () => {
  const [data, setData] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/playlist'); // Updated URL to match the API endpoint
        const result = await response.json();
        setData(result); // Directly set the result assuming it matches the Song array structure
      } catch (error) {
        console.error('Error fetching playlist data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  return { data, loading };
};

export default usePlaylistData;
