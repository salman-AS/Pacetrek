import React from 'react';
import ContentHeader from './ContentHeader';
import "../styles/contents.css";
import Cards from '../components/cards2';
import Caldr from './Caldr'

const contents2 = ({username , Logout}) => {
  return (
  <div className="contents">
    <ContentHeader username={username} Logout={Logout} />
    < Cards />
    <Caldr />

  </div>
  );
};
export default contents2;
