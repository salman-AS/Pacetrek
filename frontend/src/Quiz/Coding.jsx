import React, { useState } from 'react';
import '../styles/Coding.css';
const FormComponent = () => {
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [link, setLink] = useState('');
  const [uploadedItems, setUploadedItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploadedItems([...uploadedItems, { title, difficulty, link, dateTime: new Date().toLocaleString() }]);
    setTitle('');
    setDifficulty('');
    setLink('');
  };

  const handleDelete = (index) => {
    const updatedItems = [...uploadedItems];
    updatedItems.splice(index, 1);
    setUploadedItems(updatedItems);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Upload Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Difficulty Level:</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="difficult">Difficult</option>
            </select>
          </div>
          <div className="form-group">
            <label>Link:</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="spacer"></div>
      <div className="uploaded-items-container">
        <h2>Uploaded Items</h2>
        <div className="uploaded-items">
          <ul>
            {uploadedItems.map((item, index) => (
              <li key={index}>
                <strong>Title:</strong> {item.title} |{' '}
                <strong>Difficulty:</strong> {item.difficulty} |{' '}
                <strong>Link:</strong> {item.link} |{' '}
                <strong>Date & Time:</strong> {item.dateTime}
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
