// src/components/Playlist.tsx

import { PlayListItem } from './PlayListItem';
import usePlaylistData from '../hooks/usePlaylistData';

interface PlaylistItem {
  id: number;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  cover: string;
}

interface PlaylistProps {
  items: PlaylistItem[]; // Add this line to match the actual usage
  currentSong: PlaylistItem | null;
  onSongSelect: (song: PlaylistItem) => void;
}

export function Playlist({ items, currentSong, onSongSelect }: PlaylistProps) {
  const { loading } = usePlaylistData();

  if (loading) {
    return <div>Loading playlist...</div>;
  }

  return (
    <div className="flex w-1/2 flex-col md:flex-row bg-light-red border-t p-6 sm:w-full md:border-l md:border-t-0">
      <h2 className="mb-4 text-lg font-semibold text-black">Playlist</h2>
      <div className="flex flex-col pr-4">
        {items.map((item) => (
          <PlayListItem
            key={item.id}
            title={item.title}
            artist={item.artist}
            duration={item.duration}
            className={currentSong?.id === item.id ? 'bg-gray-200' : ''}
            onClick={() => onSongSelect(item)}
          />
        ))}
      </div>
    </div>
  );
}
