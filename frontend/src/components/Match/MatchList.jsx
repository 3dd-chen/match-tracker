import React, { useState } from 'react';
import MatchCard from './MatchCard';
import { Activity, Calendar, Archive, ChevronDown } from 'lucide-react';

const MatchList = ({ matches, title, onMatchClick, glitch = false, type = 'default', initialCollapsed = false }) => {
    const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

    if (!matches || matches.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed border-cyber-gray rounded-lg">
                <p className="text-gray-500 font-mono">NO DATA FOUND IN SECTOR</p>
            </div>
        );
    }

    // Category-specific styling configuration
    const categoryStyles = {
        live: {
            borderColor: 'border-cyber-pink',
            bgGradient: 'bg-gradient-to-r from-cyber-pink/10 via-red-500/5 to-transparent',
            accentColor: 'text-cyber-pink',
            badgeBg: 'bg-cyber-pink/30',
            shadowColor: 'shadow-[0_0_30px_rgba(255,0,60,0.5)]',
            Icon: Activity,
            glowClass: 'drop-shadow-[0_0_15px_rgba(255,0,60,1)]',
            cornerAccent: 'bg-cyber-pink',
            scanlineColor: 'rgba(255, 0, 60, 0.1)'
        },
        upcoming: {
            borderColor: 'border-cyber-cyan',
            bgGradient: 'bg-gradient-to-r from-cyber-cyan/10 via-blue-500/5 to-transparent',
            accentColor: 'text-cyber-cyan',
            badgeBg: 'bg-cyber-cyan/30',
            shadowColor: 'shadow-[0_0_30px_rgba(0,240,255,0.5)]',
            Icon: Calendar,
            glowClass: 'drop-shadow-[0_0_15px_rgba(0,240,255,1)]',
            cornerAccent: 'bg-cyber-cyan',
            scanlineColor: 'rgba(0, 240, 255, 0.1)'
        },
        ended: {
            borderColor: 'border-purple-500',
            bgGradient: 'bg-gradient-to-r from-purple-500/10 via-violet-500/5 to-transparent',
            accentColor: 'text-purple-400',
            badgeBg: 'bg-purple-500/30',
            shadowColor: 'shadow-[0_0_30px_rgba(138,43,226,0.5)]',
            Icon: Archive,
            glowClass: 'drop-shadow-[0_0_15px_rgba(138,43,226,1)]',
            cornerAccent: 'bg-purple-500',
            scanlineColor: 'rgba(138, 43, 226, 0.1)'
        },
        default: {
            borderColor: 'border-cyber-gray',
            bgGradient: 'bg-gradient-to-r from-cyber-gray/10 via-gray-500/5 to-transparent',
            accentColor: 'text-white',
            badgeBg: 'bg-cyber-gray/30',
            shadowColor: '',
            Icon: Activity,
            glowClass: '',
            cornerAccent: 'bg-cyber-gray',
            scanlineColor: 'rgba(255, 255, 255, 0.05)'
        }
    };

    const style = categoryStyles[type] || categoryStyles.default;
    const Icon = style.Icon;
    const count = matches.length;

    return (
        <div className={`relative transition-all duration-500 ${isCollapsed ? 'mb-6' : 'mb-20'}`}>
            {/* Category Header Container with Cyberpunk Effects */}
            <div className="relative group">
                {/* Holographic top border */}
                <div className={`absolute -top-1 left-0 right-0 h-px ${style.bgGradient} opacity-50`}></div>
                
                {/* Corner accent decorations */}
                <div className={`absolute -top-1 -left-1 w-3 h-3 ${style.cornerAccent} opacity-70`}></div>
                <div className={`absolute -top-1 left-12 w-8 h-px ${style.cornerAccent} opacity-70`}></div>
                
                {/* Main header box */}
                <div className={`
                    relative overflow-hidden
                    border-l-4 ${style.borderColor} 
                    ${style.bgGradient} 
                    ${style.shadowColor}
                    backdrop-blur-sm
                    transform transition-all duration-300
                    hover:translate-x-1
                    clip-path-slant
                    cursor-pointer
                `}
                onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {/* Scanline overlay */}
                    <div 
                        className="absolute inset-0 pointer-events-none opacity-30"
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                                0deg,
                                transparent,
                                transparent 2px,
                                ${style.scanlineColor} 2px,
                                ${style.scanlineColor} 4px
                            )`
                        }}
                    ></div>

                    {/* Animated glitch overlay */}
                    {glitch && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-glitch-slide pointer-events-none"></div>
                    )}

                    {/* Content */}
                    <div className="relative p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                {/* Title with glitch effect */}
                                <div className="relative">
                                    <h2 className={`
                                        text-3xl font-mono font-black text-white tracking-wider
                                        ${glitch ? 'animate-glitch' : ''}
                                        relative z-10
                                        transform -skew-x-6 group-hover:skew-x-0 transition-transform
                                    `}>
                                        {title}
                                    </h2>
                                    {/* Title shadow */}
                                    <div className={`absolute inset-0 ${style.accentColor} blur-sm opacity-30 -z-10 transform -skew-x-6 group-hover:skew-x-0 transition-transform`}>
                                        {title}
                                    </div>
                                </div>
                                
                                {/* Count Badge with border */}
                                <div className={`
                                    relative px-4 py-2 
                                    ${style.badgeBg} ${style.accentColor} 
                                    font-mono font-black text-sm
                                    border ${style.borderColor}
                                    ${style.shadowColor}
                                    transform -skew-x-12
                                    group-hover:skew-x-0 transition-transform
                                `}>
                                    <span className="block transform skew-x-12 group-hover:skew-x-0">
                                        [{count}] {count === 1 ? 'MATCH' : 'MATCHES'}
                                    </span>
                                </div>
                            </div>

                            {/* Collapse Toggle Icon */}
                            <div className={`${style.accentColor} transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
                                <ChevronDown size={28} strokeWidth={2.5} />
                            </div>
                        </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className={`h-px w-full ${style.bgGradient} opacity-50`}></div>
                </div>

                {/* Bottom right corner decoration */}
                <div className={`absolute -bottom-1 right-0 w-12 h-px ${style.cornerAccent} opacity-70`}></div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${style.cornerAccent} opacity-70`}></div>
            </div>
            
            {/* Cards Grid with collapse animation */}
            <div className={`
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
                overflow-hidden
                transition-all duration-500 ease-in-out
                ${isCollapsed 
                    ? 'max-h-0 opacity-0 mt-0' 
                    : 'max-h-[10000px] opacity-100 mt-10'
                }
            `}>
                {matches.map((match) => (
                    <MatchCard key={match.id} match={match} onClick={onMatchClick} />
                ))}
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes glitch-slide {
                    0%, 100% { transform: translateX(-100%); }
                    50% { transform: translateX(100%); }
                }
                
                .animate-glitch-slide {
                    animation: glitch-slide 3s ease-in-out infinite;
                }

                .animate-pulse-slow {
                    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                .clip-path-slant {
                    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
                }
            `}</style>
        </div>
    );
};

export default MatchList;
