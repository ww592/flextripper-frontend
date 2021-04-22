import React, {Component} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import {Button, FormHelperText} from "@material-ui/core";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import axios from "axios";
import $ from 'jquery';
import {Redirect} from 'react-router-dom';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
    }


    handleInput(field) {
        return (e) => this.setState({[field]: e.target.value});
    }

    handleRegisterClick(e) {
        e.preventDefault();
        const {email, username, password} = this.state;
        const data = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            userRole: null,
            enabled: true,
            history: null
        };

        fetch('/process_register', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(resp => {
            console.log(resp);
            if (resp.ok) {
                this.props.history.push("/login");
            } else {

            }
            return resp.text();
        });
    };

    render() {
        const {user} = this.props;
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

        const useStyles = makeStyles((theme) => ({
            root: {
                flexGrow: 1,
                '& .MuiTextField-root': {
                    margin: theme.spacing(3),
                    width: '50ch',
                },
                textField: {
                    marginLeft: theme.spacing(1),
                    marginRight: theme.spacing(1),
                    width: '25ch',
                },
            },
            paper: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },
        }));
        const classes = useStyles;

        return (
            <div className="register">
                <Header/>
                <div className="box-container">
                    <form className={classes.root}
                          noValidate autoComplete="off"
                          onSubmit={this.handleRegisterClick}
                          method="POST" action="/register">
                        <Grid container
                              alignItems="center"
                              justify="center"
                              direction="column">

                            <TextField
                                required
                                label="Username"
                                style={{margin: 10}}
                                id="username"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleInput('username')}
                                value={this.state.firstname}

                            />
                            <br/>
                            <TextField
                                required
                                label="Email"
                                style={{margin: 10}}
                                id="email"
                                className={classes.textField}
                                variant="outlined"
                                onChange={this.handleInput('email')}
                                value={this.state.email}
                            />
                            <br/>
                            <TextField
                                required
                                style={{margin: 10}}
                                id="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                onChange={this.handleInput('password')}
                                value={this.state.password}
                            />
                        </Grid>
                        <Grid container alignItems="center" justify="center" direction="row">
                            <StyledButton variant="contained"
                                          style={{margin: 20}}
                                          type="submit"
                                          onClick={this.handleRegisterClick}
                                          user={user}
                            >
                                Sign up now!
                            </StyledButton>
                        </Grid>
                    </form>
                </div>
                <Footer/>
            </div>
        );
    }
}


export default Register;