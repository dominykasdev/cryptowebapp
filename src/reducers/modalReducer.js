import actions from "redux-form/lib/actions";

export default (state = { visible: false, type: null, options: null }, action) => {
    switch (action.type) {
        case "TOGGLE_MODAL":
            return { ...state, visible: !state.visible, type: action.payload.type, options: action.payload.options }
        default:
            return state;
    }
}