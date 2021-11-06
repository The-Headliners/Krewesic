import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PublishIcon from '@mui/icons-material/Publish';
import { DataRowMessage } from 'pg-protocol/dist/messages';
import DiscoverArtists from '../Home/DiscoverArtists.jsx';
import Artist from '../Home/Artist.jsx';
import Post from '../Profile/Post.jsx';
import Krewe from '../Profile/Krewe.jsx';
import PeopleIcon from '@mui/icons-material/People';
import styled from 'styled-components';
import { wrap } from 'regenerator-runtime';
//import { set } from 'core-js/core/dict';


const ProfileStyles = styled.div`
height: 100vh;
.DivWithScroll {
  height:200px;
  overflow:scroll;
  overflow-x:hidden;
}

  @media screen and (max-width: 480px) {
    .namey {
      font-size: 24px;
    }
    .profPic {
      height: 120px;
      width: 120px;
    }
  }

`;



const Profile = () => {




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
    <ProfileStyles>
      <Grid
        container
        style={{ height: '100vh'}}
      >
        <Grid
          item xs={12} md={6} sm={12} lg={6}
          style={{backgroundColor: '#150050'}}
        >
          <Box
            style={{ flex: 'display', justifyContent: 'center', textAlign: 'center' }}
          >
            <Typography
              style={{marginTop: '10px' }}
              className='namey'
              variant='h4'
            >
              { artistName || name }
            </Typography>
            <br/>
            <img
              className='profPic'
              style={{borderRadius: '50%'}}
              src={pic}
              height="150"
              width="150"
            />
          </Box>
          <br/>
          <Box
            style={{align: 'left', color: '#a2a1a7', flex: 'display', justifyContent: 'center', textAlign: 'center' }}
          >
         Bio: { bio || artistBio }
            <br/>
        City: { city }
            <br/>
            {genreDesc} { favGenre || myGenre }
            <br/>
            {description}  { favArtist || influences }
          </Box>
          <br/>
          <Box
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            <Button
              style={{ backgroundColor: '#610094', width: '70%', align: 'center' }}
              startIcon={<PeopleIcon />}
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


        </Grid>
        <Grid
          item xs={12} md={6} sm={12} lg={6}
          style={{ alignItems: 'flex-end', backgroundColor: '#150050', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
        >
          <Typography
            style={{ color: '#a2a1a7', paddingTop: '10px' }}
            variant='h5'
          >Posts</Typography>
          <br/>
          <Box
            className='DivWithScroll'
          >
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
            style={{ alignItems: 'center', justifyContent: 'center'}}
          >
            <TextField
              value={text}
              style={{ backgroundColor: '#a2a1a7' }}
              onChange={e => {
                setMyTexts(e.target.value);
              }}
              multiline
              label="Post"
              size="small"
              variant="outlined"
            />
            <Button
              style={{ backgroundColor: '#610094' }}
              startIcon={<PublishIcon />}
              onClick={() => handlePost()}
            >
          Post
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ProfileStyles>
  );
};

export default Profile;




