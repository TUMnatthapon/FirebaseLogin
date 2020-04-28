import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './App.css'; 

const firebaseConfig = {
    apiKey: "AIzaSyDHHmtR1GeaSHbEd9r9jhOIzGK9u99cUyM",
    authDomain: "login-auth-3d1f0.firebaseapp.com",
    databaseURL: "https://login-auth-3d1f0.firebaseio.com",
    projectId: "login-auth-3d1f0",
    storageBucket: "login-auth-3d1f0.appspot.com",
    messagingSenderId: "403377432586"
};

firebase.initializeApp(firebaseConfig);

class SignInScreen extends Component {
  state = {
    isSignedIn: false 
  };

  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div className="container">
          <h1>Firebase Login</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div className="container">
        <h1>Firebase Login</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
          <img id="photo" className="pic" src={firebase.auth().currentUser.photoURL}/>
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
      </div>
    );
  }
}

export default SignInScreen;