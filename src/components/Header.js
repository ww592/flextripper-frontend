import React, {Component} from 'react';
import logo from '../assets/images/logo.svg';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p className="title">
                    FlexTripper
                </p>
            </header>
        );
    }
}

export default Header;