import React, { useState } from 'react';
import axios from 'axios';
import './LeaveRequestForm.css';
function LeaveRequestForm() {
  const [leaveFormData, setLeaveFormData] = useState({
    employeeId: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleLeaveFormChange = (e) => {
    const { name, value } = e.target;
    setLeaveFormData({ ...leaveFormData, [name]: value });
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/leave-request', leaveFormData);
      alert('Leave request submitted successfully');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Failed to submit leave request');
    }
  };

  return (
    <div>
      <h2>Leave Request Form</h2>
      <form onSubmit={handleLeaveSubmit}>
        <label>
          Employee ID:
          <input
            type="text"
            name="employeeId"
            value={leaveFormData.employeeId}
            onChange={handleLeaveFormChange}
            required
          />
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={leaveFormData.startDate}
            onChange={handleLeaveFormChange}
            required
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={leaveFormData.endDate}
            onChange={handleLeaveFormChange}
            required
          />
        </label>
        <br />
        <label>
          Reason:
          <textarea
            name="reason"
            value={leaveFormData.reason}
            onChange={handleLeaveFormChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Leave Request</button>
      </form>
    </div>
  );
}

export default LeaveRequestForm;
