import React, { useState } from 'react';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import EmployeesList from './EmployeesList';
import './Profile.css';

function Profile() {
  const [currentScreen, setCurrentScreen] = useState(null);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  const handleButtonClick = (screen) => {
    setCurrentScreen(screen);
    if (screen.startsWith('edit')) {
      const id = screen.split('/')[1]; // Extract id from the URL
      setEditEmployeeId(id);
    } else {
      setEditEmployeeId(null); // Clear editEmployeeId if not editing
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <button onClick={() => handleButtonClick('add')}>Add Employee</button>
        <button onClick={() => handleButtonClick('edit/:id')}>Edit Employee</button>
        <button onClick={() => handleButtonClick('Employeeslist')}>Employees List</button>
      </div>
      {currentScreen === 'add' && <AddEmployee />}
      {editEmployeeId && <EditEmployee id={editEmployeeId} />}
      {currentScreen === 'Employeeslist' && <EmployeesList />}
    </div>
  );
}

export default Profile;
