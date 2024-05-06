import React, { useState } from 'react';
import "./notific.css";
const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'event', message: 'New event added: Workshop on AI' },
    { id: 2, type: 'placement', message: 'Placement report for ABC Company released' },
    { id: 3, type: 'quiz', message: 'New quiz added: Data Structures' },
    { id: 2, type: 'placement', message: 'Placed Students list of TCS' },
  ]);

  return (
    <div className="notification-panel">
      <h3>Notifications</h3>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} className={`notification ${notification.type} `} >
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPanel;