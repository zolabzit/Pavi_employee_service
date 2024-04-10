import React, { useState } from 'react';
import axios from 'axios';
import './Document.css'; // Import CSS file for styling

const Document = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('employeeId', employeeId);
      formData.append('documentType', documentType);
      formData.append('document', file);

      await axios.post('http://localhost:3001/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Document uploaded successfully');
    } catch (error) {
      setMessage('Error uploading document: ' + error.message);
    }
  };

  const handleView = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/documents/${employeeId}/${documentType}`);
      if (response.status === 200) {
        const documentInfo = response.data;
        setMessage(`Document found: ${JSON.stringify(documentInfo)}`);
      } else {
        setMessage('Document not found');
      }
    } catch (error) {
      setMessage('Error viewing document: ' + error.message);
    }
  };

  const handleDownload = async () => {
    try {
      window.open(`http://localhost:3001/api/download/${employeeId}/${documentType}`, '_blank');
    } catch (error) {
      setMessage('Error downloading document: ' + error.message);
    }
  };

  return (
    <div className="document-container">
      <h2>Upload Document</h2>
      <label htmlFor="employeeId">Employee ID:</label>
      <input type="text" id="employeeId" placeholder="Enter Employee ID" value={employeeId} onChange={handleEmployeeIdChange} />
      <label htmlFor="documentType">Document Type:</label>
      <input type="text" id="documentType" placeholder="Enter Document Type" value={documentType} onChange={handleDocumentTypeChange} />
      <label htmlFor="file">Choose File:</label>
      <input type="file" id="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleView}>View</button>
      <button onClick={handleDownload}>Download</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Document;
