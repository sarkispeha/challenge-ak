import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';

const userValues = [];

const renderField = ({ input, label, type }) =>{

    
    // if(type === 'radio'){
    //     console.log('IS INPUT CHECKED?', input.checked);
    //     // input.checked = true;
        
    //     // input.value = ;
    //     console.log('INPUT FROM RENDERFIELD', input);
        
    //     const radioChange = () => {
    //         console.log("changing radio")
    //     }
    //     return (
    //         <div className="radio-component">
    //             <label>{label}</label>                   
    //             <p>
    //             <label>
    //                 {/* <Field className="override-radio" component="input" name="user_type" type="radio" checked="true" value="viewer"/> */}
    //                 <input className="override-radio" type="radio" value="viewer" onChange={radioChange} checked={input.value === 'viewer'} />
    //                 <span>Viewer</span>
    //             </label>
    //             </p>
    //             <p>
    //             <label>
    //                 <Field className="override-radio" component="input" name="user_type" type="radio" value="AM"/>
    //                 <span>Volunteer</span>
    //             </label>
    //             </p>
    //             <p>
    //             <label>
    //                 <Field className="override-radio" component="input" name="user_type" type="radio" value="AM"/>
    //                 <span>Admin</span>
    //             </label>
    //             </p>
    //         </div>
    //     )
    // }else{
        return (
            <div>
            <label>{label}</label>
            <div>
                <input {...input} type={type} placeholder={label}/>
        
            </div>
            </div>
        )
    // }
    
}

const renderVolunteers = ({ fields }) => {

    console.log('FIELDS FROM RENDERVOLUNTEERS', fields);
    
    return (
    <ul>
        <li>
        <button type="button" onClick={() => fields.push({})}>Add Member</button>
        </li>
        {fields.map((volunteer, index) =>
        <li key={index}>
            <button
            type="button"
            title="Remove Member"
            onClick={() => fields.remove(index)}> The remove button</button>
            <h4>Member #{index + 1}</h4>
            <Field
            name={`${volunteer}.username`}
            type="text"
            component={renderField}
            label="First Name"/>
            <Field
            name={`${volunteer}.lastName`}
            type="text"
            component={renderField}
            label="Last Name"/>
            <Field
            name={`${volunteer}.role`}
            type="text"
            component={renderField}
            value={volunteer.role}
            label="Role"/>
            {/* <FieldArray name={`${member}.hobbies`} component={renderHobbies}/> */}
        </li>
        )}
    </ul>
)
}

// const renderHobbies = ({ fields }) => (
//     <ul>
//       <li>
//         <button type="button" onClick={() => fields.push()}>Add Hobby</button>
//       </li>
//       {fields.map((hobby, index) =>
//         <li key={index}>
//           <button
//             type="button"
//             title="Remove Hobby"
//             onClick={() => fields.remove(index)}/>
//           <Field
//             name={hobby}
//             type="text"
//             component={renderField}
//             label={`Hobby #${index + 1}`}/>
//         </li>
//       )}
//     </ul>
// )

const FieldArraysForm = (props) => {
    console.log('PROPS FROM FIELD ARRAYS FORM', props)
    const { handleSubmit, pristine, reset, submitting } = props;

    const logValues = (values) => {

        console.log(values)
    }
    return (
        <form onSubmit={handleSubmit}>
        {/* // <form onSubmit={handleSubmit(values => console.log('values', values))} > */}
        {/* // <form onSubmit={e => e.preventDefault()}> */}
        <FieldArray name="volunteers" component={renderVolunteers}/>
        <div>
          <button type="submit" disabled={submitting} onClick={values => logValues(values)} >Submit</button>
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
                // userValues.splice(0,userValues.length);
                userValues.push(user);
            }
        }
    }
    
}

 handleListSubmit(values){
     console.log('values', values)
 }

render (){
    return (
    <div>
        <h5>List of Usernames of Users</h5>
        <p>(Saved on Sign Up in Mongo Database)</p>
    
        <FieldArraysForm handleSubmit={this.handleListSubmit} />
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