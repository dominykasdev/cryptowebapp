import React from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form'
import { updateHolding, postHolding } from '../../actions';
import { connect } from 'react-redux';
import list from '../../data/cryptolist.json';
import validate from './validate';

class addHoldingForm extends React.Component {

    renderSymbolDropDown = ({ input, label }) => {
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
        const holdings = this.props.holdings;

        //check for exisitng holding type
        for (let i = 0; i < holdings.length; i++) {
            if (formValues.holding_type == holdings[i].crypto_symbol) {
                holdings[i].crypto_symbol = formValues.holding_type;
                holdings[i].crypto_holding = formValues.holding_amount;
                holdings[i].invested = formValues.invested;
                return holdings;
            }
        }

        // add new holding
        for (let i = 0; i < holdings.length; i++) {
            if (holdings[i].crypto_symbol == null) {
                holdings[i].crypto_symbol = formValues.holding_type;
                holdings[i].crypto_holding = formValues.holding_amount;
                holdings[i].invested = formValues.invested;
                return holdings;
            }
        }
    }

    onSubmit = (formValues) => {
        // console.log(this.concatHoldings(formValues));
        this.props.postHolding(formValues);
    };

    render() {
        return (
            <div className="mainContent">
                <h3>Fill the form in to add your holding.</h3>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="symbol" component={this.renderSymbolDropDown} label="Find your cryptocurrency" />
                    <Field name="amount" component={this.renderInput} label={`Enter the amount ${/*!this.props.form_data.holding_type ? this.props.form_data.holding_type : '...'*/''} you hold.`} />
                    <Field name="invested" component={this.renderInput} label={`How much have you invested${/*!this.props.form_data.holding_type ? this.props.form_data.holding_type : '...'*/''} (${this.props.currency})?`} />
                    <button className="button">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // let holding_type = state.form.addHoldingForm.holding_type ? 'true' : 'false'
    return { formData: getFormValues('addHoldingForm')(state), currency: state.user.currency, holdings: state.holdings }
}

addHoldingForm = reduxForm({ form: 'addHoldingForm', validate })(addHoldingForm);


export default connect(mapStateToProps, { updateHolding, postHolding })(addHoldingForm);