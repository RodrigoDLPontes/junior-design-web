import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Map from './Map';
import Table from './Table';
import Home from './Home';

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import apiKey from './FirebaseKey';

class App extends React.Component {

  state = { authenticated: false }

  componentDidMount() {
    firebase.initializeApp({
      apiKey,
      authDomain: "jr-design.firebaseapp.com",
      databaseURL: "https://jr-design.firebaseio.com",
      projectId: "jr-design",
      storageBucket: "jr-design.appspot.com",
      messagingSenderId: "384307097591",
      appId: "1:384307097591:web:1da8b47f70cd8fab1ec8f2",
      measurementId: "G-QVXX7D5HND"
    });
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        // User had logged in
        this.setState({ authenticated: true });
      } else {
        this.setState({authenticated: false});
      }
    })
  }

  render() {
    return (
      <Router>
        <Switch>
          {this.state.authenticated &&
            <Route path="/map">
              <Map firebase={firebase}/>
            </Route>
          }
          {this.state.authenticated &&
            <Route path="/table">
              <Table firebase={firebase}/>
            </Route>
          }
          {this.state.authenticated &&
            <Route path="/">
                <Home firebase={firebase}/>
            </Route>
          }
          <Route path="/">
            <Login firebase={firebase}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;