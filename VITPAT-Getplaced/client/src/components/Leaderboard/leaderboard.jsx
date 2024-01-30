import React from 'react';
import './leaderboard.css'; // Import your CSS file for styling

const Leaderboard = () => {
  // Function to generate a random name
  const generateRandomName = () => {
    const names = ['XYZ', 'ABC', 'Suman', 'Sita', 'Gita', 'Soni', 'Riya', 'Rohit', 'Mohit', 'Jack'];
    return names[Math.floor(Math.random() * names.length)];
  };

  // Dummy data for the leaderboard
  const leaderboardData = Array.from({ length: 20 }, (_, index) => ({
    rank: index + 1,
    name: generateRandomName(),
    score: Math.floor(Math.random() * 1000) + 500,
  }));

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry) => (
            <tr key={entry.rank}>
              <td>{entry.rank}</td>
              <td>{entry.name}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
