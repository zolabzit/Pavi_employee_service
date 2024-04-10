import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainingPrograms = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/training-programs')
      .then(response => {
        setPrograms(response.data);
      })
      .catch(error => {
        console.error('Error fetching training programs:', error);
      });
  }, []);

  return (
    <div>
      <h2>Training Programs</h2>
      <ul>
        {programs.map(program => (
          <li key={program.id}>{program.name} - Duration: {program.duration} hours</li>
        ))}
      </ul>
    </div>
  );
};

export default TrainingPrograms;
