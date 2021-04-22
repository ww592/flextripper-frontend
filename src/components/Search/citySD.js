import React, { useEffect, useState, useRef } from 'react';
import List from './List/List';
import Map from './CityMap/CityMap';
import LocationDetails from './LocationDetails/LocationDetails';
import styled from 'styled-components';
import HeaderSearch from "../HeaderSearch";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import { debounce } from 'lodash';
import Destination from '../ShowList/Destination';
import YourTrip from '../ShowList/YourTrip'

// 只有一個 Wrapper 所以沒有額外建一個 Styled Setting
export const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  height: 100%;
  margin: 0;
  padding: 0;
`
const Search = () => {

    const [defaultCenter, setDefaultCenter] = useState({
        lat: 32.7190,
        lng: -117.1527,
    })
    const [autocompleteResults, setAutocompleteResults] = useState([])
    const [inputText, setInputText] = useState('')
    const [mapApiLoaded, setMapApiLoaded] = useState(false)
    const [mapInstance, setMapInstance] = useState(null)
    const [mapApi, setMapApi] = useState(null)
    const [places, setPlaces] = useState([])
    const [isReading, setIsReading] = useState(false)
    const [details, setDetails] = useState({
        name: null,
        address: null,
        telephone: null,
        rating: null,
        isOpen: null,
        openTime: null,
    })

    // load map API
    const apiHasLoaded = (map, maps) => {
        setMapInstance(map)
        setMapApi(maps)
        setMapApiLoaded(true)
    };

    // After loading API, or move current location, then search nearby locations
    useEffect(()=>{
        findLocations(mapInstance, mapApi)
    },[mapApiLoaded, defaultCenter, mapInstance, mapApi])

    // Google API - places type (https://developers.google.com/maps/documentation/places/web-service/supported_types)
    const findLocations = (map, maps) => {
        if(mapApiLoaded) {
            const search = new maps.places.PlacesService(map)

            const request = {
                location: defaultCenter,
                radius: 10000,
                type: ['tourist_attraction']
            };

            search.nearbySearch(request, (results, status) => {
                if(status === maps.places.PlacesServiceStatus.OK) {
                    setPlaces(results)
                }
            })
        }
    }

    // Sort By Rating
    const handleSortByRating = () => {
        const newPlaces = [...places]
        newPlaces.sort((a,b)=>b.rating - a.rating)
        setPlaces(newPlaces)
    }

    // Sort By User Rating
    const handleSortByUserRatings = () => {
        const newPlaces = [...places]
        newPlaces.sort((a,b)=>b.user_ratings_total - a.user_ratings_total)
        setPlaces(newPlaces)
    }

    // When User move
    const handleCenterChange = () => {
        if(mapApiLoaded) {
            setDefaultCenter({...defaultCenter,
                lat: mapInstance.center.lat(),
                lng: mapInstance.center.lng()
            })
            console.log('handleCenterChange: ' + defaultCenter.lat, defaultCenter.lng);
        }
    }

    // Show information
    const listClick = (placeId) => {
        const search = new mapApi.places.PlacesService(mapInstance)
        const request = {
            placeId,
            fields: ['name',
                'rating',
                'formatted_address',
                'formatted_phone_number',
                'geometry',
                'opening_hours',
                'utc_offset']
        }
        search.getDetails(request, (results, status)=>{
            if (status === mapApi.places.PlacesServiceStatus.OK && results.opening_hours) {
                setDetails({...details,
                    name: results.name,
                    address: results.formatted_address,
                    telephone: results.formatted_phone_number,
                    rating: results.rating,
                    isOpen: results.opening_hours.isOpen(),
                    openTime: results.opening_hours.weekday_text,

                })
            } else {
                setDetails({...details,
                    name: results.name,
                    address: results.formatted_address,
                    telephone: results.formatted_phone_number,
                    rating: results.rating,
                    isOpen: "Can't find information :(",
                    openTime: null
                })
                setIsReading(true)
            }
            const newPosition = {
                lat: results.geometry.location.lat(),
                lng: results.geometry.location.lng()
            }
            setDefaultCenter(newPosition)
            console.log('result  : ' + placeId, results.geometry.location.lat(), results.geometry.location.lng());
            setIsReading(true)
        })
    }

    /* Search bar - AutoComplete */
    let inputRef = useRef(null);
    const handleAutocomplete = () => {
        if(mapApiLoaded) {
            const service = new mapApi.places.AutocompleteService()
            const request = {
                input: inputText
            }

            service.getPlacePredictions(request, (results, status)=> {
                if(status === mapApi.places.PlacesServiceStatus.OK) {
                    setAutocompleteResults(results)
                }
            });
        }
    }
    const handleInput = () => {
        setInputText(inputRef.current.value)
    }
    useEffect(()=>{
        handleAutocomplete()
    },[inputText])
    const handleClickToChangeMyPosition = e => {
        const placeId = e.target.getAttribute('dataid')

        const service = new mapApi.places.PlacesService(mapInstance)
        const request = {
            placeId,
            fields: [
                'geometry'
            ]
        }

        service.getDetails(request, (results, status)=>{
            if( status === mapApi.places.PlacesServiceStatus.OK) {
                const newPosition = {
                    lat: results.geometry.location.lat(),
                    lng: results.geometry.location.lng()
                }
                setDefaultCenter(newPosition) // 改變地圖視角位置
                setAutocompleteResults([]) // 清空自動搜尋地址清單
                inputRef.current.value = '' // 清空 <input>
            }
        })
    }



    // close detail
    const closeDetail = () => setIsReading(false)
    const addPoint = () => {
        setIsReading(false)
    }

    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles;

    return(
        <div>
            <HeaderSearch />
            <br/>
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={12}>
                                <YourTrip />
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={11}>
                                {/*<AutoComplete/>*/}
                                <div>
                                    <IconButton className={classes.iconButton} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                    <input
                                        ref={inputRef}
                                        placeholder="Search location"
                                        inputProps={{ 'aria-label': 'search' }}
                                        type="text"
                                        onChange={ debounce(handleInput, 500) }
                                    />
                                </div>
                                <div onClick={handleClickToChangeMyPosition} style={{cursor:'pointer'}} >
                                    {(autocompleteResults && inputText) &&
                                    autocompleteResults.map(item=>(
                                        <div key={item.id} dataid={item.place_id}>
                                            {item.description}
                                        </div>
                                    ))}
                                </div>
                                <Box />
                            </Grid>
                            <Grid item xs={12}>
                                <Wrapper>
                                    {isReading && <LocationDetails details={details} closeDetail={closeDetail} addPoint={addPoint} />}
                                    <Map
                                        mapInstance={mapInstance}
                                        mapApi={mapApi}
                                        defaultCenter={defaultCenter}
                                        places={places}
                                        handleCenterChange={handleCenterChange}
                                        mapApiLoaded={mapApiLoaded}
                                        apiHasLoaded={apiHasLoaded}
                                        listClick = {listClick}
                                    />
                                </Wrapper>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Destination />
                            </Grid>
                            <Grid item xs={12}>
                                <List
                                    mapInstance={mapInstance}
                                    mapApi={mapApi}
                                    places={places}
                                    handleSortByRating={handleSortByRating}
                                    handleSortByUserRatings={handleSortByUserRatings}
                                    listClick = {listClick}
                                />
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Search;