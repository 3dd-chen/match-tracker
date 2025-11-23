import React from 'react';
import { X, Map, Trophy, Monitor, Crosshair } from 'lucide-react';

const MatchDetailsModal = ({ match, onClose }) => {
    if (!match) return null;

    const isLive = match.status.toLowerCase() === 'live';
    const isEnded = match.status.toLowerCase() === 'ended';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-cyber-black border border-cyber-cyan shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col max-h-[90vh] overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-cyber-gray bg-cyber-gray/20">
                    <div className="flex items-center gap-4">
                        <div className={`w-2 h-8 ${isLive ? 'bg-cyber-pink animate-pulse' : 'bg-cyber-cyan'}`}></div>
                        <div>
                            <h2 className="text-2xl font-mono font-bold uppercase tracking-wider">
                                <span className="text-blue-400">{match.teams[0]}</span> <span className="text-cyber-gray mx-2">VS</span> <span className="text-red-400">{match.teams[1]}</span>
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-white font-mono">
                                <Trophy size={14} className="text-cyber-cyan" />
                                <span className="font-bold">{match.game}</span>
                                <span className="text-gray-500">|</span>
                                <span>{match.tournament}</span>
                                <span className="text-gray-500">|</span>
                                <span>{match.stage}</span>
                            </div>

                            {/* Live: Current Map */}
                            {isLive && match.currentMap && (
                                <div className="mt-2 font-mono text-cyber-neon-green text-sm">
                                    PLAYING ON: <span className="font-bold text-white">{match.currentMap}</span>
                                </div>
                            )}

                            {/* Ended: Winner */}
                            {isEnded && match.winner && (
                                <div className="mt-2 font-mono text-cyber-cyan text-sm">
                                    WINNER: <span className="font-bold text-white">{match.winner}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-cyber-pink hover:bg-white/5 transition-colors rounded-full"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Highlight Video for Ended Matches / Stream Placeholder for Live */}
                    {(isEnded || match.streamUrl) && (
                        <div className="space-y-4">
                            <div className="aspect-video bg-black border border-cyber-gray relative overflow-hidden transition-opacity duration-1000">
                                {isEnded ? (
                                    /* Highlight Video Player */
                                    <video 
                                        className="w-full h-full object-cover"
                                        controls
                                        autoPlay
                                        onLoadedMetadata={(e) => {
                                            e.target.volume = 0.5;
                                        }}
                                        onPlay={(e) => {
                                            e.target.parentElement.classList.remove('opacity-30');
                                        }}
                                        onEnded={(e) => {
                                            e.target.parentElement.classList.add('opacity-30');
                                        }}
                                    >
                                        <source src="/videos/valorant/highlight.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    /* Stream Placeholder for Live/Scheduled */
                                    <div className="absolute inset-0">
                                        {isLive ? (
                                            /* Live - Show Live Video */
                                            <video 
                                                className="w-full h-full object-cover"
                                                controls
                                                autoPlay
                                                loop
                                                onLoadedMetadata={(e) => {
                                                    e.target.volume = 0.5;
                                                }}
                                            >
                                                <source src="/videos/valorant/live.mp4" type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            /* Scheduled - Show Offline Image */
                                            <div className="flex items-center justify-center h-full">
                                                <img 
                                                    src="/images/valorant/offline.jpg" 
                                                    alt="Stream Offline" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            {/* Stream Link Below Video */}
                            {match.streamUrl && (
                                <div className="flex justify-center">
                                    <a
                                        href={match.streamUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-2 bg-cyber-pink text-white font-bold font-mono hover:bg-red-600 transition-colors"
                                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                                    >
                                        <Monitor size={16} />
                                        OPEN EXTERNAL STREAM
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Scoreboard */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Map Scores */}
                        <div>
                            <h3 className="text-lg font-mono font-bold text-cyber-yellow mb-4 flex items-center gap-2">
                                <Crosshair size={18} />
                                MISSION STATUS
                            </h3>
                            <div className="space-y-3">
                                {match.mapScores?.map((map, index) => (
                                    <div key={index} className="bg-cyber-gray/30 p-3 border-l-2 border-cyber-cyan flex justify-between items-center">
                                        <span className="font-mono text-white">{map.map}</span>
                                        <div className="font-mono font-bold">
                                            <span className="text-blue-400">{map.score[match.teams[0]]}</span>
                                            <span className="mx-2 text-gray-600">:</span>
                                            <span className="text-red-400">{map.score[match.teams[1]]}</span>
                                        </div>
                                    </div>
                                ))}
                                {(!match.mapScores || match.mapScores.length === 0) && (
                                    <p className="text-gray-500 font-mono text-sm italic">Awaiting mission data...</p>
                                )}
                            </div>
                        </div>

                        {/* Map Pool */}
                        <div>
                            <h3 className="text-lg font-mono font-bold text-cyber-yellow mb-4 flex items-center gap-2">
                                <Map size={18} />
                                MAP POOL
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {match.matchDetails?.mapPool?.map((map, index) => (
                                    <span key={index} className="px-3 py-1 bg-cyber-gray/50 border border-cyber-gray text-gray-300 text-sm font-mono">
                                        {map}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-6">
                                <h4 className="text-sm font-mono text-gray-400 mb-2">FORMAT</h4>
                                <div className="text-white font-mono text-xl font-bold">{match.matchDetails?.format}</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-4 border-t border-cyber-gray bg-cyber-black flex justify-end">
                    <div className="text-xs font-mono text-gray-600">
                        ID: {match.id} // SYNCED
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchDetailsModal;
