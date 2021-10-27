import React from 'react';

const GlobalContext = React.createContext({
  name: '',
  type: '',
  bio: '',
  city: '',
  artistName: '',
  favGenre: '',
  myGenre: '',
  artistBio: '',
  favArtist: '',
  setPic: '',
  setInfluence: '',
  setUserProf: [],
});

export default GlobalContext;
