import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProgress = () => {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/user-progress')
      .then(response => {
        setProgress(response.data);
      })
      .catch(error => {
        console.error('Error fetching user progress:', error);
      });
  }, []);

  return (
    <div>
      <h2>User Progress</h2>
      <ul>
        {progress.map(item => (
          <li key={item.id}>{`Program ID: ${item.program_id}, Progress: ${item.progress}%`}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProgress;
