import React from 'react';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

  state = {
    email: '',
    password: '',
    errorOccured: false
  };

  render() {
    return (
      <div className="login">
        <h1>Log In</h1>
        <form onSubmit={this.submitOnClick}>
          <input type="text" placeholder="Email" value={this.state.email} onChange={this.emailOnChange} className="text" />
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.passwordOnChange} className="text" />
          {this.state.errorOccured && (<p className="error">Invalid email and/or password</p>)}
          <input type="submit" value="Submit" className="submit"/>
        </form>
      </div>
    );
  }

  emailOnChange = (event) => this.setState({ email: event.target.value });

  passwordOnChange = (event) => this.setState({ password: event.target.value });

  submitOnClick = (e) => {
    e.preventDefault();
    this.login();
  };

  async login() {
    const email = this.state.email;
    const password = this.state.password;
    try {
      await this.props.firebase.auth().signInWithEmailAndPassword(email, password);
      this.props.history.push('map');
    } catch(error) {
      this.setState({ errorOccured: true });
    }
  }
}

export default withRouter(Login);
