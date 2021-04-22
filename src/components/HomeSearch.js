import React, {useEffect, useRef} from 'react';
import HeaderSearch from "./HeaderSearch";
import travel from "../assets/images/travel-img.jpg";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {Button, ButtonGroup, Grid, InputBase, Typography} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import chi from "../assets/images/chi.jpeg";
import nyc from "../assets/images/nyc.jpeg";
import sd from "../assets/images/sd.jpeg";
import stl from "../assets/images/stl.jpeg";
import $ from 'jquery';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        overflow: 'hidden',
        height: 250,
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
        height: 60,
        padding: '0 20px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
})(Button);

const tileData = [
    {
        img: chi,
        title: 'Chicago',
        day: '3 days',
        _id: 'cityChi',
    },
    {
        img: nyc,
        title: 'New York City',
        day: '5 days',
        _id: 'cityNY',
    },
    {
        img: sd,
        title: 'San Diego',
        day: '10 days',
        _id: 'citySD',
    },
    {
        img: stl,
        title: 'Seattle',
        day: '15 days',
        _id: 'citySeattle',
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
            <Grid container={classes.root}></Grid>

            <div className="home-search" style={{opacity: 0.7,backgroundImage:`url(${travel})`}} >
                <div className={classes.root} />
                <div className="btns">
                    <ButtonGroup variant="contained"
                                 aria-label="contained primary button group">
                        <StyledButton key="customize"
                                      onClick={handleCust}>
                            <Link to="/search" style={{ textDecoration: 'none', color: 'white' }}>
                                Start my own trip
                            </Link>
                        </StyledButton>

                        <StyledButton key="recom"
                                      onClick={handleRecom}>
                            <Link to="/recom" style={{ textDecoration: 'none', color: 'white' }}>
                                Recommend me a trip
                            </Link>
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
                            <GridListTile
                                component={Link}
                                to={tile._id}
                                key={tile.img}
                            >
                                <img src={tile.img} alt={tile.title} />
                                <GridListTileBar
                                    title={tile.title}
                                    subtitle={tile.day}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>

        </div>
    );
}