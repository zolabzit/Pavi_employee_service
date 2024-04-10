import React from 'react';

function UpcomingEventsScreen() {
  // Placeholder data (replace with actual data fetched from API)
  const upcomingEvents = [
    
    { id: 2, title: 'Team Building Workshop', date: '2022-08-05', time: '9:00 AM', location: 'Conference Room' },
    // Add more events as needed
  ];

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {upcomingEvents.map(event => (
          <li key={event.id}>
            <strong>{event.title}</strong>
            <p>Date: {event.date}, Time: {event.time}</p>
            <p>Location: {event.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingEventsScreen;