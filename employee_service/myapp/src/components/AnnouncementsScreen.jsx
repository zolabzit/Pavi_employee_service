import React from 'react';

function AnnouncementsScreen() {
  // Placeholder data (replace with actual data fetched from API)
  const announcements = [
    
    { id: 2, title: 'Employee Recognition Awards', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', author: 'Management Team', date: '2022-07-10' },
    // Add more announcements as needed
  ];

  return (
    <div>
      <h2>Announcements</h2>
      {announcements.map(announcement => (
        <div key={announcement.id}>
          <h3>{announcement.title}</h3>
          <p>{announcement.description}</p>
          <p>Posted by {announcement.author} on {announcement.date}</p>
        </div>
      ))}
    </div>
  );
}

export default AnnouncementsScreen;