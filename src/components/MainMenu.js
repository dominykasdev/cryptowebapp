import React from "react";
import { Link } from 'react-router-dom';
import history from '../history';
import { toggleMenu } from '../actions';
import { connect } from "react-redux";


class MainMenu extends React.Component {
    // useEffect(()=>{

    // })

    // componentDidMount() {
    //     document.addEventListener('mousedown', this.handleClickOutside);
    // }

    // componentWillUnmount() {
    //     document.removeEventListener('mousedown', this.handleClickOutside);
    // }

    // handleClickOutside(e) {
    //     // if (this.node.contains(e.target)) {
    //     //     return;
    //     // }
    //     // if (this.props.menuStatus == true) {
    //     //     this.props.toggleMenu();
    //     // }

    //     // console.log(this.node.contains(e.target));
    // }

    mainMenuOptions() {
        // console.log(this.props.path);
        if (this.props.loggedIn) {
            return (
                <div>
                    <Link to="/projects/crypto_app/" className={`link ${this.props.path == '/projects/crypto_app/' ? 'selected' : ''}`}>Home</Link>
                    <Link to="/projects/crypto_app/profile" className={`link ${this.props.path == '/projects/crypto_app/profile' ? 'selected' : ''}`}>Profile</Link>
                    <Link to="/projects/crypto_app/holdings" className={`link ${this.props.path == '/projects/crypto_app/holdings' ? 'selected' : ''}`}>Holdings</Link>
                    <Link to="/projects/crypto_app/chart" className={`link ${this.props.path == '/projects/crypto_app/chart' ? 'selected' : ''}`}>Chart</Link>
                </div>
            )
        } else {
            return (
                <p>Please login to access options.</p>
            )
        }
    }

    render() {
        // console.log(this.props);
        return (
            <div className={`fullscreen ${this.props.menuStatus ? 'visible' : 'hidden delay'}`} onClick={() => this.props.toggleMenu()}>
                <div className={`mainMenu animate ${this.props.menuStatus ? 'visible' : 'hidden'}`}>
                    <div className="col12">
                        <h2>Menu</h2>
                        <div className="closeBtn animate">&times;</div>
                        {this.mainMenuOptions()}
                    </div>

                </div>
            </div>
        )
    }

}

// const node = React.createRef();

const mapStateToProps = (state) => {
    return { menuStatus: state.menu.open, loggedIn: state.auth.isSignedIn, path: history.location.pathname }
}

export default connect(mapStateToProps, { toggleMenu })(MainMenu);