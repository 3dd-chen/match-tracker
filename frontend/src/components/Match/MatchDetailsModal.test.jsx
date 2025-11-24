import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MatchDetailsModal from './MatchDetailsModal';

// Mock VideoPlayer to avoid testing nested component logic
vi.mock('./VideoPlayer', () => ({
    default: () => <div data-testid="video-player">Video Player Mock</div>
}));

describe('MatchDetailsModal Component', () => {
    const mockMatch = {
        id: 1,
        game: 'VALORANT',
        teams: ['Team A', 'Team B'],
        score: { 'Team A': 2, 'Team B': 1 },
        status: 'Ended',
        tournament: 'VCT Masters',
        stage: 'Finals',
        winner: 'Team A',
        mapScores: [
            { map: 'Ascent', score: { 'Team A': 13, 'Team B': 11 } }
        ],
        matchDetails: {
            format: 'BO3',
            mapPool: ['Ascent', 'Bind', 'Haven']
        }
    };

    const mockOnClose = vi.fn();

    test('renders nothing when match is null', () => {
        const { container } = render(<MatchDetailsModal match={null} onClose={mockOnClose} />);
        expect(container).toBeEmptyDOMElement();
    });

    test('renders match details correctly', () => {
        render(<MatchDetailsModal match={mockMatch} onClose={mockOnClose} />);
        
        expect(screen.getAllByText('Team A').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Team B').length).toBeGreaterThan(0);
        expect(screen.getByText('VCT Masters')).toBeInTheDocument();
        expect(screen.getByText('Finals')).toBeInTheDocument();
        expect(screen.getByText('WINNER:')).toBeInTheDocument();
    });

    test('renders map scores', () => {
        render(<MatchDetailsModal match={mockMatch} onClose={mockOnClose} />);
        const ascentElements = screen.getAllByText('Ascent');
        expect(ascentElements.length).toBeGreaterThan(0);
        expect(screen.getByText('13')).toBeInTheDocument();
        expect(screen.getByText('11')).toBeInTheDocument();
    });

    test('renders VideoPlayer component', () => {
        render(<MatchDetailsModal match={mockMatch} onClose={mockOnClose} />);
        expect(screen.getByTestId('video-player')).toBeInTheDocument();
    });

    test('calls onClose when close button is clicked', () => {
        render(<MatchDetailsModal match={mockMatch} onClose={mockOnClose} />);
        // Close button is usually an X icon button
        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('calls onClose when backdrop is clicked', () => {
        const { container } = render(<MatchDetailsModal match={mockMatch} onClose={mockOnClose} />);
        // The backdrop is the first div with absolute inset-0
        // We can find it by class or structure. In this case, it's the first child of the fixed container
        const backdrop = container.firstChild.firstChild;
        fireEvent.click(backdrop);
        expect(mockOnClose).toHaveBeenCalled();
    });
});
