import React from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form'
import { updateHolding, toggleModal } from '../../actions';
import { connect } from 'react-redux';
import validate from './validate';

/*let editHoldingForm = props => {
    const { handleSubmit, load } = props;

    const renderInput = ({ input, keyName, label, meta: { touched, error } }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} type="number" min="0" key={keyName} required />
                {touched && error && <span className="error">{error}</span>}
            </div>
        )
    }

    const onSubmit = (formValues) => {
        props.updateHolding({ ...formValues, symbol: props.modalSymbol });
        props.toggleModal()
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Field name="amount" component={renderInput} keyName="amountKey" label="Enter new amount you hold." />
            <Field name="invested" component={renderInput} keyName="investedKey" label={`New amount of invested in ${props.currency}`} />
            <button className="button inlineBlock">Submit</button>
            <button className="button inlineBlock" onClick={() => props.toggleModal()}>Cancel</button>
        </form>
    )
}*/

class editHoldingForm extends React.Component {
    constructor(props) {
        super(props);
        const { handleSubmit, load } = props
    }

    renderInput = ({ input, keyName, label, meta: { touched, error } }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} type="number" step="0.00001" min="0" key={keyName} required />
                {touched && error && <span className="error">{error}</span>}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.updateHolding({ ...formValues, symbol: this.props.modalSymbol });
        this.props.toggleModal();
    };
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="amount" component={this.renderInput} keyName="amountKey" label="Enter new amount you hold." />
                <Field name="invested" component={this.renderInput} keyName="investedKey" label={`New amount of invested in ${this.props.currency}`} />
                <button className="button inlineBlock">Submit</button>
                <button className="button inlineBlock" onClick={() => this.props.toggleModal()}>Cancel</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return { formData: getFormValues('editHoldingForm')(state), currency: state.user.currency, holdings: state.holdings, toggleModal: state.modal.visible, modalSymbol: state.modal.options }
}

editHoldingForm = reduxForm({ form: 'editHoldingForm', validate })(editHoldingForm);

export default connect(mapStateToProps, { updateHolding, toggleModal })(editHoldingForm);