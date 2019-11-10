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
        <form>
          <input type="text" placeholder="Email" value={this.state.email} onChange={this.emailOnChange} />
        </form>
        <form>
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.passwordOnChange} />
        </form>
        {this.state.errorOccured && <p>Invalid email and/or password</p>}
        <button onClick={this.submitOnClick}>Submit</button>
      </div>
    );
  }

  emailOnChange = (event) => this.setState({ email: event.target.value });

  passwordOnChange = (event) => this.setState({ password: event.target.value });

  submitOnClick = () => this.login();

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
