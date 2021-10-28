import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';


const Search = () => {
  const {ready, value, setValue, suggestions: {status, data}, clearSuggestion } = usePlacesAutocomplete({
    requestOptions: {
      location: {lat: () => 30, lng: () => -90},
      radius: 20 * 1000, //meters

    }
  });

  return (
    <Combobox onSelect={(direccion) => {

    }}>
      <ComboboxInput
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={!ready}
        placeholder={'placeholder'}
      />


    </Combobox>
  );
};

export default Search;
