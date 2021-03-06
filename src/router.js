import React, {Component} from 'react';
import {HashRouter, Redirect} from "react-router-dom";
import {Route, Switch} from "react-router";
import Body from "./components/Intro/Body";
import Login from "./components/Intro/Login";
import Register from "./components/Intro/Register";
import Home from "./components/HomeSearch";
import Search from './components/Search/search';
import ViewTrip from './components/ShowList/ViewTrip';
import ViewMyTrips from './components/ShowList/ViewMyTrips';
import cityCHI from './components/Search/cityCHI'
import cityNY from './components/Search/cityNY'
import citySD from './components/Search/citySD'
import citySeattle from './components/Search/citySeattle'

export default class RouterWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: null
        };
    }

    showForm = () => {
        this.setState({
            path: "/"
        });
    }

    render() {
        return (
            <div id="router">
                <HashRouter>
                    <Switch>
                        <Route path="/" component={Body} exact onShow={this.showForm}/>
                        <Route path="/register" component={Register}
                               exact render={()=>(
                            this.props.user ? (alert("You can't register if you are logged in!"),
                                (<Redirect to="/home"/>)) : (<Register/>)
                        )}/>
                        <Route path="/login" component={Login}
                               exact render={()=>(
                            this.props.user ? (alert("You can't login if you are logged in!"),
                                (<Redirect to="/home"/>)) : (<Login/>)
                        )}/>
                        {/*Page to input destination*/}
                        <Route path="/home" component={Home} type="private"/>
                        {/*Page to input destination*/}
                        <Route path="/search" component={Search} />
                        <Route path="/viewtrip" component={ViewTrip} />
                        <Route path="/viewmytrips" component={ViewMyTrips} />
                        <Route path="/cityChi" component={cityCHI} />
                        <Route path="/cityNY" component={cityNY} />
                        <Route path="/citySD" component={citySD} />
                        <Route path="/citySeattle" component={citySeattle} />
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}
