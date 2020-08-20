import React from 'react';
import { connect } from 'react-redux';
import { calculateProfit, calculateRevenue } from '../calculateHolding';

class UserStats extends React.Component {

    rateColor(value) {
        let rateClass = "";
        if (value > 0) {
            rateClass = "positiveRate";
        } else if (value === 0) {
            rateClass = "noRate";
        } else {
            rateClass = "negativeRate";
        }
        return rateClass;
    };

    calcTotals(crypto) {
        let totalInvested = 0;
        let totalValue = 0;
        let totalProfit = 0;

        crypto.map(item => {
            totalInvested += parseFloat(item.invested);
            totalValue += calculateRevenue(item.amount, parseFloat(item.quote[this.props.currency].price));
            totalProfit += calculateProfit(item.amount, item.quote[this.props.currency].price, item.invested);
        });

        return (
            <React.Fragment>
                <div className="inlineBlock center bold">Total invested: <span>${totalInvested.toFixed(3)}</span></div>
                <div className="inlineBlock center bold">Total value: <span>${totalValue.toFixed(3)}</span></div>
                <div className="inlineBlock center bold">Total profit: <span className={`${this.rateColor(totalProfit)}`}>${totalProfit.toFixed(3)}</span></div>
            </React.Fragment>
        )

    }

    render() {
        if (this.props.crypto.length) {
            return (<div className="userTotals">
                {this.calcTotals(this.props.crypto)}
            </div>
            );
        } else {
            return null
        }

    }
}

const mapStateToProps = (state) => {
    return { crypto: state.crypto, currency: state.user.currency }
}

export default connect(mapStateToProps, null)(UserStats);