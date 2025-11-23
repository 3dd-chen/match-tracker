import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-cyber-black text-white font-sans selection:bg-cyber-pink selection:text-white overflow-x-hidden">
            {/* Background Grid Effect - Neon */}
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    boxShadow: 'inset 0 0 100px rgba(0, 240, 255, 0.2)'
                }}>
            </div>

            {/* Cyberpunk Color Glow Overlay - Intense Neon */}
            <div className="fixed inset-0 z-0 opacity-90 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(176,0,255,0.6),_rgba(5,5,5,0)_60%),_radial-gradient(circle_at_80%_20%,_rgba(0,81,255,0.6),_rgba(5,5,5,0)_50%),_radial-gradient(circle_at_20%_80%,_rgba(255,6,119,0.6),_rgba(5,5,5,0)_50%)]"></div>

            {/* Header */}
            <header className="relative z-10 border-b border-cyber-gray bg-cyber-black/90 backdrop-blur-sm sticky top-0">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-8 bg-cyber-yellow transform -skew-x-12"></div>
                        <h1 className="text-2xl font-mono font-bold tracking-wider text-cyber-cyan uppercase">
                            Match<span className="text-white">Tracker</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-xs font-mono text-cyber-pink animate-pulse">LIVE FEED CONNECTED</div>
                        <div className="w-2 h-2 bg-cyber-pink rounded-full"></div>
                    </div>
                </div>
                {/* Decorative line */}
                <div className="h-0.5 w-full bg-gradient-to-r from-cyber-yellow via-cyber-pink to-cyber-cyan"></div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-4 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-cyber-gray mt-12 py-8 bg-cyber-black">
                <div className="container mx-auto px-4 text-center text-gray-500 text-sm font-mono">
                    <p>SYSTEM STATUS: ONLINE // V.1.0.0</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
