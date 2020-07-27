import React from 'react';
// import UserHoldingsForm from './userHoldingsForm';
import { Link } from 'react-router-dom';
import UserHoldingsList from './userHoldingsList';
import { connect } from 'react-redux';

class userHoldings extends React.Component {

    // onSubmit = (formValues) => {
    //     console.log(formValues);
    // };

    render() {
        return (
            <div className="mainContent">
                <Link to="/projects/crypto_app/holdings/add" className="button">Add holding</Link>
                <UserHoldingsList />
            </div>
        );
    }
}

export default connect(null, {})(userHoldings);