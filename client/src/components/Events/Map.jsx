import keys from './keys.js'; //this cant be permanent
import React, {useState, memo, useEffect, useCallback, useRef} from 'react';
import { GoogleMap, LoadScript, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import styled from 'styled-components';
//require('dotenv').config()
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import InfoCard from './InfoCard.jsx';




const containerStyle = {
  width: '500px',
  height: '500px'
};
//  mapContainerStyle={containerStyle}



const libraries = ['places'];

const Map = ({events, kEvents}) => {
  
  const center = { lat: 30, lng: -90 };
 
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: keys.GOOGLE_MAPS_KEY,
    libraries
  });

  const [venues, setVenues] = useState([]);
  const [selected, setSelected] = useState(null);

  const [kVenues, setKVenues] = useState([]);

  const showVenues = useCallback((e) => {
    setVenues(current => [...current, {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }]);
    console.log(venues);
  }, []);

  const showKVenues = useCallback((e) => {
    setKVenues(current => [...current, {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }]);
    console.log(kVenues);
  }, []);


  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);
  
  useEffect(() => {
    // const locations = events.map(event => {
    //   const latLng = {};
    //   latLng.lat = event.location.lat;
    //   latLng.lng = event.location.lon;
    //   return latLng
    // })
    setVenues(events);

  }, [events]);

  useEffect(() => {
    // const locations = events.map(event => {
    //   const latLng = {};
    //   latLng.lat = event.location.lat;
    //   latLng.lng = event.location.lon;
    //   return latLng
    // })
    setKVenues(kEvents);
    
  }, [kEvents]);


  //return the map component
  if (isLoaded) {
    return (
      <div>
      
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={showVenues}
          onLoad={onMapLoad}
            
        >
          <div>
            {venues.map((venue, i) => (
              <Marker 
                key={i} 
                position={{lat: venue.lat, lng: venue.lng}} 
                onClick={() => {
                  console.log(venue.type);
                  setSelected(venue);
                }}
              />
            ))}
            {kVenues.map((kVenue, i) => (
              <Marker 
                key={i} 
                position={{lat: kVenue.lat, lng: kVenue.lng}} 
                onClick={() => {
                  console.log(kVenue.type);
                  setSelected(kVenue);
                }}
              />
            ))}
            {selected && (<InfoWindow 
              position={{lat: selected.lat, lng: selected.lng}}
              onCloseClick={() => setSelected(null)}
            >
              <div>info window {selected.type} 
                <InfoCard event={selected} />
              </div>
            </InfoWindow>)}
          </div>
        </GoogleMap>
    
      </div>
    ); 

  } else {
    return <div>else</div>;
  }
  
};

export default memo(Map);


// if(loadError) return 'Error loadng maps'; 
// if(!loadError) {
//   console.log('cool')
//   return <h1>"Loading Maps"</h1>;}

/**
   *  <LoadScript
        googleMapsApiKey={keys.GOOGLE_MAPS_KEY}
      >
   */