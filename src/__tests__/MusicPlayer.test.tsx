import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import MusicPlayer from '../MusicPlayer';

interface PlaylistItem {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

// Mock fetch API
const mockFetch = vi.spyOn(global, 'fetch');

// Mock data for the playlist
const mockPlaylist: PlaylistItem[] = [
  {
    id: 1,
    title: 'Test MoonWalker Music',
    artist: 'Test Artist 1',
    duration: '11:11',
    cover: 'https://example.com/cover1.jpg',
  },
  {
    id: 2,
    title: 'Test Bradford Hour',
    artist: 'Test Artist 2',
    duration: '4:15',
    cover: 'https://example.com/cover2.jpg',
  },
];

// Helper function to create a mock Response object
const createMockResponse = (data: PlaylistItem[] | null, status: number = 200): Response => {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: async () => data,
    headers: new Headers(),
    redirected: false,
    type: 'basic' as ResponseType, // Ensure it's of type ResponseType
    url: '',
    clone: () => createMockResponse(data, status), // Required for Response interface
    body: null,
    bodyUsed: false,
    text: async () => JSON.stringify(data),
    arrayBuffer: async () => new ArrayBuffer(0),
    blob: async () => new Blob(),
    formData: async () => new FormData(),
  } as Response;
};

describe('MusicPlayer Component', () => {
  test('should fetch and display playlist', async () => {
    // Mock successful fetch response
    mockFetch.mockResolvedValueOnce(createMockResponse(mockPlaylist));

    render(<MusicPlayer />);

    // Verify that playlist songs are rendered after fetching
    await waitFor(() => {
      expect(screen.getByText('Test MoonWalker Music')).toBeInTheDocument();
      expect(screen.getByText('Test Bradford Hour')).toBeInTheDocument();
    });
  });

  test('should display the second song as currently playing by default', async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockPlaylist));

    render(<MusicPlayer />);

    // Wait for the playlist to be loaded
    await waitFor(() => {
      expect(screen.getByText('Currently Playing: Test Bradford Hour')).toBeInTheDocument();
    });
  });

  test('should change currently playing song when a new song is selected', async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockPlaylist));

    render(<MusicPlayer />);

    // Wait for the playlist to be loaded
    await waitFor(() => {
      expect(screen.getByText('Test MoonWalker Music')).toBeInTheDocument();
    });

    // Simulate selecting the first song in the playlist
    fireEvent.click(screen.getByText('Test MoonWalker Music'));

    // Verify that the currently playing song is updated
    expect(screen.getByText('Currently Playing: Test MoonWalker Music')).toBeInTheDocument();
  });

  test('should render the full playlist with song titles', async () => {
    mockFetch.mockResolvedValueOnce(createMockResponse(mockPlaylist));

    render(<MusicPlayer />);

    // Check if all songs in the playlist are rendered
    await waitFor(() => {
      expect(screen.getByText('Test MoonWalker Music')).toBeInTheDocument();
      expect(screen.getByText('Test Bradford Hour')).toBeInTheDocument();
    });
  });

  test('should handle fetch error gracefully', async () => {
    // Mock failed fetch response
    mockFetch.mockResolvedValueOnce(createMockResponse([], 500));

    render(<MusicPlayer />);

    // Wait for the error handling to be executed
    await waitFor(() => {
      expect(screen.getByText('Error fetching playlist:')).toBeInTheDocument();
    });
  });
});
