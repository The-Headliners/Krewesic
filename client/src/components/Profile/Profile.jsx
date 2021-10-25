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



const Profile = (props) => {


  const [ post, setMyPosts ] = useState('');


  const [description, setDescription] = useState('');
  const [ genreDesc, setGenreDesc ] = useState('');

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


  const artDescription = () => {
    if (favArtist) {
      setDescription('Favorite Artist:');
    } else {
      setDescription('Influence:');
    }
  };

  const genreDescription = () => {
    if (favGenre) {
      setGenreDesc('Favorite Genre:');
    } else {
      setGenreDesc('My Genre:');
    }
  };

  useEffect(() => {
    artDescription();
    genreDescription();
  });



  //AXIOS AREA NEED THE POST TO SEED THEN GET REQUEST TO YA KNOW GET IT AND DISPLAY
  const handlePost = () => {
    const data = {
      text: text,
      senderId, senderId,
      profileId, id,
    };
    axios.post(`/post/profilePost/${id}`, data).then(res => {
      setData(res.data);
      setMyPosts('');
    }).catch(err => {
      console.log('darn', err);
    });
  };


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
          <br/>
         Bio: { bio || artistBio }
        </Box>
        <br/>
        <Box
          align='center'
        >
        City: { city }
        </Box>
        <br/>
        <Box
          align='center'
        >
          {genreDesc} { favGenre || myGenre }
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
          onChange={e => setMyPosts(e.target.value)}
          multiline
          label="Post"
          size="small"
          variant="outlined"
        />
        <Button
          startIcon={<PublishIcon />}
          onClick={handlePost}
        >
          Post
        </Button>
      </Box>
      <Box
        align='right'
        marginRight='50px'
        component="div"
        sx={{ visibility: 'visible' }}>
        <h4>My Posts</h4>

      </Box>
    </Box>
  );
};

export default Profile;




