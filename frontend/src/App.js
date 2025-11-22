import React, { useEffect, useState } from 'react';
import MainLayout from './components/Layout/MainLayout';
import MatchList from './components/Match/MatchList';
import MatchDetailsModal from './components/Match/MatchDetailsModal';
import { getMatches } from './services/api';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getMatches();
        setMatches(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to connect to the neural network. Check backend connection.');
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Group matches by status (backend returns: scheduled, live, ended)
  const liveMatches = matches.filter(m => m.status.toLowerCase() === 'live');
  const upcomingMatches = matches.filter(m => m.status.toLowerCase() === 'scheduled');
  const endedMatches = matches.filter(m => m.status.toLowerCase() === 'ended');

  return (
    <MainLayout>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-16 h-16 border-4 border-cyber-pink border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-cyber-cyan font-mono animate-pulse">INITIALIZING DATA STREAM...</div>
        </div>
      ) : error ? (
        <div className="border border-cyber-pink bg-cyber-pink/10 p-6 rounded text-center">
          <h3 className="text-cyber-pink font-bold text-xl mb-2">SYSTEM ERROR</h3>
          <p className="text-gray-300 font-mono">{error}</p>
        </div>
      ) : (
        <>
          {liveMatches.length > 0 && (
            <MatchList
              matches={liveMatches}
              title="LIVE EVENTS"
              onMatchClick={setSelectedMatch}
            />
          )}
          {upcomingMatches.length > 0 && (
            <MatchList
              matches={upcomingMatches}
              title="UPCOMING OPERATIONS"
              onMatchClick={setSelectedMatch}
            />
          )}
          {endedMatches.length > 0 && (
            <MatchList
              matches={endedMatches}
              title="MISSION LOGS"
              onMatchClick={setSelectedMatch}
            />
          )}
        </>
      )}

      {/* Match Details Modal */}
      {selectedMatch && (
        <MatchDetailsModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </MainLayout>
  );
}

export default App;
