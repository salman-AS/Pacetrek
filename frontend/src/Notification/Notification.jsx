import React, { useState } from 'react';
import "./Notification.css";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleAddNotification = () => {
    if (newMessage.trim() !== '' && selectedType.trim() !== '') {
      setNotifications([
        ...notifications,
        { id: notifications.length + 1, type: selectedType, message: newMessage }
      ]);
      setNewMessage('');
      setSelectedType('');
      setShowOptions(false);
    }
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setShowOptions(false);
  };

  return (
    <div>
      <h2 className="notification-heading">Notifications</h2>
      <div className="notification-panel">
        <div className="notification-input">
          <div className="notification-type-field">
            <input
              type="text"
              placeholder="Enter type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            />
            <span className="arrow" onClick={() => setShowOptions(!showOptions)}>&#9660;</span>
            {showOptions && (
              <div className="options">
                <div className="option" onClick={() => handleTypeSelect('event')}>Event</div>
                <div className="option" onClick={() => handleTypeSelect('placement')}>Placement</div>
                <div className="option" onClick={() => handleTypeSelect('quiz')}>Quiz</div>
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Enter notification message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleAddNotification}>Add Notification</button>
        </div>
        <ul>
          {notifications.map(notification => (
            <li key={notification.id} className={`notification ${notification.type}`} >
              {notification.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationPanel;
