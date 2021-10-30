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
import { DataRowMessage } from 'pg-protocol/dist/messages';
import {useHistory} from 'react-router-dom';
import DiscoverArtists from '../Home/DiscoverArtists.jsx';
import Artist from '../Home/Artist.jsx';
import Post from '../Profile/Post.jsx';
import Krewe from '../Profile/Krewe.jsx';
//import { set } from 'core-js/core/dict';
const Profile = () => {

  const history = useHistory();
  const visitProfile = () => {
    axios.get('/form/allUsers')
      .then(({data}) => {
        console.info(data);

      });

  };


  const [description, setDescription] = useState('');
  const [ genreDesc, setGenreDesc ] = useState('');

  const {name, setName, picture, setPicture, type, setType, city, setCity, bio, setBio, favArtist, setArtist, favGenre, setGenre, artistBio, setMyBio, artistName, setMyName, myGenre, setMyGenre, pic, setPic, influences, setInfluence } = useContext(GlobalContext);

  useEffect(async()=>{
    const {data} = await axios.get('/form/user');
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





  //AXIOS AREA NEED THE POST TO SEED THEN GET REQUEST TO YA KNOW GET IT AND DISPLAY

  const [ myArtists, setMyArtists ] = useState([]);
  const [ text, setMyTexts ] = useState('');
  const [ senderId, setMySend] = useState(null);
  const [ profileId, setMyProfId ] = useState(null);
  const [ data, setData ] = useState(null);
  const [ time, setTime ] = useState([]);

  const [ post, setMyPost ] = useState([]);

  const handlePost = () => {
    const data = {
      text: text,
      senderId: senderId,
      profileId: profileId,
    };
    axios.post(`/post/profilePost/${profileId}`, data).then(res => {
      setData(res.data);
      setMyTexts('');
      setMySend('');
      setMyProfId('');
    }).then(() => getAllPosts())
      .then(() => setMyTexts(''))
      .catch(err => {
        console.warn(err);
      });
  };

  const getAllPosts = () => {
    axios.get('/post/getProfilePost')
      .then(({ data }) => {
        const myPostArr = data.map(post => {
          console.info(new Date(post.createdAt).toString().slice(16, 25));
          setTime(new Date(post.createdAt).toString().slice(16, 25));
          return post;
        });
        setMyPost(myPostArr);
      });
  };

  const getFollowed = () => {
    axios.get('follow/getFollows')
      .then(({ data }) => {
        const myArtistsArr = data.map(artist => {
          return artist.artist;
        });
        setMyArtists(myArtistsArr);
      });
  };


  useEffect(() => {
    artDescription();
    genreDescription();
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
          value={text}
          onChange={e => {
            setMyTexts(e.target.value);
          }}
          multiline
          label="Post"
          size="small"
          variant="outlined"
        />
        <Button
          startIcon={<PublishIcon />}
          onClick={() => handlePost()}
        >
          Post
        </Button>
      </Box>
      <Box
        align='right'
        marginRight='50px'
        component="div"
      >
        <h4>My Posts</h4>
        { post.map((posty, i) => {
          return <Post
            key={i}
            index={i}
            posty={posty.text}
            timey={new Date(posty.createdAt).toString().slice(16, 21)}
          ></Post>;
        }) }

      </Box>
      <Box
      >
        <Button
          onClick={getFollowed}
        >
          My Krewe
        </Button>
        <br />
        {myArtists.map((artist, i) => {
          return <Krewe

            key={i}
            artist={artist}
          ></Krewe>;
        })}
      </Box>
    </Box>
  );
};

export default Profile;




