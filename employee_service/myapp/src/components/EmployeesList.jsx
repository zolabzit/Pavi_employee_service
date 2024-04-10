import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeesList.css'; 
const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [lastUpdatedEmployee, setLastUpdatedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3001/employees');
      setEmployees(response.data);
      // Assuming the last updated employee is the last one in the array
      setLastUpdatedEmployee(response.data.length > 0 ? response.data[response.data.length - 1] : null);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  return (
    <div className="container">
      <h1>Employees</h1>
      {lastUpdatedEmployee && (
        <div>
          <h2>Last Updated Employee</h2>
          <p>Username: {lastUpdatedEmployee.username}</p>
          <p>Email: {lastUpdatedEmployee.email}</p>
          <p>Contact Number: {lastUpdatedEmployee.contactNumber}</p>
          <p>Address: {lastUpdatedEmployee.address}</p>
        </div>
      )}
      {employees.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td>{employee.username}</td>
                <td>{employee.email}</td>
                <td>{employee.contactNumber}</td>
                <td>{employee.address}</td>
                <td>
                  {/* Add edit link/button with the appropriate route */}
                  <button>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeesList;
