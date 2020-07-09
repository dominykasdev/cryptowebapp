import React from 'react';
import { Field, reduxForm } from 'redux-form'

class UserForm extends React.Component {
    renderInput({ input, label, placeholder }) {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} placeholder={placeholder}></input>
            </div>

        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };

    render() {

        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="name" component={this.renderInput} label="Name" placeholder={this.props.name} />
                <Field name="surname" component={this.renderInput} label="Surname" placeholder={this.props.surname} />
                <Field name="email" component={this.renderInput} label="Email" placeholder={this.props.email} />
                <button className="button">Submit</button>
            </form>
        )
    }
}

export default reduxForm({ form: 'updateProfile' })(UserForm);