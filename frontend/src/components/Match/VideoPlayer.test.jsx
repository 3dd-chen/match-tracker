import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';

describe('VideoPlayer Component', () => {
    test('renders highlight video for ended match', () => {
        const match = { id: 1 };
        render(<VideoPlayer match={match} isLive={false} isEnded={true} />);
        
        // Video tag role might vary, checking by tag presence usually better or custom role
        // React Testing Library doesn't always have a default role for video, let's use container query if needed or check for source
        const videoElement = document.querySelector('video');
        expect(videoElement).toBeInTheDocument();
        expect(videoElement).toHaveAttribute('autoplay');
        expect(videoElement.querySelector('source')).toHaveAttribute('src', '/videos/valorant/highlight.mp4');
    });

    test('renders live video for live match', () => {
        const match = { id: 2 };
        render(<VideoPlayer match={match} isLive={true} isEnded={false} />);
        
        const videoElement = document.querySelector('video');
        expect(videoElement).toBeInTheDocument();
        expect(videoElement).toHaveAttribute('loop');
        expect(videoElement.querySelector('source')).toHaveAttribute('src', '/videos/valorant/live.mp4');
    });

    test('renders offline image for scheduled match', () => {
        const match = { id: 3 };
        render(<VideoPlayer match={match} isLive={false} isEnded={false} />);
        
        const img = screen.getByAltText('Stream Offline');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/images/valorant/offline.jpg');
    });

    test('sets volume on loaded metadata', () => {
        const match = { id: 1 };
        render(<VideoPlayer match={match} isLive={false} isEnded={true} />);
        
        const videoElement = document.querySelector('video');
        // Simulate loadedmetadata event
        fireEvent.loadedMetadata(videoElement);
        expect(videoElement.volume).toBe(0.5);
    });
});
