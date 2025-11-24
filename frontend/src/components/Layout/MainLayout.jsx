import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-cyber-black text-white font-sans selection:bg-cyber-pink selection:text-white overflow-x-hidden flex flex-col relative">
            {/* Cyberpunk City Background Layers */}
            
            {/* Deep space/sky gradient */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#0a0118] via-[#1a0a2e] to-[#16213e]"></div>
            
            {/* City silhouette effect with layered gradients */}
            <div className="fixed inset-0 z-0 opacity-40" 
                style={{
                    background: `
                        radial-gradient(ellipse at 20% 100%, rgba(138, 43, 226, 0.3) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 100%, rgba(0, 240, 255, 0.3) 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 100%, rgba(255, 0, 100, 0.2) 0%, transparent 60%)
                    `
                }}>
            </div>

            {/* Neon glow overlay */}
            <div className="fixed inset-0 z-0 opacity-60 pointer-events-none mix-blend-screen"
                style={{
                    background: `
                        radial-gradient(circle at 30% 20%, rgba(138, 43, 226, 0.3), transparent 40%),
                        radial-gradient(circle at 70% 60%, rgba(0, 240, 255, 0.2), transparent 40%),
                        radial-gradient(circle at 50% 80%, rgba(255, 0, 100, 0.25), transparent 50%)
                    `
                }}>
            </div>

            {/* Header */}
            <header className="relative z-10 border-b border-cyber-pink/30 bg-cyber-black/70 backdrop-blur-md sticky top-0 shadow-[0_4px_20px_rgba(255,0,100,0.3)]">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-8 bg-cyber-yellow transform -skew-x-12 shadow-[0_0_10px_rgba(252,238,10,0.8)]"></div>
                        <h1 className="text-2xl font-mono font-bold tracking-wider text-cyber-cyan uppercase drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
                            Match<span className="text-white">Tracker</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-xs font-mono text-cyber-pink animate-pulse drop-shadow-[0_0_8px_rgba(255,0,60,0.8)]">LIVE FEED CONNECTED</div>
                        <div className="w-2 h-2 bg-cyber-pink rounded-full shadow-[0_0_8px_rgba(255,0,60,0.8)] animate-pulse"></div>
                    </div>
                </div>
                {/* Decorative line with glow */}
                <div className="h-0.5 w-full bg-gradient-to-r from-cyber-yellow via-cyber-pink to-cyber-cyan shadow-[0_0_10px_rgba(255,0,100,0.5)]"></div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-4 py-8 flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-cyber-pink/30 mt-auto py-8 bg-cyber-black/70 backdrop-blur-md shadow-[0_-4px_20px_rgba(255,0,100,0.2)]">
                <div className="container mx-auto px-4 text-center text-gray-500 text-sm font-mono">
                    <p>SYSTEM STATUS: ONLINE // V.1.0.0</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
