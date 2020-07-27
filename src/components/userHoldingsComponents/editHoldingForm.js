import React from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form'
import { updateHolding, toggleModal } from '../../actions';
import { connect } from 'react-redux';
// import list from '../../data/cryptolist.json';
import validate from './validate';

let editHoldingForm = props => {
    const { handleSubmit, load } = props;
    const renderFixedInput = ({ input, label }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} value={props.modalSymbol} readOnly />
            </div>
        )
    }

    const renderInput = ({ input, label, meta: { touched, error } }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} type="number" />
                {touched && error && <span className="error">{error}</span>}
            </div>
        )
    }

    const onSubmit = (formValues) => {
        props.updateHolding(formValues);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field name="symbol" component={renderFixedInput} label="Find your cryptocurrency" />
            <Field name="amount" component={renderInput} label="Enter new amount you hold." />
            <Field name="invested" component={renderInput} label={`New amount of invested${/*!this.props.form_data.holding_type ? this.props.form_data.holding_type : '...'*/''} (${props.currency})?`} />
            <button className="button inlineBlock">Submit</button>
            <button className="button inlineBlock" onClick={() => props.toggleModal()}>Cancel</button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return { formData: getFormValues('editHoldingForm')(state), currency: state.user.currency, holdings: state.holdings, toggleModal: state.modal.visible, modalSymbol: state.modal.options }
}

editHoldingForm = reduxForm({ form: 'editHoldingForm', validate })(editHoldingForm);


export default connect(mapStateToProps, { updateHolding, toggleModal })(editHoldingForm);