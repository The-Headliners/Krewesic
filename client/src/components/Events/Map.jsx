import keys from './keys.js'; //this cant be permanent
import React, {useState, memo, useEffect, useCallback, useRef} from 'react';
import { GoogleMap, LoadScript, useLoadScript, Marker, InfoWindow, MarkerClusterer} from '@react-google-maps/api';
import styled from 'styled-components';
//require('dotenv').config()
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import InfoCard from './InfoCard.jsx';
import mapStyles from './snazzyMaps.js';
import musicNoteMarker from '../images/musicMarker.png';


const StyledMap = styled.div`

  @media screen and (max-width: 650px) {
    margin: 10px;
  }
  @media screen and (min-width: 651px) {
    margin: 40px;
  }
`;


const containerStyle = {
 
  height: '90vh'
};

const libraries = ['places'];

const Map = ({events, kEvents, markers}) => {

  const [center, setCenter] = useState({ lat: 30, lng: -90 });

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
  }, []);

  const showKVenues = useCallback((e) => {
    setKVenues(current => [...current, {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }]);
  }, []);


  const mapRef = useRef();
  const onMapLoad = useCallback(map => {
    mapRef.current = map;
  }, []);

  const panToPins = useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(20);
  }, []);


  useEffect(() => {
    setVenues(events);
  }, [events]);

  useEffect(() => {
    console.info('useeffect map', events);
    if (mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();   
      events.map(event => {
        bounds.extend({
          lat: event.lat,
          lng: event.lng
        });
      });
      const newCenter = bounds.getCenter();
      //console.log('newCenter', newCenter)
      setCenter(newCenter);
      mapRef.current.fitBounds(bounds);
    }
  }, [mapRef.current, events]);

  useEffect(() => {
    setKVenues(kEvents);

  }, [kEvents]);

  //return the map component
  if (isLoaded) {
    return (
      <StyledMap>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onClick={showVenues}
          onLoad={onMapLoad}
          options={{styles: mapStyles}}
        >
          <div>
            {venues.map((venue, i) => 
              <Marker
                key={i}
                position={{lat: venue.lat, lng: venue.lng}}
               
                icon={{
                  url: musicNoteMarker,
                  scaledSize: new window.google.maps.Size(100, 100),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(80, 80)}}
                onClick={() => {
                  setSelected(venue);
                }}
              />
            )}            
            {kVenues.map((kVenue, i) => (
              <Marker
                key={i}
                position={{lat: kVenue.lat, lng: kVenue.lng}}
                onClick={() => {
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
      </StyledMap>
    );

  } else {
    return <div>else</div>;
  }
};

export default memo(Map);



