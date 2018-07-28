import React, { Component } from 'react';

import UserList from './UserList';
// import { connect } from 'react-redux';
// import { compose } from 'recompose';

class UserEdit extends Component {

  componentDidMount() {
    
  }

  render() {

    return (
      <div>
        This is the container for all user edits

        <UserList 
          users={this.props.users} 
        />
      </div>
    );
  }
}



export default UserEdit;