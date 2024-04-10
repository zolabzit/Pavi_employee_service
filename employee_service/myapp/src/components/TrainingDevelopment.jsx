import React from 'react';
import TrainingPrograms from './TrainingPrograms';
import UserProgress from './UserProgress';
import SuggestedCourses from './SuggestedCourses';
import './TrainingDevelopment.css';
function TrainingDevelopment() {
  return (
    <div>
      <h2>Training & Development</h2>
      {/* Render all three components here */}
      <TrainingPrograms />
      <UserProgress />
      <SuggestedCourses />
    </div>
  );
}

export default TrainingDevelopment;
