import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MatchCard from './MatchCard';

describe('MatchCard Component', () => {
    const mockMatch = {
        id: 1,
        game: 'VALORANT',
        teams: ['Team A', 'Team B'],
        score: { 'Team A': 2, 'Team B': 1 },
        status: 'Live',
        tournament: 'VCT Masters',
        stage: 'Group Stage',
        startTime: '2025-11-24T10:00:00Z',
        currentMap: 'Ascent',
        streamUrl: 'https://twitch.tv/example'
    };

    const mockOnClick = vi.fn();

    test('renders match details correctly', () => {
        render(<MatchCard match={mockMatch} onClick={mockOnClick} />);
        
        expect(screen.getByText('Team A')).toBeInTheDocument();
        expect(screen.getByText('Team B')).toBeInTheDocument();
        expect(screen.getByText('VCT Masters')).toBeInTheDocument();
        expect(screen.getByText('Group Stage')).toBeInTheDocument();
        expect(screen.getByText('VALORANT')).toBeInTheDocument();
    });

    test('renders Valorant logo when game is Valorant', () => {
        render(<MatchCard match={mockMatch} onClick={mockOnClick} />);
        const logo = screen.getByAltText('VALORANT');
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute('src', '/images/valorant/logo.png');
    });

    test('calls onClick when clicked', () => {
        render(<MatchCard match={mockMatch} onClick={mockOnClick} />);
        fireEvent.click(screen.getByText('Team A').closest('div').parentElement.parentElement.parentElement);
        expect(mockOnClick).toHaveBeenCalledWith(mockMatch);
    });

    test('applies live styles when status is Live', () => {
        render(<MatchCard match={mockMatch} onClick={mockOnClick} />);
        const statusBadge = screen.getByText('Live');
        expect(statusBadge).toHaveClass('text-cyber-pink');
    });

    test('renders stream link when streamUrl is present', () => {
        render(<MatchCard match={mockMatch} onClick={mockOnClick} />);
        expect(screen.getByText('Watch Stream')).toBeInTheDocument();
    });
});
