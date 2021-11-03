import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Avatar} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge'; 
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SidebarRooms from './SidebarRooms.jsx';
const Sidebar = ({users}) => {

  //hold the state of the chat rooms
  const [rooms, setRooms] = useState([]);

  // const getRooms = () => {
  //   axios.get('/roomChat/rooms')
  //     .then((results) => {
  //       setRooms(results.data[0]);
  //       console.log('ROOMS:', results.data[0]);
  //     })
  //     .catch(err => {
  //       console.log('ERROR:', err);
  //     });
  // };

  useEffect(() => {
    // getRooms();
  }, []);

  //STYLE//
  const sidebar = {
    flex: '0.35',
  };
  const sidebarHeader = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    borderRight: '1px solid blue',
  // backgroundColor: 'lightgray'
  };

  const headerRight = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '10vw'
  };

  const sidebarChats = {
    flex: '1',
    backgroundColor: '#150050',
    overflow: 'scroll'
  };
  return (
    <div className="sidebar" style={sidebar}>
      <div className="sidebar-header" style={sidebarHeader}>
        <Avatar />
        <div className="sidebar-headerRight" style={headerRight}>
          <DonutLargeIcon />
          <ChatIcon />
          <MoreVertIcon />

        </div>
      </div> 
      <div className='sidebar-search'>
     
      </div>

      <div className="sidebar-chats" style={sidebarChats}>
        <SidebarRooms users={users}/>
      </div>
    </div>
  );
};

export default Sidebar;