import React from "react";
import { connect } from "react-redux";
import { signIn, signOut, fetchUser, registerUser, fetchHoldings } from "../actions";
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

        // if (this.props.isSignedIn && !this.props.userData.hasOwnProperty('id') && this.props.userData !== '' && this.props.id !== undefined && this.props.isSignedIn !== prevProps.isSignedIn) {
        if (this.props.isSignedIn && !this.props.userData.hasOwnProperty('id') && this.props.userData !== '' && this.props.isSignedIn !== prevProps.isSignedIn) {
            this.props.fetchUser();    // fetch user data
            this.props.fetchHoldings();
        } else if (Array.isArray(this.props.holdings) && this.props.userData == "" && this.props.isSignedIn) {
            // if (this.props.holdings.length == 0) {
            this.props.registerUser(this.props.id);  // if no id found, register user
            // }
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
    return { isSignedIn: state.auth.isSignedIn, id: state.auth.userId, userData: state.user, holdings: state.holdings };
};

export default connect(mapStateToProps, { signIn, signOut, fetchUser, registerUser, fetchHoldings })(GoogleAuth);
