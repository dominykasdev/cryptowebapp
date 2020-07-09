import React from 'react';
// import { Field, reduxForm } from 'redux-form'
import { patchUserData } from '../../actions';
import { connect } from 'react-redux';
import UserForm from './userForm';

class userProfile extends React.Component {
    componentDidMount() {

    }

    onSubmit = (formValues) => {
        this.props.patchUserData(formValues, 'update_profile');
    };

    render() {
        console.log(this.props);
        return (
            <div className="mainContent">
                <h3>Hi, {this.props.name}! Would you like to change your profile details?</h3>
                <UserForm onSubmit={this.onSubmit} name={this.props.name} surname={this.props.surname} email={this.props.email} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 'name': state.user.name, 'surname': state.user.surname, 'email': state.user.email }
}

export default connect(mapStateToProps, { patchUserData })(userProfile);