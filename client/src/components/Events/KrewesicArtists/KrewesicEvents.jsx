import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EventPreview from './EventPreview.jsx';
import {useHistory} from 'react-router-dom'; 
import styled from 'styled-components';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';


const KEStyled = styled.div`
 .wrapper {
  background-color: ${props => props.theme.colorBackground}; 
  padding: 30px; 
  height: 100vh;
 }
`;

const KrewesicEvents = () => {
  const history = useHistory();
  const [events, setEvents] = useState([]);
  const [virtualEvents, setVirtualEvents] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [tabValue, setTabValue] = useState('1');
  
  const changeTab = (e, value) => { //to change tabs
    setTabValue(value);
  };
  

  const getEvents = async () => {
    const {data} = await axios.get('/krewesicevents/allevents');
    setEvents(data);
  };

  const getVirtualEvents = async() => {
    const {data} = await axios.get('/krewesicevents/virtualevents');
    setVirtualEvents(data);
  };

  const getLiveEvents = async() => {
    const {data} = await axios.get('/krewesicevents/liveevents');
    setLiveEvents(data);
  };


  useEffect(() => {
    getEvents();
    getVirtualEvents();
    getLiveEvents();
  }, []);

  return (
    <KEStyled>
      <div className='wrapper'> 
        <TabContext value={tabValue} >
          <Box sx={{ borderBottom: 1, borderColor: 'white' }}>
            <TabList onChange={changeTab} aria-label="lab API tabs example">
              <Tab style={{color: 'white'}} label="All Events" value="1" />
              <Tab label="Live Events" value="2" style={{color: 'white'}} />
              <Tab label="Virtual" value="3" style={{color: 'white'}}/>
            </TabList>
          </Box>
          <TabPanel value="1">
  
            {events.map((event, i) => <EventPreview 
              key={i} 
              eventDetails={event}
         
            />)}
            
          </TabPanel>
          <TabPanel value="2">

            {liveEvents.map((event, i) => <EventPreview key={i} eventDetails={event} />)}
          
          </TabPanel>
          <TabPanel value="3">

            {virtualEvents.map((event, i) => <EventPreview key={i} eventDetails={event} />)}
          
          </TabPanel>
        </TabContext>
        

      </div>
    </KEStyled>
  );
};

export default KrewesicEvents;
