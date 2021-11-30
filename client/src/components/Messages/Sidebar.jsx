import { Global } from '@emotion/react';
import React, {useState, useEffect, useContext} from 'react';
import GlobalContext from '../Contexts/GlobalContext.jsx';

const Sidebar = ({users, changeMessageView}) => {

  //hold the state of the chat rooms
  const [rooms, setRooms] = useState([]);

  const {id} = useContext(GlobalContext);





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
        users.map( user => {
          if (user.id !== id) {
            return (
          
              <div className='chatOnlineUser' key={user.id} style={chatOnlineUser} onClick={() => changeMessageView(user.id)}>
                <div className="chatOnlineImgContainer" style={chatOnlineImgContainer}>
                  <img className="chatOnlineImg" style={chatOnlineImg} src={user.pic} alt=""/>
                  <div className='chatOnlineBadge' style={chatOnlineBadge}>
                  </div>
                </div>
                <div className='chatOnlineName' key={user.id}>
                  {user.name}
                </div>
              </div>
            );
          }
         
        }
        )
      }
     
    </div>
  );
};

export default Sidebar;