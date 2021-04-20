import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import {Button, ButtonGroup} from "@material-ui/core";
import img from "../../assets/images/travel-img.jpg";
import Header from "../Header";
import Footer from "../Footer";
import {Link} from "react-router-dom";

class Body extends Component {
    state = {
        path: "/flextripper"
    }

    handleClick=(e) => {
        this.setState({path:e.key});
    }

    render() {
        const StyledButton = withStyles({
            root: {
                background: '#fe706b',
                fontSize: 30,
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 70,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            },
        })(Button);

        return (
            <div key="/flextripper">
                <Header />
            <div className="body">
                <div className="top" style={{opacity: 0.7,backgroundImage:`url(${img})`}}>
                    <div className="btn-container">
                        <ButtonGroup variant="contained"
                                     aria-label="contained primary button group"
                                     onClick={this.handleClick}>
                            <StyledButton key="register">
                                <Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>
                                    Get started!</Link>
                            </StyledButton>

                            <StyledButton key="login" >
                                <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                                    Log in</Link>
                            </StyledButton>
                        </ButtonGroup>
                    </div>
                </div>

                <div className="bottom">
                    <h1>About us</h1>
                    <h2>
                        An app to plan trips and find amazing places
                    </h2>
                </div>
            </div>
                <Footer />
            </div>
        );
    }
}

export default Body;