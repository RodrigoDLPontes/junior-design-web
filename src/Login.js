import React from 'react';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

  state = { password: '' };

  render() {
    return (
      <div className="login">
        <h1>Log In</h1>
        <form>
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.passwordOnChange} />
        </form>
        <button onClick={this.submitOnClick}>Submit</button>
      </div>
    );
  }

  passwordOnChange = (event) => this.setState({ password: event.target.value });

  submitOnClick = () => {
    // Submit to backend and check response
    this.props.history.push('map');
  }
}

export default withRouter(Login);
