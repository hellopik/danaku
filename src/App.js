import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { fireAuth } from "./fireApi";
import withAuthProtection from "./withAuthProtection";
import * as firebase from "firebase";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const ProtectedProfile = withAuthProtection("/login")(TheLayout);

class App extends Component {
  constructor() {
    super();
    console.log("user", fireAuth.currentUser);
    this.state = {
      me: fireAuth.currentUser
    };
  }
  
  componentDidMount() {
    fireAuth.onAuthStateChanged(me => {
      me
      ? this.setState({ me: me })
      : this.setState({ me: null });
    });    
    // fireAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    // .catch(function(error) {
    //   console.log(error)
    // });      
  }
  
  handleSignIn = history => (email, password) => {
    return fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      console.log(fireAuth.currentUser)
      return history.push("/profile");
    }).catch(() => {
      alert("Hayoo, username/passwordnya salah.")
    });
  };  

  render() {
    const { me } = this.state;
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={({ history }) => <Login onSubmit={this.handleSignIn(history)}/>} />
              <Route path="/" name="Home" render={props => <ProtectedProfile {...props} me={me} />} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
