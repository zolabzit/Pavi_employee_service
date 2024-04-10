import React from 'react';

const Announcement = ({ announcement }) => {
  return (
    <div>
      <h2>Announcement</h2>
      {announcement ? (
        <div>
          {/* Display announcement details (title, content, timestamp) */}
          {announcement.title && <h3>{announcement.title}</h3>}
          <p>{announcement.content}</p>
          <span>{new Date(announcement.timestamp).toLocaleString()}</span>
        </div>
      ) : (
        <p>No announcements yet.</p>
      )}
    </div>
  );
};

export default Announcement;
