import React, {useState, useEffect} from 'react';
import { Avatar } from '@material-ui/core';
const SidebarRooms = ({users}) => {

  const sidebarRooms = {
    display: 'flex',
    padding: '20px',
    cursor: 'pointer',
    borderBottom: '1px solid white'
  };

  const infoHeader = {
    fontSize: '16px',
    marginBottom: '8px',
    fontWeight: 'normal',
    padding: '20px',
    color: '#c3c2c5'
  };
  const sidebarInfo = {
    marginLeft: '15px',

  };
  
  return (
    <div className="sidebar-rooms" style={sidebarRooms}>
      {/* <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsu7JeOKBlgBvTEAFwdaG4259Cxzrm21Oqfg&usqp=CAU'/> */}
      <h2 style={infoHeader}>Online:</h2>
      <div className="sidebar-chat-info" style={sidebarInfo}>
        {
          users.map( user => (
          
         
            <div style={infoHeader}>{user.name}</div>
         
          ))
        }
      </div>
    </div>
  );
};

export default SidebarRooms;
