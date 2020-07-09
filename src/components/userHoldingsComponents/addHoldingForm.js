import React from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form'
import { patchUserData } from '../../actions';
import { connect } from 'react-redux';
import list from '../../data/cryptolist.json';
import validate from './validate';

class addHoldingForm extends React.Component {

    renderHoldingType = ({ input, label }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <select {...input}>
                    <option></option>
                    {list.map(value => {
                        return <option value={value.symbol} key={value.id}>{value.name}</option>
                    })}
                </select>
            </div>

        )
    }

    renderInput = ({ input, label, meta: { touched, error } }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} />
                {touched && error && <span className="error">{error}</span>}
            </div>

        )
    }

    concatHoldings = (formValues) => {
        const userData = this.props.userData;

        //check for exisitng holding type
        for (let i = 0; i < userData.length; i++) {
            if (formValues.holding_type == userData[i].crypto_symbol) {
                userData[i].crypto_symbol = formValues.holding_type;
                userData[i].crypto_holding = formValues.holding_amount;
                userData[i].invested = formValues.invested;
                return userData;
            }
        }

        // add new holding
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].crypto_symbol == null) {
                userData[i].crypto_symbol = formValues.holding_type;
                userData[i].crypto_holding = formValues.holding_amount;
                userData[i].invested = formValues.invested;
                return userData;
            }
        }
    }

    onSubmit = (formValues) => {
        // console.log(this.concatHoldings(formValues));
        this.props.patchUserData(this.concatHoldings(formValues), 'update_holdings');
    };

    render() {
        return (
            <div className="mainContent">
                <h3>Fill the form in to add your holding.</h3>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="holding_type" component={this.renderHoldingType} label="Find your cryptocurrency" />
                    <Field name="holding_amount" component={this.renderInput} label={`Enter the amount ${/*!this.props.form_data.holding_type ? this.props.form_data.holding_type : '...'*/''} you hold.`} />
                    <Field name="invested" component={this.renderInput} label={`How much have you invested${/*!this.props.form_data.holding_type ? this.props.form_data.holding_type : '...'*/''} (${this.props.currency})?`} />
                    <button className="button">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // let holding_type = state.form.addHoldingForm.holding_type ? 'true' : 'false'
    return { formData: getFormValues('addHoldingForm')(state), currency: state.user.currency, userData: state.user.holdings }
}

addHoldingForm = reduxForm({ form: 'addHoldingForm', validate })(addHoldingForm);


export default connect(mapStateToProps, { patchUserData })(addHoldingForm);