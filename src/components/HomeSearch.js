import React from 'react';
import HeaderSearch from "./HeaderSearch";
import travel from "../assets/images/travel-img.jpg";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {Button, ButtonGroup, Grid, InputBase, Typography} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import {Link} from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import chi from "../assets/images/chi.jpeg";
import nyc from "../assets/images/nyc.jpeg";
import sd from "../assets/images/sd.jpeg";
import stl from "../assets/images/stl.jpeg";
import Autofill from './Search/Autofill'
import $ from 'jquery'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },

    title: {
        color: theme.palette.primary,
    },

    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },

    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '30ch',
    },
}));

const StyledButton = withStyles({
    root: {
        background: '#fe706b',
        fontSize: 20,
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 20px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
})(Button);

const tileData = [
    {
        img: chi,
        title: 'Chicago',
        day: '3 days',
    },
    {
        img: nyc,
        title: 'New York City',
        day: '5 days',

    },
    {
        img: sd,
        title: 'San Diego',
        day: '10 days',
    },
    {
        img: stl,
        title: 'Seattle',
        day: '15 days',
    },
];

export default function HomeSearch() {

    const classes = useStyles();
    const [state, setState] = React.useState({
        destination: '',
        day: '',
        path:'',
    });

    const handleChange = (event) => {
        const days = event.target.day;
        setState({
            ...state,
            [days]: event.target.value,
        });
    };

    const handleCust = (e) => {
        e.preventDefault();
        const data = JSON.stringify({
            destination: state.destination,
            day: state.day,
        });

        $.ajax({
            url: '/searchcust.json',
            data: data,
            type: 'GET',
            success: (res) => {
                console.log(data)
            },
            error: (err) => {
                console.log(err)
            }
        });
    }
    const handleRecom = (e) => {
        e.preventDefault();
        const data = JSON.stringify({
            destination: state.destination,
            day: state.day,
        });

        $.ajax({
            url: '/searchrecom.json',
            data: data,
            type: 'GET',
            success: (res) => {
                console.log(data)
            },
            error: (err) => {
                console.log(err)
            }
        });
    }

    const changeAdd = add => {
        setState({
            destination: add
        })
    }

        return (
            <div className="home">
              <HeaderSearch />
                <div className="home-search" style={{opacity: 0.7,backgroundImage:`url(${travel})`}} >
                        <div className={classes.root}>
                            <Grid container>
                                <Grid item xs={6} style={{marginTop: 50}}>
                                    <Autofill onChange={changeAdd}
                                    value={state.destination}/>
                                </Grid>

                                <Grid item>
                                    <Typography variant="subtitle1" gutterBottom>
                                        How many days do you plan to go?
                                    </Typography>
                                    <Select
                                        native
                                        value={state.day}
                                        onChange={handleChange}
                                        inputProps={{
                                            days: 'day',
                                            id: 'age-native-simple',
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>
                                        <option value={13}>13</option>
                                        <option value={14}>14</option>
                                        <option value={15}>15</option>
                                    </Select>
                            </Grid>
                            </Grid>
                        </div>
                    <div className="btns">
                        <ButtonGroup variant="contained"
                                     aria-label="contained primary button group">
                            <StyledButton key="customize"
                                          onClick={handleCust}>
                                <Link to="/customize"
                                      style={{ textDecoration: 'none', color: 'white' }}>
                                    Start my own trip</Link>
                            </StyledButton>

                            <StyledButton key="recom"
                            onClick={handleRecom}>
                                <Link to="/recom"
                                      style={{ textDecoration: 'none', color: 'white' }}>
                                    Recommend me a trip</Link>
                            </StyledButton>
                        </ButtonGroup>
                    </div>
                </div>

                <div className="bottom">
                    <div className="grid-list">
                        <Typography variant='h5'
                        align="center"
                        style={{margin:15, color: '#fc6762'}}>
                            You might also like
                        </Typography>

                        <GridList className={classes.gridList} cols={4}>
                            {tileData.map((tile) => (
                                <GridListTile key={tile.img}>
                                    <img src={tile.img} alt={tile.title} />
                                    <GridListTileBar
                                        title={tile.title}
                                        subtitle={tile.day}
                                        classes={{
                                            root: classes.titleBar,
                                            title: classes.title,
                                        }}
                                        // TODO: Image onClick

                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>

            </div>
        );
    }
