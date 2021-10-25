import React, {useState, useEffect} from 'react';
import { Avatar } from '@material-ui/core';
const SidebarRooms = ({rooms}) => {

  const sidebarRooms = {
    display: 'flex',
    padding: '20px',
    cursor: 'pointer',
    borderBottom: '1px solid white'
  };

  const infoHeader = {
    fontSize: '16px',
    marginBottom: '8px',
    color: 'black'
  };
  const sidebarInfo = {
    marginLeft: '15px',

  };
  
  return (
    <div className="sidebar-rooms" style={sidebarRooms}>
      <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsu7JeOKBlgBvTEAFwdaG4259Cxzrm21Oqfg&usqp=CAU'/>

      <div className="sidebar-chat-info" style={sidebarInfo}>
        <h2 style={infoHeader}>Music Chat Room </h2>
        <p style={infoHeader}>Last message...</p>
      </div>
    </div>
  );
};

export default SidebarRooms;
