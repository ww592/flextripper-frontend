import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Footer from "../Footer";
import TripList from "../ShowList/TripList"
import Search from "./search";
import HeaderSearch from "../HeaderSearch";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        },
}));

const classes = useStyles;

// Last page with recommended trips
class Edit extends Component {
    render() {

        return (
            <div className="edit">
                <HeaderSearch/>
                <div className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs>

                        </Grid>
                        <Grid item xs={4}>
                            <TripList/>
                        </Grid>
                    </Grid>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Edit;