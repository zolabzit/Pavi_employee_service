import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SuggestedCourses = () => {
  const [suggestedCourses, setSuggestedCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/suggested-courses')
      .then(response => {
        setSuggestedCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching suggested courses:', error);
      });
  }, []);

  return (
    <div>
      <h2>Suggested Courses</h2>
      <ul>
        {suggestedCourses.map(course => (
          <li key={course.id}>{`Course: ${course.name}, Suggested for Program ID: ${course.suggested_for_program_id}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedCourses;
