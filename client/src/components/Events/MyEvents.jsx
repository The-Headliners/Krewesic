import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const MyStyledEvents = styled.div`
  .eventPreview {
    width: 500px;
    padding: 20px;

    :hover {
      cursor: pointer;
      background-color: purple; 
      padding: 20px;
    }
  }
`;


const MyEvents = () => {
  const {name, id} = useContext(GlobalContext);
  const history = useHistory();

  const [myEvents, setMyEvents] = useState([]);

  const getMyEvents = async () => {

    const {data} = await axios.get('/krewesicEvents/myVirtualEvents');
    setMyEvents(data);
  };

  useEffect(async() => {
    getMyEvents();

  }, []);
  return (
    <MyStyledEvents>
      <div>Events that I have scheduled: 
        {myEvents.map((event, i) => <div 
          key={i}
          className="eventPreview"
          onClick={() => history.push(`/virtualevent/${event.code}/${id}/${name}`)}
        >{event.code} {name}</div>)}
      </div>
    </MyStyledEvents>
  );
};

export default MyEvents;
