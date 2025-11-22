import React from 'react';
import { X, Map, Trophy, Monitor, Crosshair } from 'lucide-react';

const MatchDetailsModal = ({ match, onClose }) => {
    if (!match) return null;

    const isLive = match.status.toLowerCase() === 'live';

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
                            <h2 className="text-2xl font-mono font-bold text-white uppercase tracking-wider">
                                {match.teams[0]} <span className="text-cyber-gray mx-2">VS</span> {match.teams[1]}
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-cyber-cyan font-mono">
                                <Trophy size={14} />
                                <span>{match.tournament}</span>
                                <span className="text-gray-500">|</span>
                                <span>{match.stage}</span>
                            </div>
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

                    {/* Stream Embed (Placeholder) */}
                    {match.streamUrl && (
                        <div className="aspect-video bg-black border border-cyber-gray relative group overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <Monitor size={48} className="mx-auto text-cyber-gray mb-4" />
                                    <p className="text-gray-500 font-mono">STREAM FEED ENCRYPTED</p>
                                    <a
                                        href={match.streamUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-4 px-6 py-2 bg-cyber-pink text-white font-bold font-mono hover:bg-red-600 transition-colors clip-path-polygon"
                                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                                    >
                                        OPEN EXTERNAL LINK
                                    </a>
                                </div>
                            </div>
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
                                            <span className="text-cyber-cyan">{map.score[match.teams[0]]}</span>
                                            <span className="mx-2 text-gray-600">:</span>
                                            <span className="text-cyber-pink">{map.score[match.teams[1]]}</span>
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
