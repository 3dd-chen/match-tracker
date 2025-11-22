import React from 'react';
import { Calendar, Clock, Trophy, Monitor } from 'lucide-react';
import { format } from 'date-fns';

const MatchCard = ({ match, onClick }) => {
    const isLive = match.status.toLowerCase() === 'live';
    const isEnded = match.status.toLowerCase() === 'ended';

    let statusColor = 'text-gray-400';
    let borderColor = 'border-cyber-gray';
    let glowClass = '';

    if (isLive) {
        statusColor = 'text-cyber-pink';
        borderColor = 'border-cyber-pink';
        glowClass = 'shadow-[0_0_25px_rgba(255,0,60,0.6)] animate-pulse-neon';
    } else if (!isEnded) {
        statusColor = 'text-cyber-yellow';
        borderColor = 'border-cyber-yellow';
    }

    return (
        <div
            onClick={() => onClick(match)}
            className={`relative bg-cyber-gray border ${borderColor} ${glowClass} p-0 overflow-hidden group transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] cursor-pointer`}
        >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-white z-10"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-white z-10"></div>

            {/* Status Badge */}
            <div className="absolute top-0 right-0 bg-black/50 backdrop-blur px-3 py-1 border-b border-l border-cyber-gray z-10">
                <span className={`font-mono text-xs font-bold uppercase ${statusColor} flex items-center gap-2`}>
                    {isLive && <span className="w-3 h-3 bg-cyber-pink rounded-full animate-pulse shadow-[0_0_8px_rgba(255,0,60,0.8)]"></span>}
                    {match.status}
                </span>
            </div>

            <div className="p-6">
                {/* Tournament Info */}
                <div className="flex items-center gap-2 mb-4 text-gray-400 text-xs font-mono uppercase tracking-wider">
                    <Trophy size={14} className="text-cyber-cyan" />
                    <span>{match.tournament}</span>
                    <span className="text-cyber-gray">|</span>
                    <span>{match.stage}</span>
                </div>

                {/* Teams */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex-1 text-left">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyber-cyan transition-colors">{match.teams[0]}</h3>
                        {match.score && <div className="text-2xl font-mono font-bold text-cyber-yellow mt-1">{match.score[match.teams[0]]}</div>}
                    </div>

                    <div className="px-4 text-gray-500 font-mono text-sm">VS</div>

                    <div className="flex-1 text-right">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyber-pink transition-colors">{match.teams[1]}</h3>
                        {match.score && <div className="text-2xl font-mono font-bold text-cyber-yellow mt-1">{match.score[match.teams[1]]}</div>}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>{format(new Date(match.startTime), 'MMM dd')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            <span>{format(new Date(match.startTime), 'HH:mm')}</span>
                        </div>
                    </div>

                    {match.streamUrl && (
                        <a
                            href={match.streamUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyber-cyan hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Monitor size={14} />
                            Watch Stream
                        </a>
                    )}
                </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 to-cyber-pink/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        </div>
    );
};

export default MatchCard;
