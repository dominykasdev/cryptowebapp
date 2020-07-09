// import { clearSubmitErrors } from "redux-form";

const validate = values => {
    const errors = {};
    if (!values.holding_type) {
        errors.holding_type = 'Required';
    }

    if (!values.holding_amount) {
        errors.holding_amount = 'Required';
    } else if (!/[-+]?\d+(\.\d+)?$/.test(values.holding_amount)) {
        errors.holding_amount = 'Invalid holding amount. Please input integer or float number.';
    }

    if (!values.invested) {
        errors.invested = 'Required';
    } else if (!/[-+]?\d+(\.\d+)?$/.test(values.invested)) {
        errors.invested = 'Invalid holding amount. Please input integer or float number.';
    }

    return errors;
}

export default validate;