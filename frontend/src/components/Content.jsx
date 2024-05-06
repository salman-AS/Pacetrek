import React from 'react';
import ContentHeader from './ContentHeader';
import "../styles/Content.css";
import Cards from './Cards';
import CalendarComponent from './Calendar';
const Contents = () => {
  return (
  <div className="contents">
    < ContentHeader />
    < Cards />
    <CalendarComponent />

  </div>
  );
};
export default Contents;