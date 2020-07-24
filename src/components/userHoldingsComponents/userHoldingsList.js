import React from 'react';
import { connect } from 'react-redux';
import { deleteHolding, deleteHoldings, updateHolding, fetchHoldings, toggleModal } from '../../actions';
import Modal from '../Modal';

class UserHoldingsList extends React.Component {

    renderDeleteAllButton() {
        if (this.props.holdings.length) {
            return (
                <button className="button deleteBtn" onClick={() => this.props.toggleModal()}>Delete all holdings</button>
            );
        }
    }

    renderDeleteAllActions(e) {
        return (
            <React.Fragment>
                <button className="button deleteBtn inlineBlock" onClick={() => { this.props.deleteHoldings(); this.props.toggleModal(); }}>Delete all</button>
                <button className="button cancel" onClick={() => this.props.toggleModal()}>Cancel</button>
            </React.Fragment>
        );
    }

    renderModal() {
        if (this.props.modalVisible) {
            // switch (this.props.modalType) {
            //     case "deleteAll":
            return <Modal
                title="Delete all holdings"
                content="You are about to delete all of your holdings! Are you sure?"
                actions={this.renderDeleteAllActions()}
                visible={this.props.modalVisible}
                onDismiss={() => this.props.toggleModal()} />
            //     case "delete":
            //         return <Modal
            //             title="Delete holdings"
            //             content={`You are about to delete ${holding} ! Are you sure?`}
            //             actions={this.renderDeleteActions()}
            //             visible={this.props.modalVisible}
            //             onDismiss={() => this.props.toggleModal()} />
            //     case "edit":
            //         return <Modal
            //             title="Edit holding"
            //             content="Insert new"
            //             actions={this.renderEditActions()}
            //             visible={this.props.modalVisible}
            //             onDismiss={() => this.props.toggleModal()} />
            // }

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
                {this.renderModal()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { holdings: state.holdings, currency: state.user.currency, isSignedIn: state.auth.isSignedIn, modalVisible: state.modal.visible, modalType: null }
}

export default connect(mapStateToProps, { deleteHolding, deleteHoldings, fetchHoldings, toggleModal })(UserHoldingsList);