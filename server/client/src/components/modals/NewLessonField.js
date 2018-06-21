import React from 'react';

//functional component
//below es6 syntax takes the props.input property
export default ({ input, label, type, meta: {error, touched} }) => {

    switch (type) {
        case 'text':
            return (
                <div>
                    <label >{label}</label>
                    {/* takes all properties and of input without writing out
                        ie onBlur={input.onBlur} onChange={input.onChange} etc
                    */}
                    <input {...input} type={type} style={{marginBottom: '5px' }} />
                    {/* <div className="red-text" style={{marginBottom: '20px'}}>
                        {touched && error}
                    </div> */}
                </div>
            );
        case 'radio':
            return (
                <div id="radio-component"> 
                    <label >{label}</label>                   
                    <p>
                    <label>
                        <input className="override-radio" name="lesson-type" type="radio" value="ski"/>
                        <span>ski</span>
                    </label>
                    </p>
                    <p>
                    <label>
                        <input className="override-radio" name="lesson-type" type="radio" value="snowboard"/>
                        <span>snowboard</span>
                    </label>
                    </p>
                    <p>
                    <label>
                        <input className="override-radio" name="lesson-type" type="radio" value="sit_ski"/>
                        <span>sit ski</span>
                    </label>
                    </p>
                </div>
            );
        default :
            return (
                    <div>
                        <label >{label}</label>
                        {/* takes all properties and of input without writing out
                            ie onBlur={input.onBlur} onChange={input.onChange} etc
                        */}
                        <input {...input} type={type} style={{marginBottom: '5px' }} />
                        {/* <div className="red-text" style={{marginBottom: '20px'}}>
                            {touched && error}
                        </div> */}
                    </div>
            );
    }
    // return (
    //     <div>
    //         <label >{label}</label>
    //         {/* takes all properties and of input without writing out
    //             ie onBlur={input.onBlur} onChange={input.onChange} etc
    //         */}
    //         <input {...input} type={type} style={{marginBottom: '5px' }} />
    //         {/* <div className="red-text" style={{marginBottom: '20px'}}>
    //             {touched && error}
    //         </div> */}
    //     </div>
    // );
}