import React from 'react';
import ContentHeader from './ContentHeader';
import "../styles/contents.css";
import Cards from '../components/Cards';
import Caldr from './Caldr'

const Contents = ({username , Logout}) => {
  return (
  <div className="contents">
    <ContentHeader username={username} Logout={Logout} />
    < Cards />
    <Caldr />

  </div>
  );
};
export default Contents;