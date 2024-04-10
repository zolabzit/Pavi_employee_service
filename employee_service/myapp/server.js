const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;
const saltRounds = 10; 

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(bodyParser.json());

// Create Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'system',
  database: 'myappdb',
});

// Register route
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  // Insert user into database
  pool.query(
    'INSERT INTO employees (username, password, role) VALUES (?, ?, ?)',
    [username, hashedPassword, role],
    (error, results) => {
      if (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Registration failed' });
      } else {
        res.status(200).json({ success: true, message: 'User registered successfully' });
      }
    }
  );
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Retrieve user from database
  pool.query('SELECT * FROM employees WHERE username = ?', [username], async (error, results) => {
    if (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ success: false, message: 'Login failed. Please try again later.' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        // Compare hashed password
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          // Passwords match, login successful
          res.status(200).json({ success: true, message: 'Login successful', user });
        } else {
          // Passwords don't match
          res.status(401).json({ success: false, message: 'Incorrect username or password' });
        }
      } else {
        // User not found
        res.status(401).json({ success: false, message: 'User not found' });
      }
    }
  });
});
app.post('/api/leave-request', (req, res) => {
  const { employeeId, startDate, endDate, reason } = req.body;

  const insertQuery = `INSERT INTO leave_requests (employee_id, start_date, end_date, reason) VALUES (?, ?, ?, ?)`;

  pool.query(insertQuery, [employeeId, startDate, endDate, reason], (err, result) => {
    if (err) {
      console.error('Error inserting leave request:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('Leave request submitted successfully');
    }
  });
});

app.post('/submit-feedback', (req, res) => {
  const {
    employeeName,
    selfAssessment,
    feedback,
    goals,
    appraisalDetails,
    rating,
  } = req.body;

  const sql = 'INSERT INTO feedback (employeeName, selfAssessment, feedback, goals, appraisalDetails, rating) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [employeeName, selfAssessment, feedback, goals, appraisalDetails, rating];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting into the database:', err.message);
      res.status(500).json({ success: false, error: err.message });
    } else {
      console.log('Form data inserted into the database');
      res.status(200).json({ success: true });
    }
  });
});

// Define route for file uploads

// Route for handling file uploads
app.post('/api/upload', upload.single('document'), (req, res) => {
  // Extract data from request body or headers if needed
  const { employeeId, documentType } = req.body;
  const filePath = req.file.path;

  // Check if the employeeId exists in the employees table
  const employeeQuery = 'SELECT * FROM employees WHERE id = ?';
  pool.query(employeeQuery, [employeeId], (err, result) => {
    if (err) {
      console.error('Error checking employee:', err);
      return res.status(500).json({ message: 'Failed to upload document' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Insert document record into database
    const insertQuery = 'INSERT INTO documents (employee_id, document_type, file_path) VALUES (?, ?, ?)';
    pool.query(insertQuery, [employeeId, documentType, filePath], (err, result) => {
      if (err) {
        console.error('Error inserting document record:', err);
        return res.status(500).json({ message: 'Failed to upload document' });
      }
      console.log('Document record inserted successfully');
      res.status(200).json({ message: 'Document uploaded successfully' });
    });
  });
});
// Route for retrieving document by employee ID and type
app.get('/api/documents/:employeeId/:documentType', (req, res) => {
  const { employeeId, documentType } = req.params;
  
  // Construct the SQL query to retrieve the document
  const selectQuery = `SELECT * FROM documents WHERE employee_id = ? AND document_type = ?`;
  
  // Execute the query with the provided employee ID and document type
  pool.query(selectQuery, [employeeId, documentType], (err, result) => {
    if (err) {
      console.error('Error retrieving document:', err);
      return res.status(500).json({ message: 'Failed to retrieve document' });
    }
    
    // Check if the document exists
    if (result.length === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }
    
    // If the document exists, send it as a response
    const document = result[0];
    res.status(200).json(document);
  });
});
// Endpoint to handle document downloa
// Endpoint to handle document downloads
app.get('/api/download/:employeeId/:documentType', (req, res) => {
  const { employeeId, documentType } = req.params;
  // Construct the file path based on employeeId and documentType
  const filePath = path.join(__dirname, 'uploads', `document-${employeeId}-${documentType}.txt`);
  
  // Send the file as an attachment
  res.download(filePath, (err) => {
    if (err) {
      // Handle any errors that occur during download
      console.error('Error downloading file:', err);
      res.status(500).send('Error downloading file');
    }
  });
});

  // Insert file metadata into the database
  
// Get training programs
app.get('/training-programs', (req, res) => {
  pool.query('SELECT * FROM training_programs', (err, results) => {
    if (err) {
      console.error('Error querying MySQL: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// Get user progress
app.get('/user-progress', (req, res) => {
  pool.query('SELECT * FROM user_progress', (err, results) => {
    if (err) {
      console.error('Error querying MySQL: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// Get suggested courses
app.get('/suggested-courses', (req, res) => {
  pool.query('SELECT * FROM suggested_courses', (err, results) => {
    if (err) {
      console.error('Error querying MySQL: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});
app.get('/payroll', (req, res) => {
  const query = 'SELECT * FROM payroll';
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching payroll data:', err);
      res.status(500).send('Failed to fetch payroll data');
      return;
    }
    res.json(results);
  });
});
app.get('/announcements-and-news', (req, res) => {
  const query = 'SELECT * FROM announcements_and_news';
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching announcements and news data:', err);
      res.status(500).send('Failed to fetch announcements and news data');
      return;
    }
    res.json(results);
  });
});
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// Routes
// Add Employee
app.post('/addEmployee', upload.single('image'), (req, res) => {
  // Extract data from request
  const { username, password, email, contactNumber, address } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  // Insert into database
  const sql = 'INSERT INTO AddEmployee (username, password, email, contactNumber, address, image) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [username, password, email, contactNumber, address, image];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding employee:', err);
      res.status(500).json({ error: 'Error adding employee' });
    } else {
      console.log('Employee added successfully');
      res.status(201).json({ message: 'Employee added successfully', employeeId: result.insertId });
    }
  });
});

// Update Employee
app.put('/employee/:id', upload.single('image'), (req, res) => {
  // Extract data from request
  const employeeId = req.params.id;
  const { contactNumber, address } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  // Update in database
  const sql = 'UPDATE AddEmployee SET contactNumber = ?, address = ?, image = ? WHERE id = ?';
  const values = [contactNumber, address, image, employeeId];

  pool.query(sql, values, (err) => {
    if (err) {
      console.error('Error updating employee:', err);
      res.status(500).json({ error: 'Error updating employee' });
    } else {
      console.log('Employee updated successfully');
      res.status(200).json({ message: 'Employee updated successfully' });
    }
  });
});

app.get('/employees', (req, res) => {
  const sql = 'SELECT * FROM AddEmployee';
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      res.status(500).json({ error: 'Error fetching employees' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Define route for sending messages
app.post('/api/messages', (req, res) => {
  const { text, employeeId } = req.body;

  // Save the message to the database
  pool.query('INSERT INTO messages (text, employee_id) VALUES (?, ?)', [text, employeeId], (error, results) => {
    if (error) {
      console.error('Error saving message to database:', error);
      res.status(500).json({ success: false, message: 'Failed to send message' });
    } else {
      // Return success response
      res.status(200).json({ success: true, message: 'Message sent successfully' });
    }
  });
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
