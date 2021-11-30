import React, {useState, useEffect} from 'react';

const Sidebar = ({users, changeMessageView}) => {

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
          
          <div className='chatOnlineUser' key={user.id} style={chatOnlineUser} onClick={() => changeMessageView(user.id)}>
            <div className="chatOnlineImgContainer" style={chatOnlineImgContainer}>
              <img className="chatOnlineImg" style={chatOnlineImg} src={user.pic} alt=""/>
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