import React from 'react';
import MatchCard from './MatchCard';

const MatchList = ({ matches, title, onMatchClick }) => {
    if (!matches || matches.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed border-cyber-gray rounded-lg">
                <p className="text-gray-500 font-mono">NO DATA FOUND IN SECTOR</p>
            </div>
        );
    }

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-mono font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-cyber-pink"></span>
                {title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((match) => (
                    <MatchCard key={match.id} match={match} onClick={onMatchClick} />
                ))}
            </div>
        </div>
    );
};

export default MatchList;
