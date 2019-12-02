import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <h1>Home Page</h1>
        <div className="options">
          <Link to="/map">
            <button>
              Map
            </button>
          </Link>
          <Link to="/table">
            <button>
              Table
            </button>
          </Link>
          <Link to="/charts">
            <button>
              Charts
            </button>
          </Link>
          <button id="signout" onClick={this.onClickSignout}>Signout</button>
        </div>
      </div>
    );
  }

  onClickSignout = (event) => {
    this.props.firebase.auth().signOut();
  }
}

export default Home;
