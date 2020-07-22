import React from 'react';
import { connect } from 'react-redux';
import { deleteHolding, deleteHoldings, updateHolding, fetchHoldings } from '../../actions';

class UserHoldingsList extends React.Component {

    renderDeleteAllButton() {
        if (this.props.holdings.length) {
            return (
                <button className="button deleteBtn" onClick={() => this.props.deleteHoldings()}>Delete all holdings</button>
            );
        }
    }

    renderList() {
        if (this.props.holdings.length) {
            return this.props.holdings.map((value, index) => {
                if (value.symbol !== null) {
                    return (
                        <li className="listItem" key={index + 1}>
                            <div className="left inlineBlock">{value.symbol}</div>
                            <div className="inlineBlock">{value.amount}</div>
                            <div className="inlineBlock">{value.invested}</div>
                            <div className="right inlineBlock"><button className="deleteBtn" onClick={() => this.props.deleteHolding(value.symbol)}>Delete</button></div>
                        </li >
                    );
                }
            }
            );
        } else {
            return <div>No holdings yet...</div>
        }
    }

    render() {
        console.log(this.props);
        return (
            <div className="userHoldingsList">
                {this.renderDeleteAllButton()}
                <ul className="list">
                    <li className="listItem listHeader" key="0">
                        <div className="left inlineBlock">Cryptocurrency</div>
                        <div className="inlineBlock">Holdings</div>
                        <div className="inlineBlock">Invested({this.props.currency})</div>
                        <div className="right inlineBlock">Options</div>
                    </li>
                    {this.renderList()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { holdings: state.holdings, currency: state.user.currency, isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { deleteHolding, deleteHoldings, fetchHoldings })(UserHoldingsList);