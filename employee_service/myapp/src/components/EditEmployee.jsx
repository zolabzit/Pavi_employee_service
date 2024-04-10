import React, { useState } from 'react';
import axios from 'axios';

const EditEmployee = () => {
  const [id, setId] = useState('');
  const [employeeData, setEmployeeData] = useState({
    username: '',
    email: '',
    password: '',
    contactNumber: '',
    address: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'id') {
      setId(value);
    } else {
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: files ? files[0] : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('contactNumber', employeeData.contactNumber);
    formData.append('address', employeeData.address);
    if (employeeData.image) {
      formData.append('image', employeeData.image);
    }

    try {
      const response = await axios.put(`http://localhost:3001/employee/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Employee updated successfully:', response.data);
      // Handle success, e.g., redirect or display a success message
    } catch (error) {
      console.error('Error updating employee:', error);
      // Handle errors, e.g., display an error message to the user
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        {/* Input field for employee ID */}
        <label>
          Employee ID:
          <input
            type="text"
            name="id"
            value={id}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        {/* Render input fields with current employee data */}
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
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
