import React, {useEffect, useState} from 'react';
import GoogleMapReact from 'google-map-react';
import {API_KEY} from '../../api_key';
import placeholder from '../../../assets/images/placeholder.svg';

import {
    Icon,
    MapWrapper,
    MarkerWrapper,
    Text
} from './MapSetting';

const LocationMarker = ({icon, text, showDetail, placeId}) => (
    <MarkerWrapper>
      <Icon src={icon} />
      <Text onClick={()=>showDetail(placeId)}>{text}</Text>
    </MarkerWrapper>
)

const MyPositionMarker = ({text}) =>(
    <MarkerWrapper>
      <Icon src={placeholder} />
      <Text>{text}</Text>
    </MarkerWrapper>
)

let i = 0;

const Map = ({places, defaultCenter, handleCenterChange, apiHasLoaded, showDetail}) => (

  <MapWrapper>
    <GoogleMapReact
      onBoundsChange={handleCenterChange}
      bootstrapURLKeys={{ 
        key: API_KEY,
        libraries: ['places','geometry']
      }}
      //defaultCenter={{lat: 37.297, lng: -121.95}}
      defaultCenter={defaultCenter}
      defaultZoom={17}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
    >
      <MyPositionMarker
        lat={defaultCenter.lat}
        lng={defaultCenter.lng}
        text="Current location"
      />
      {places.map(item=>{
        return(
          <LocationMarker
            icon={item.icon}
            key={i++}
            lat={item.geometry.location.lat()}
            lng={item.geometry.location.lng()}
            text={item.name} 
            placeId={item.place_id} 
            showDetail={showDetail} 
        />)
        })}
    </GoogleMapReact>
  </MapWrapper>
)


export default Map
  