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
  const chatOnlineUser = {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '10px'
  };

  const chatOnlineImg = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid white'
  };

  const chatOnlineImgContainer = {
    position: 'relative',
    marginRight: '10px'
  };

  const chatOnlineBadge = { 
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'limegreen',
    position: 'absolute',
    top: '2px',
    right: '2px'
  };
  return (
    <div className="chatOnline">
      {
        users.map( user => (
          
          <div className='chatOnlineUser' key={user.id} style={chatOnlineUser}>
            <div className="chatOnlineImgContainer" style={chatOnlineImgContainer}>
              <img className="chatOnlineImg" style={chatOnlineImg} src="https://www.archiefoundationhome.org.uk/wp-content/uploads/2020/05/profile-photo-social-media.jpg" alt=""/>
              <div className='chatOnlineBadge' style={chatOnlineBadge}>
              </div>
            </div>
            <div className='chatOnlineName' key={user.id}>
              {/* <SidebarRooms className='chatOnlineName' users={users}/> */}
              {user.name}
            </div>
          </div>
              
         
        ))
      }
     
    </div>
  );
};

export default Sidebar;