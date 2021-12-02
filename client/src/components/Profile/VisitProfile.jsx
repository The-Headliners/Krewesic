import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import useGetUser from '../CustomHooks/useGetUser.jsx';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArtistPosts from '../Profile/ArtistPosts.jsx';
import styled, {ThemeProvider} from 'styled-components';

const VisitStyles = styled.div`

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

const VisitProfile = () => {
  const [ artistNamed, setArtistNamed ] = useState('');
  const [ artistId, setArtistId ] = useState(0);
  const [ post, setMyPost ] = useState([]);
  const [ profDesc, setProfDesc ] = useState('');
  const [description, setDescription] = useState('');
  const [ genreDesc, setGenreDesc ] = useState('');
  const [ data, setData ] = useState(null);
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

  const artDescription = () => {
    if (artistName) {
      setDescription('Influence:');
    } else {
      setDescription('Favorite Artist:');
    }
  };

  const genreDescription = () => {
    if (artistName) {
      setGenreDesc('My Genre:');
    } else {
      setGenreDesc('Favorite Genre:');
    }
  };


  const getAllPosts = () => {
    axios.get('/post/getArtistsPosts')
      .then(({ data }) => {
        const myPostArr = data.map(post => {
          return post;
        });
        setMyPost(myPostArr);
      })
      .catch((err) => {
        console.warn(err);
      });
  };


  const followArtist = () => {
    axios.get(`/follow/followedArtist/${id}`)
      .then(({ data }) => {
        const name = data.artistName;
        setArtistId(data.id);
        setArtistNamed(data.artistName);
      }).then(() => {
        const data = {
          artist: artistName,
          followedId: id,
        };
        axios.post('/follow/myFavArtists', data).then(res => {
          setData(res.data);
          setArtistNamed('');
          setArtistId('');
        });
      });
  };

  useEffect(() => {
    profDescription();
    artDescription();
    genreDescription();
  });

  return (
    <VisitStyles>
      <Grid
        container
        style={{ height: '100vh'}}
      >
        <Grid
          item xs={12} md={6} sm={12} lg={6}
          style={{ backgroundColor: '#150050' }}
        >
          <Box
            className='contentDiv'
          >
            <Typography
              align='left'
              style={{ color: '#a2a1a7' }}
              variant='h6'
            >
              {profDesc}
            </Typography>
            <br/>
            <Typography
              className='namey'
              align='center'
              style={{ color: '#a2a1a7' }}
              variant='h4'
            >
              { artistName || name }
            </Typography>
            <br/>
            <Box
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
              align='center'
            >
              <img
                className='profPic'
                src={pic}
                style={{ borderRadius: '50%', align: 'center'}}
                height="150"
                width="150"
                align='center'
              />
              <br/>
              <br/>
         Bio: { bio || artistBio }
            </Box>
            <br/>
            <Box
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
            >
        City: { city }
            </Box>
            <br/>
            <Box
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
            >
              {genreDesc} { favGenre || myGenre }
            </Box>
            <br/>
            <Box
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
            >
              {description}  { favArtist || influences }
            </Box>
            <br/>
            <Box
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
            >{
                artistName ? (
                  <Button
                    style={{ backgroundColor: '#610094', marginBottom: '10px', color: '#a2a1a7' }}
                    startIcon={<GroupAddIcon />}
                    onClick={followArtist}
                  >
          Follow
                  </Button>
                ) : (
                  null
                )
              }

            </Box>
          </Box>
        </Grid>
        <br/>
        <Grid
          item xs={12} md={6} sm={12} lg={6}
          style={{ backgroundColor: '#150050', justifyContent: 'center', alignItems: 'center'}}>
          <Box
            align='center'
            style={{ alignItems: 'center', justifyContent: 'center'}}
          >
            <Box
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
              <Button
                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#610094', marginTop: '10px', marginBottom: '10px', color: '#a2a1a7' }}
                startIcon={<VisibilityIcon />}
                onClick={getAllPosts}
              >See Posts</Button>
            </Box>
            <Box
              className='DivWithScroll'
            >
              { post.map((posty, i) => {
                return <ArtistPosts
                  key={i}
                  index={i}
                  posty={posty.text}
                  timey={new Date(posty.createdAt).toString().slice(16, 21)}
                />;
              }) }
            </Box>
          </Box>
        </Grid>
      </Grid>
    </VisitStyles>
  );
};

export default VisitProfile;