import React from 'react';
import { Monitor } from 'lucide-react';

const VideoPlayer = ({ match, isLive, isEnded }) => {
    // Determine media sources based on game (currently hardcoded for Valorant as per existing logic)
    // In a full refactor, these would come from constants/props
    const highlightSrc = "/videos/valorant/highlight.mp4";
    const liveSrc = "/videos/valorant/live.mp4";
    const offlineImgSrc = "/images/valorant/offline.jpg";

    if (isEnded) {
        return (
            <div className="aspect-video bg-black border border-cyber-gray relative overflow-hidden transition-opacity duration-1000">
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
                    <source src={highlightSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }

    return (
        <div className="aspect-video bg-black border border-cyber-gray relative overflow-hidden">
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
                        <source src={liveSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    /* Scheduled - Show Offline Image */
                    <div className="flex items-center justify-center h-full">
                        <img 
                            src={offlineImgSrc} 
                            alt="Stream Offline" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;
