import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const response = await axios.get("/api/scores"); // Replace with your API endpoint
      setScores(response.data);
    };
    fetchScores();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Leaderboard</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index} className="mt-2">
            {score.username}: {score.points}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
