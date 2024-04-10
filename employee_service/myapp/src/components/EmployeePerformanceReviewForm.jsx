// src/components/EmployeePerformanceReviewForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Snackbar, Rating } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import './EmployeePerformanceReviewForm.css'; // Import the CSS file

const EmployeePerformanceReviewForm = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [selfAssessment, setSelfAssessment] = useState('');
  const [feedback, setFeedback] = useState('');
  const [goals, setGoals] = useState('');
  const [appraisalDetails, setAppraisalDetails] = useState('');
  const [rating, setRating] = useState(0); // Initialize rating state
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeName,
          selfAssessment,
          feedback,
          goals,
          appraisalDetails,
          rating,
        }),
      });

      if (response.ok) {
        // Submission was successful
        console.log('Form submitted successfully!');
        setSubmitSuccess(true);
      } else {
        // Handle error
        console.error('Error submitting form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form data:', error.message);
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
  };

  return (
    <div className="performance-form-container">
      <Typography variant="h5" className="form-title">
        Employee Performance Review and Feedback
      </Typography>
      <form onSubmit={handleSubmit} className="form">
        <TextField
          label="Employee Name"
          variant="outlined"
          fullWidth
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          required
        />
        <TextField
          label="Self-Assessment"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={selfAssessment}
          onChange={(e) => setSelfAssessment(e.target.value)}
          required
        />
        <TextField
          label="Feedback"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <TextField
          label="Goals for Next Period"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          required
        />
        <TextField
          label="Appraisal Details"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={appraisalDetails}
          onChange={(e) => setAppraisalDetails(e.target.value)}
          required
        />
        <Box mt={2}>
          <Typography variant="subtitle1">Rating:</Typography>
          <Rating
            name="employee-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
        </Box>
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit Performance Review and Feedback
          </Button>
        </Box>
      </form>
      <Snackbar
        open={submitSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          Performance review and feedback submitted successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default EmployeePerformanceReviewForm;
