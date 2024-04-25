import React from 'react';
import ContentHeader from './ContentHeader';
import "../styles/contents.css";
import Cards from '../components/Cards';
import Caldr from './Caldr'

const Contents = () => {
  return (
  <div className="contents">
    <ContentHeader />
    < Cards />
    <Caldr />

  </div>
  );
};
export default Contents;