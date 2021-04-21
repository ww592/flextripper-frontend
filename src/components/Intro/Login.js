import React, {useState} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper"
import axios from "axios";
import $ from 'jquery';
import {Redirect} from 'react-router-dom';
import {setSessionCookie} from './Session';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:'',
            sessionUsername:'',
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.setUsername = this.setUsername.bind(this);

    }

    /*TEST*/
    // setUsername(e) {
    //     e.preventDefault();
    //     const [username] = this.state.username;
    //     setSessionCookie({ username });
    //
    //     fetch("http://localhost:8080/allcookies", {
    //         headers: {
    //             "Authorization": 'Basic ' + window.btoa(this.state.username)
    //         }
    //     }).then(resp => {
    //         console.log(resp);
    //         if (resp.ok) {
    //             console.log("cookie:")
    //             // this.setState({isLoginSucces: true});
    //         } else {
    //             // this.setState({isLoginSucces: false});
    //         }
    //         return resp.text();
    //     });
    // }

    handleInput(field) {
        return (e) => this.setState({ [field]: e.target.value });
    }

    handleLogin(e) {
        const [email] = this.state.email;
        e.preventDefault();
        setSessionCookie({ email });
        // $.ajax({
        //     url: '/login.json',
        //     data: data,
        //     type: 'POST',
        //     success: (res) => {
        //         console.log(data)
        //     },
        //     error: (err) => {
        //         console.log(err)
        //     }
        // });

        fetch("http://localhost:8080/login", {
            headers: {
                "Authorization": 'Basic ' + window.btoa(this.state.email + ":" + this.state.password)
            }
        }).then(resp => {
            console.log(resp);
            if (resp.ok) {
                this.props.history.push("/home");
                // this.setState({isLoginSucces: true});
            } else {
                // this.setState({isLoginSucces: false});
            }
            return resp.text();
        });


        // axios
        //     .get("http://localhost:8080/user", data)
        //     .then(response => this.setState({
        //         user: response.data,
        //     }))
        //     .catch(err => console.log(err));
    };


    render() {
        const { user } = this.props;
        const StyledButton = withStyles({
        root: {
            background: '#fe706b',
            fontSize: 20,
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 45,
            padding: '0 20px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
    })(Button);

        const useStyles = makeStyles((theme) => ({
            root: {
                '& .MuiTextField-root': {
                    margin: theme.spacing(3),
                    width: '50ch',
                },
            },
        }));
        const classes = useStyles;

        return (
            <div className="login">
                <Header />
                <div className="box-container">
                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid container alignItems="center" justify="center" direction="column">
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <TextField
                                        required
                                        id="email"
                                        label="Email"
                                        variant="outlined"
                                        onChange={this.handleInput('email')}
                                        value={this.state.email}
                                    />
                                </Paper>
                            </Grid>
                            <br/>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <TextField
                                        required
                                        id="password"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        variant="outlined"
                                        onChange={this.handleInput('password')}
                                        value={this.state.password}

                                    />
                                </Paper>
                            </Grid>
                            <br/>

                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <StyledButton variant="contained"
                                                  type="submit"
                                                  user={user}
                                                  onClick={this.handleLogin}>
                                        Log in
                                    </StyledButton>
                                </Paper>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Login;