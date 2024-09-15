import { useState } from 'react';
import { CoverArt } from './CoverArt';
import { SongTitle } from './SongTitle';
import { PlayControls } from './PlayControls';
import { VolumeControl } from './VolumeControls';

interface PlaylistItem {
  id: number;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  cover: string;
}

interface CurrentlyPlayingProps {
  song: PlaylistItem | null; // Allow null if no song is playing
  playlist: PlaylistItem[];
}

export function CurrentlyPlaying({
  song,
  playlist
}: CurrentlyPlayingProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

  if (!song) {
    return <div className="text-center text-gray-500">No song is playing</div>;
  }

  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => Math.min(prevIndex + 1, playlist.length - 1));
  };

  const toggleShuffle = () => {
    setIsShuffle((prevShuffle) => !prevShuffle);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const isFirstSong = currentSongIndex === 0;
  const isLastSong = currentSongIndex === playlist.length - 1;

  return (
    <div className="flex flex-col space-y-6">
      <CoverArt cover={song.cover} />
      <SongTitle title={song.title} artist={song.artist} />
      <PlayControls
        onPrev={handlePrev}
        onNext={handleNext}
        isFirstSong={isFirstSong}
        isLastSong={isLastSong}
        onShuffleToggle={toggleShuffle}
        isShuffle={isShuffle}
        isPlaying={isPlaying}
        onPlayToggle={togglePlay}
      />
      <VolumeControl />
    </div>
  );
}
