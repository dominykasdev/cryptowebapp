import React from "react";
import { connect } from "react-redux";
import { signIn, signOut, fetchUserData, registerUser } from "../actions";
import { clientId } from '../apis/apiKeys.js';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId:
                        clientId,
                    scope: "email"
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });

    }

    componentDidUpdate(prevProps) {
        
        if (this.props.isSignedIn && !this.props.userData.hasOwnProperty('id') && this.props.userData !== '' && this.props.id !== undefined && this.props.isSignedIn !== prevProps.isSignedIn) {
            this.props.fetchUserData(this.props.id);    // fetch user data
        } else if (this.props.userData.holdings.length == 0 && this.props.isSignedIn) { // if no id found, register user
            this.props.registerUser(this.props.id);
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"></i>Sign In with Google
                </button>
            );
        }
    }

    render() {
        return <div className="inlineBlock right login">{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn, id: state.auth.userId, userData: state.user };
};

export default connect(mapStateToProps, { signIn, signOut, fetchUserData, registerUser })(GoogleAuth);
