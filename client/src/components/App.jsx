import React, { Component, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import styled from 'styled-components';

import Login from './Login.jsx';
import Profile from './Profile/Profile.jsx';
import Form from './Profile/Form.jsx';
import FormArtist from './Profile/FormArtist.jsx';
import FormListener from './Profile/FormListener.jsx';
import DiscoverArtists from './Home/DiscoverArtists.jsx';
import Artist from './Home/Artist.jsx';
import BandsHome from './Bands/BandsHome.jsx';
import MapEvents from './Events/MapEvents.jsx';
import Header from './Header.jsx';
import GlobalContext from './Contexts/GlobalContext.jsx';
import MessagesPage from './Messages/MessagesPage.jsx';
import DirectMessages from './DirectMessage/DirectMessages.jsx';
import MusicUpload from './UploadMusic/MusicUpload.jsx';
import EventLandingPage from './Events/EventLandingPage.jsx';
import CreateEvent from './Events/CreateEvent.jsx';
// import MailingList from './Home/mailing list/MailingList.jsx';
import Events from './Events/Events.jsx';
import KreweEventLandingPage from './Events/KrewesicArtists/KreweEventLandingPage.jsx';
import VisitProfile from './Profile/VisitProfile.jsx';
import VirtualEvent from './LiveStream/VirtualEvent.jsx';
import AudioRecording from './Recording/Recording.jsx';

import io from 'socket.io-client';
const socket = io.connect('/');



const AppStyles = styled.div`

`;

const App = (props) => {
  const [id, setId] = useState(0);
  const [artistBio, setMyBio] = useState('');
  const [influences, setInfluence] = useState('');
  const [artistName, setMyName] = useState('');
  const [myGenre, setMyGenre] = useState('');
  const [pic, setPic] = useState('');
  const [favArtist, setArtist] = useState('');
  const [favGenre, setGenre] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [type, setType] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  //const [socket] = useState(io.connect('/'));


  const value = { id, setId, name, setName, picture, setPicture, type, setType, loggedIn, setLoggedIn, city, setCity, bio, setBio, favArtist, setArtist, favGenre, setGenre, artistBio, setMyBio, artistName, setMyName, pic, setPic, myGenre, setMyGenre, influences, setInfluence, socket };



  return (
    <AppStyles>
      <GlobalContext.Provider value={value}>
        <Router>
          <Header />
          <nav>
            <Link className='clickableLight' to='/DiscoverArtists'> Discover Artists </Link>
            <Link className='clickableLight' to='/bands'>bands</Link>
            <Link className='clickableLight' to='/mapevents'>map events</Link>
            <Link className='clickableLight' to='/messages'>Messages</Link>
            <Link className='clickableLight' to='/profile'>Profile</Link>
            <Link className='clickableLight' to='/createevent'>create event</Link>
            {/* <Link to ='/mailingList'>Join Our Mailing List</Link> */}
            <Link className='clickableLight' to='/events'>events link</Link>
            <Link className='clickableLight' to='/virtualevent'>testing livestream</Link>
            <Link className='clickableLight' to='/audiorecording'>audio recording</Link>

            <Link className='upload' to='/uploadMusic'>Upload Music</Link>


          </nav>

          <Switch>
            <Route exact path="/" component={Login}>
            </Route>
            <Route path='/DiscoverArtists' >
              <DiscoverArtists />
            </Route>
            <Route path='/profile' >
              <Profile />
            </Route>
            <Route path='/form' >
              <Form />
            </Route>
            <Route path='/listenerform' >
              <FormListener />
            </Route>
            <Route path='/artistform' >
              <FormArtist />
            </Route>
            <Route path='/bands' >
              <BandsHome />
            </Route>
            <Route path='/events' >
              <Events />
            </Route>
            <Route path='/kreweEventLandingPage/:eventId' >
              <KreweEventLandingPage />
            </Route>
            <Route path='/mapevents' >
              <MapEvents />
            </Route>
            <Route path='/eventLandingPage/:eventId/:venue/:city/:performers/:lat/:lng/:type/:datetime' >
              <EventLandingPage />
            </Route>
            <Route path='/createevent' >
              <CreateEvent />
            </Route>
            <Route path='/virtualevent' >
              <VirtualEvent />
            </Route>
            <Route path='/audiorecording' >
              <AudioRecording />
            </Route>
            <Route path='/visitProfile/:id' >
              <VisitProfile />
            </Route>
            <Route exact path='/uploadMusic' component={MusicUpload} />
            <Route path='/messages' component={MessagesPage}>
            </Route>
            <Route exact path='/DirectMessage' component={DirectMessages} />

            <Route>
              <div>404 page not available</div>
            </Route>
          </Switch>
        </Router>
      </GlobalContext.Provider>

    </AppStyles>
  );

};

export default App;

/**
 *
 *  <Route exact path='/DirectMessage' component={DirectMessages} />


             <Route path='/messages' component={MessagesPage}>
            </Route>
 */

//   