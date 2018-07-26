import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { fetchUsers } from '../../actions';
// import withAuthorization from './withAuthorization';
// import { user } from '../firebase';

class AdminHomePage extends Component {

  componentDidMount() {
    // const { onGetUsers } = this.props;

    this.props.fetchUsers().then( (users) => {
      console.log('THIS PROPS', this.props);
    })
    
    
    // fetchUsers = async () => {
    //   const allUsers = await user.onceGetUsers()
    //   onSetUsers(allUsers.val());
    // }
    // fetchUsers();
    
    // user.onceGetUsers().then(snapshot =>
    //   onGetUsers(snapshot.val())
    // );
    
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        <h1>Admin Home</h1>
        <p>The Home Page is accessible admin users.</p>

        { !!users && <UserList users={users} /> }
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Mongo Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>


const mapStateToProps = (state) => ({
  users: state.userState
});

// const mapDispatchToProps = (dispatch) => ({
//   onGetUsers: (users) => dispatch({ type: 'fetch_users', users })
// });

// const authCondition = (authUser) => !!authUser;

// export default compose(
//   withAuthorization(authCondition),
//   connect(mapStateToProps, mapDispatchToProps)
// )(AdminHomePage);

export default connect(mapStateToProps, { fetchUsers })(AdminHomePage);