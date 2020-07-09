import React from 'react';
import { connect } from 'react-redux';

class UserHoldingsList extends React.Component {
    renderList() {
        if (this.props.holdings !== undefined) {
            return this.props.holdings.map((value, index) => {
                if (value.crypto_symbol !== null) {
                    return (
                        <li className="listItem" key={index + 1}>
                            <div className="left inlineBlock">{value.crypto_symbol}</div>
                            <div className="inlineBlock">{value.crypto_holding}</div>
                            <div className="inlineBlock">{value.invested}</div>
                            <div className="right inlineBlock">Delete/Edit buttons</div>
                        </li>
                    );
                }
            }
            );
        } else {
            return <div>Loading...</div>
        }



    }


    render() {
        console.log(this.props);
        return (
            <div className="userHoldingsList">
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
    return { holdings: state.user.holdings, currency: state.user.currency }
}

export default connect(mapStateToProps, {})(UserHoldingsList);