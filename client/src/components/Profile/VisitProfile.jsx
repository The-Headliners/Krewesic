import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PublishIcon from '@mui/icons-material/Publish';
import useGetUser from '../CustomHooks/useGetUser.jsx';


const VisitProfile = () => {


  const [ profDesc, setProfDesc ] = useState('');
  const {id} = useParams();

  //const user = useGetUser(id);


  //const [ posts, setMyPosts ] = useState('');
  // const [description, setDescription] = useState('');
  // const [ genreDesc, setGenreDesc ] = useState('');

  const {name, setName, picture, setPicture, type, setType, city, setCity, bio, setBio, favArtist, setArtist, favGenre, setGenre, artistBio, setMyBio, artistName, setMyName, myGenre, setMyGenre, pic, setPic, influences, setInfluence } = useGetUser(id);

  // useEffect(async()=>{
  //   const {data} = await axios.get('/form/user');
  //   console.log(data);
  //   setName(data.name);
  //   setPicture(data.picture);
  //   setType(data.type);
  //   setCity(data.city);
  //   setBio(data.bio);
  //   setArtist(data.favArtist);
  //   setGenre(data.favGenre);
  //   setMyName(data.artistName);
  //   setMyGenre(data.myGenre);
  //   setMyBio(data.artistBio);
  //   setPic(data.pic);
  //   setInfluence(data.influences);
  //   console.log('picture', picture);
  // }, []);

  //const handlePost

  const getParams = () => {
    console.info(id, name);
  };




  const profDescription = () => {
    if (artistName) {
      setProfDesc('Artist Profile');
    } else {
      setProfDesc('Listener Profile');
    }
  };

  useEffect(() => {
    profDescription();
  });

  return (
    <Box
      bgcolor="primary.dark"
      display="flex"
      flexDirection="column"
      alignItems="stretch"
    >
      <br/>
      <button onClick={getParams}></button>
      <Box>
        <Typography
          align='left'
          color='textSecondary'
          variant='h4'
        >
          {profDesc}
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

        <br/>

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

export default VisitProfile;