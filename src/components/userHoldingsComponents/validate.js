// import { clearSubmitErrors } from "redux-form";

const validate = values => {
    const errors = {};
    if (!values.symbol) {
        errors.symbol = 'Required';
    }

    if (!values.amount) {
        errors.amount = 'Required';
    } else if (!/[+]?\d+(\.\d+)?$/.test(values.amount)) {
        errors.amount = 'Invalid holding amount. Please input a postive integer or decimal number.';
    }

    if (!values.invested) {
        errors.invested = 'Required';
    } else if (!/[+]?\d+(\.\d+)?$/.test(values.invested)) {
        errors.invested = 'Invalid holding amount. Please input positive integer or decimal number.';
    }

    return errors;
}

export default validate;