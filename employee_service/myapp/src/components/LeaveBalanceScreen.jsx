import React from 'react';

function LeaveBalanceScreen() {
  // Placeholder data (replace with actual data fetched from API)
  const leaveBalance = {
    vacation: 7,
    sickLeave: 5,
    personalLeave: 2,
    // Add more leave types as needed
  };

  return (
    <div>
      <h2>Leave Balance</h2>
      <p>Vacation: {leaveBalance.vacation} days</p>
      <p>Sick Leave: {leaveBalance.sickLeave} days</p>
      <p>Personal Leave: {leaveBalance.personalLeave} days</p>
      {/* Add more leave types as needed */}
    </div>
  );
}

export default LeaveBalanceScreen;