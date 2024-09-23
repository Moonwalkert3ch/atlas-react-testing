import { expect, describe, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { VolumeControl } from "../components/VolumeControls"; 
import { PlayControls } from "../components/PlayControls";
import { CurrentlyPlaying } from "../components/CurrentlyPlaying";
import "@testing-library/jest-dom/vitest";

describe("VolumeControl", () => {
  test("renders volume control slider", () => {
    render(<VolumeControl />);
    
    // Check if the VolumeUpIcon is in the document
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });
});

describe('PlayControls Component', () => {
  // Mock functions for props
  const onPrev = vi.fn();
  const onNext = vi.fn();
  const onShuffleToggle = vi.fn();
  const onPlayToggle = vi.fn();

  test('speed button changes on click', () => {
    render(
      <PlayControls
        onPrev={onPrev}
        onNext={onNext}
        isFirstSong={false}
        isLastSong={false}
        onShuffleToggle={onShuffleToggle}
        isShuffle={false}
        isPlaying={false}
        onPlayToggle={onPlayToggle}
      />
    );

    // Initially speed should be 1x
    expect(screen.getByText('1x')).toBeInTheDocument();

    // Click the speed button
    fireEvent.click(screen.getByText('1x'));

    // Now speed should be 2x
    expect(screen.getByText('2x')).toBeInTheDocument();

    // Click again to change speed to 3x
    fireEvent.click(screen.getByText('2x'));

    // Now speed should be 3x
    expect(screen.getByText('3x')).toBeInTheDocument();

    // Click again to reset speed to 1x
    fireEvent.click(screen.getByText('3x'));

    // Speed should reset to 1x
    expect(screen.getByText('1x')).toBeInTheDocument();
  });

  test('play button is rendered', () => {
    const playButton = screen.queryByRole('button', { name: /play/i });
    expect(playButton).toBeInTheDocument();
});

});

test('renders currently playing song', () => {
  const song = {
    id: 1,
    title: 'Test Song',
    artist: 'Test Artist',
    genre: 'Test Genre',
    duration: '3:45',
    cover: 'test-cover.jpg',
  };

  const playlist = [song];

  render(<CurrentlyPlaying song={song} playlist={playlist} />);

  // Check if cover art is rendered
  const coverArt = screen.getByRole('img'); // Assuming CoverArt component has an img element
  expect(coverArt).toBeInTheDocument();
  expect(coverArt).toHaveAttribute('src', song.cover);

  // Check if song title and artist are rendered
  expect(screen.getByText(song.title)).toBeInTheDocument();
  expect(screen.getByText(song.artist)).toBeInTheDocument();
});

test('renders message when no song is playing', () => {
  render(<CurrentlyPlaying song={null} playlist={[]} />);

  // Check if the no song message is rendered
  expect(screen.getByText('No song is playing')).toBeInTheDocument();
});
