import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PublishIcon from '@mui/icons-material/Publish';
import FormArtist from './FormArtist.jsx';
import FormListener from './FormListener.jsx';

const Profile = () => {

  //const [ posts, setMyPost ] = useState('');
  const [description, setDescription] = useState('');

  const {name, setName, picture, setPicture, type, setType, city, setCity, bio, setBio, favArtist, setArtist, favGenre, setGenre, artistBio, setMyBio, artistName, setMyName, myGenre, setMyGenre, pic, setPic, influences, setInfluence } = useContext(GlobalContext);

  useEffect(async()=>{
    const {data} = await axios.get('/form/user');
    console.log(data);
    setName(data.name);
    setPicture(data.picture);
    setType(data.type);
    setCity(data.city);
    setBio(data.bio);
    setArtist(data.favArtist);
    setGenre(data.favGenre);
    setMyName(data.artistName);
    setMyGenre(data.myGenre);
    setMyBio(data.artistBio);
    setPic(data.pic);
    setInfluence(data.influences);
    console.log('picture', picture);
  }, []);

  //const handlePost

  const artDescription = () => {
    if (favArtist) {
      setDescription('FAVORITE ARTIST:');
    } else {
      setDescription('INFLUENCE:');
    }
  };

  useEffect(() => {
    artDescription();
  });

  return (
    <Box
      bgcolor="primary.dark"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
    >
      <br/>
      <Box>
        <Typography
          align='left'
          color='textSecondary'
          variant='h4'
        >
          My Profile
        </Typography>
        <br/>
      </Box>
      <Box>
        <Typography
          align='center'
          variant='h4'
        >
          { artistName || name }
        </Typography>
        <br/>
        <Box
          align='center'
        >
          <img
            src={pic}
            height="150"
            width="150"
          />
          <br/>
         BIO: { bio || artistBio }
        </Box>
        <br/>
        <Box
          align='center'
        >
        CITY: { city }
        </Box>
        <br/>
        <Box
          align='center'
        >
         GENRE: { favGenre || myGenre }
        </Box>
        <br/>
        <Box
          align='center'
        >
          {description}  { favArtist || influences }
        </Box>
      </Box>
      <br/>
      <Box
        align='center'
        marginLeft="100px"
      >
        <TextField
        // onChange={e => setMyPosts(e.target.value)}
          multiline
          label="Post"
          size="small"
          variant="outlined"
        />
        <Button
          startIcon={<PublishIcon />}
          //onClick={handlePost}
        >
          Post
        </Button>
      </Box>
      <Box
        align='right'
        marginRight='50px'
        component="div"
        sx={{ visibility: 'visible' }}>
        posts
      </Box>
    </Box>
  );
};

export default Profile;

