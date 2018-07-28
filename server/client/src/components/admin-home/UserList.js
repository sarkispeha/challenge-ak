import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';

const userValues = [];

const renderField = ({ input, label, type }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} placeholder={label}/>

      </div>
    </div>
  )

const renderVolunteers = ({ fields }) => (
    <ul>
        <li>
        <button type="button" onClick={() => fields.push({})}>Add Member</button>
        </li>
        {fields.map((member, index) =>
        <li key={index}>
            <button
            type="button"
            title="Remove Member"
            onClick={() => fields.remove(index)}/>
            <h4>Member #{index + 1}</h4>
            <Field
            name={`${member}.username`}
            type="text"
            component={renderField}
            label="First Name"/>
            <Field
            name={`${member}.lastName`}
            type="text"
            component={renderField}
            label="Last Name"/>
            <FieldArray name={`${member}.hobbies`} component={renderHobbies}/>
        </li>
        )}
    </ul>
)

const renderHobbies = ({ fields }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push()}>Add Hobby</button>
      </li>
      {fields.map((hobby, index) =>
        <li key={index}>
          <button
            type="button"
            title="Remove Hobby"
            onClick={() => fields.remove(index)}/>
          <Field
            name={hobby}
            type="text"
            component={renderField}
            label={`Hobby #${index + 1}`}/>
        </li>
      )}
    </ul>
)

const FieldArraysForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
      <form onSubmit={handleSubmit}>
        <FieldArray name="volunteers" component={renderVolunteers}/>
        <div>
          <button type="submit" disabled={submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    )
  }


class UserList extends Component {
//  = ({ users }) =>

componentDidMount() {
    
}

componentWillReceiveProps(nextProps) {
   
    if(nextProps !== this.props){
        console.log('THE NEXT PROPS YO', nextProps);
        
        if (Array.isArray(nextProps.users)){
            for( let user of nextProps.users){
                userValues.push(user)
            }
        }
    }
    
}

render (){
    return (
    <div>
        <h5>List of Usernames of Users</h5>
        <p>(Saved on Sign Up in Mongo Database)</p>
    
        <FieldArraysForm />
        {/* <form>
        {Object.keys(this.props.users).map(key =>
            <div key={key}>
                {this.props.users[key].username}
                <label>Volunteer Name</label>
                <Field component="input" name="volunteer_name" type="text" />
            </div>
        )}
        </form> */}
    </div>

    );
}

}

UserList = reduxForm({
    form: 'volunteerEditForm',
    initialValues: {
        // members : [{firstName: 'john', lastName: 'Doe'}]
        volunteers : userValues
    }
})(UserList);

// UserList = connect(
//     state => ({
//         initialValues: userValues 
//     })
// )(UserList)

export default UserList;