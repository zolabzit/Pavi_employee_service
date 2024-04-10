/* HelpAndSupport.jsx */
import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import './HelpAndSupport.css'; // Import the CSS file

function HelpAndSupport() {
  return (
    <div className="help-container">
      <Typography variant="h4" className="help-title" gutterBottom>
        Help & Support
      </Typography>
      <Typography variant="body1" className="help-description" paragraph>
        Welcome to the Help & Support page. Here you can find assistance for any issues you may encounter.
      </Typography>
      <Typography variant="h5" className="faq-title" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <List className="faq-list">
        <ListItem className="faq-list-item">
          <ListItemText primary="How do I reset my password?" />
        </ListItem>
        <ListItem className="faq-list-item">
          <ListItemText primary="Where can I find my account information?" />
        </ListItem>
        <ListItem className="faq-list-item">
          <ListItemText primary="What if I encounter an error while using the website?" />
        </ListItem>
      </List>
      <Typography variant="h5" className="contact-title" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" className="contact-email" paragraph>
        If you need further assistance, please feel free to contact our support team at employeeservice@gmail.com.
      </Typography>
    </div>
  );
}

export default HelpAndSupport;
