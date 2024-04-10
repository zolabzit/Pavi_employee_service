// PayrollList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PayrollList.css'; // Import the CSS file

const PayrollList = () => {
  const [payrollData, setPayrollData] = useState([]);

  useEffect(() => {
    // Fetch payroll data from backend API
    axios.get('http://localhost:3001/payroll')
      .then(response => {
        setPayrollData(response.data);
      })
      .catch(error => {
        console.error('Error fetching payroll data:', error);
      });
  }, []);

  return (
    <div className="payroll-container">
      <h2 className="payroll-heading">Employee Payroll Information</h2>
      <table className="payroll-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.salary}</td>
              <td>{employee.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollList;
