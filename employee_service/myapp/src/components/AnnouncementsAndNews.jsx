// AnnouncementsAndNews.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AnnouncementsAndNews.css';
const AnnouncementsAndNews = () => {
  const [announcementsAndNews, setAnnouncementsAndNews] = useState([]);

  useEffect(() => {
    // Fetch announcements and news data from backend API
    axios.get('http://localhost:3001/announcements-and-news')
      .then(response => {
        setAnnouncementsAndNews(response.data);
      })
      .catch(error => {
        console.error('Error fetching announcements and news:', error);
      });
  }, []);

  return (
    <div>
      <h2>Announcements and News</h2>
      <ul>
        {announcementsAndNews.map(item => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnouncementsAndNews;
