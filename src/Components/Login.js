import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from 'react-router';
import { userLogin } from "react-admin"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Signup from "./Signup"
import { API_URL } from "../dataProvider"
// import LockOutlinedIcon from '@material-ui/icons'

export const MadeWithLove = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with ❤️ by the "}
      <Link color="inherit" href="https://akshayhp2298.tech/">
        A.H.Prajapati
      </Link>
    </Typography>
  )
}
export const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

function SignInSide(props) {
  const classes = useStyles()

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {/* <form className={classes.form} noValidate> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={props.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link variant="body2" onClick={() => props.changeState(false)}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <MadeWithLove />
          </Box>
          {/* </form> */}
        </div>
      </Grid>
    </Grid>
  )
}

class MyLoginPage extends Component {
  constructor() {
    super()
    this.state = { login: true }
  }
  changeState(status) {
    this.setState({ login: status })
  }
  submit = e => {
    e.preventDefault()
    const credentials = {
      username: document.getElementById("email").value,
      password: document.getElementById("password").value
    }

    // Dispatch the userLogin action (injected by connect)
    this.props.userLogin(credentials)
  }
  signup = async e => {
    e.preventDefault()
    //get Data

    try {
      const credentials = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      }

      let response = await fetch(`${API_URL}/user/create`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      })
      response = await response.json()
      if (response.done) {
        alert("SignUp Successful\nLogin to Continue")
        this.changeState(true)
        return
      } else {
        alert(response.message)
      }
    } catch (exception) {
      console.log(exception)
    }
  }
  render() {
    const token = localStorage.getItem("token")
    if (token) return <Redirect to="/todos" />
    else
      return this.state.login ? (
        <SignInSide
          submit={this.submit}
          changeState={this.changeState.bind(this)}
        />
      ) : (
        <Signup
          signup={this.signup}
          changeState={this.changeState.bind(this)}
        />
      )
  }
}

export default connect(undefined, { userLogin })(MyLoginPage)
