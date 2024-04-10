import React from 'react';

const NotificationList = ({ notifications }) => {
  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              {/* Display notification details (title, content, timestamp) */}
              {notification.title && <h3>{notification.title}</h3>}
              <p>{notification.content}</p>
              <span>{new Date(notification.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  );
};

export default NotificationList;
