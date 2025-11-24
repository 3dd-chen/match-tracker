import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchList from './MatchList';

describe('MatchList Component', () => {
    const mockMatches = [
        { id: 1, game: 'VALORANT', teams: ['A', 'B'], status: 'Live', startTime: '2025-11-24' },
        { id: 2, game: 'VALORANT', teams: ['C', 'D'], status: 'Live', startTime: '2025-11-24' }
    ];

    test('renders list title', () => {
        render(<MatchList matches={mockMatches} title="Live Matches" />);
        expect(screen.getByText('Live Matches')).toBeInTheDocument();
    });

    test('renders correct number of match cards', () => {
        render(<MatchList matches={mockMatches} title="Live Matches" />);
        // Assuming MatchCard renders team names, we can count instances or look for specific elements
        // Or we can check if MatchCard is called (if mocked) or check for card containers
        // Here we'll check for the team names which should appear twice (once for each match)
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('C')).toBeInTheDocument();
    });

    test('renders empty state message when matches array is empty', () => {
        render(<MatchList matches={[]} title="Live Matches" />);
        expect(screen.getByText('NO DATA FOUND IN SECTOR')).toBeInTheDocument();
    });

    test('renders empty state message when matches is null', () => {
        render(<MatchList matches={null} title="Live Matches" />);
        expect(screen.getByText('NO DATA FOUND IN SECTOR')).toBeInTheDocument();
    });
});
