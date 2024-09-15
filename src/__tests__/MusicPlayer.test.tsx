import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import MusicPlayer from '../MusicPlayer';

// Test if the MusicPlayer component renders without crashing
test('renders MusicPlayer component without crashing', () => {
    render(<MusicPlayer />);
    expect(screen.getByText(/currently playing/i)).toBeInTheDocument();
    expect(screen.getByText(/playlist/i)).toBeInTheDocument();
});

// Test fetching and displaying playlist data
test('fetches and displays playlist data', async () => {
    render(<MusicPlayer />);

    // Wait for the playlist data to be displayed
    await waitFor(() => {
        expect(screen.getByText('MoonWalker Music')).toBeInTheDocument();
        expect(screen.getByText('The Bradford Hour')).toBeInTheDocument();
    });
});

// Test displaying the currently playing song
test('displays currently playing song', async () => {
    render(<MusicPlayer />);

    // Wait for the currently playing song to be displayed
    await waitFor(() => {
        expect(screen.getByText('MoonWalker Music')).toBeInTheDocument(); // Adjust based on your component’s currently playing song
    });
});

// Test handling song selection
test('handles song selection correctly', async () => {
    render(<MusicPlayer />);

    // Wait for the song list to be available
    await waitFor(() => {
        expect(screen.getByText('The Bradford Hour')).toBeInTheDocument();
    });

    // Simulate clicking a song
    fireEvent.click(screen.getByText('The Bradford Hour'));

    // Verify if the currently playing song is updated correctly
    await waitFor(() => {
        expect(screen.getByText('The Bradford Hour')).toHaveClass('selected'); // Adjust based on your implementation
    });
});
