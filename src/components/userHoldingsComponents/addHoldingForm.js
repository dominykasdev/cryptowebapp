import React from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form'
import { updateHolding, postHolding } from '../../actions';
import { connect } from 'react-redux';
import list from '../../data/cryptolist.json';
import validate from './validate';

class addHoldingForm extends React.Component {

    renderSymbolDropDown = ({ input, label, meta: { touched, error } }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <select {...input} required>
                    <option></option>
                    {list.map(value => {
                        return <option value={value.symbol} key={value.id}>{value.name}</option>
                    })}
                </select>
                {touched && error && <span className="error">{error}</span>}
            </div>
        )
    }

    renderInput = ({ input, label, meta: { touched, error } }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} type="number" step="0.00001" min="0" required />
                {touched && error && <span className="error">{error}</span>}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.postHolding(formValues);
    };

    render() {
        return (
            <div className="mainContent">
                <h3>Fill the form in to add your holding.</h3>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <Field name="symbol" component={this.renderSymbolDropDown} label="Find your cryptocurrency" />
                    <Field name="amount" component={this.renderInput} label="Enter the amount you hold." />
                    <Field name="invested" component={this.renderInput} label={`How much have you invested (${this.props.currency})?`} />
                    <button className="button">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { formData: getFormValues('addHoldingForm')(state), currency: state.user.currency, holdings: state.holdings }
}

addHoldingForm = reduxForm({ form: 'addHoldingForm', validate })(addHoldingForm);


export default connect(mapStateToProps, { updateHolding, postHolding })(addHoldingForm);