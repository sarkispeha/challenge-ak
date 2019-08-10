import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { auth } from '../firebase';
import { user } from '../firebase';
import * as routes from '../constants/routes';
import * as actions from '../actions';

const SignUpPage = ({ history, saveNewUser }) =>
  <div>
    <h1>SignUp</h1>
	<SignUpForm 
		history={history} 
		saveNewUser={saveNewUser}
	/>
  </div>

  const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

class SignUpForm extends Component {
  constructor(props) {
    super();

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      	.then(authUser => {
			const role = 'viewer';
        	//Create User in Mongodb, will probably take place of firebase db
			this.props.saveNewUser({
				username: username,
				uid: authUser.user.uid,
				role: role,
				email: email
			});
         	// Create a user in own accessible Firebase db
			
			user.doCreateUser(authUser.user.uid, username, email, role)
			.then(() => {
				this.setState(() => ({ ...INITIAL_STATE }));
				history.push(routes.HOME);
			})
			.catch(error => {
				this.setState(byPropKey('error', error));
			});

      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
		<div>
			<form onSubmit={this.onSubmit}>
				<input
				value={username}
				onChange={event => this.setState(byPropKey('username', event.target.value))}
				type="text"
				placeholder="Full Name"
				/>
				<input
				value={email}
				onChange={event => this.setState(byPropKey('email', event.target.value))}
				type="text"
				placeholder="Email Address"
				/>
				<input
				value={passwordOne}
				onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
				type="password"
				placeholder="Password"
				/>
				<input
				value={passwordTwo}
				onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
				type="password"
				placeholder="Confirm Password"
				/>
				<button disabled={isInvalid} type="submit">
				Sign Up
				</button>

				{ error && <p>{error.message}</p> }
			</form>
	  	</div>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

function mapStateToProps(state){ 
  console.log('MAPSTATE', state);
  
  return {
      user: state.userState
  }
}

// export default withRouter(SignUpPage);

export default compose(
  withRouter,
  connect(mapStateToProps, actions),
)(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};