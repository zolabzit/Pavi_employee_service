// src/components/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';


const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    username: '',
    password: '',
    email: '',
    contactNumber: '',
    address: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', employeeData.username);
    formData.append('password', employeeData.password);
    formData.append('email', employeeData.email);
    formData.append('contactNumber', employeeData.contactNumber);
    formData.append('address', employeeData.address);
    if (employeeData.image) {
      formData.append('image', employeeData.image);
    }

    try {
      const response = await axios.post('http://localhost:3001/addEmployee', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Employee added successfully:', response.data);
      // Handle success, e.g., clear form or redirect
    } catch (error) {
      console.error('Error adding employee:', error);
      // Handle errors, e.g., display error message to the user
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={employeeData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={employeeData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Contact Number:
          <input
            type="text"
            name="contactNumber"
            value={employeeData.contactNumber}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <textarea
            name="address"
            value={employeeData.address}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Image:
          <input type="file" name="image" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
