import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { compose } from 'recompose';

import UserEdit from './UserEdit';

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
        <p>The Admin Home Page is accessible to admin users.</p>

        { !!users && <UserEdit users={users} /> }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  // console.log('state from props', state);
  return {users: state.userState}
};

// const authCondition = (authUser) => !!authUser;

// export default compose(
//   withAuthorization(authCondition),
//   connect(mapStateToProps, { fetchUsers })
// )(AdminHomePage);

export default connect(mapStateToProps, { fetchUsers })(AdminHomePage);