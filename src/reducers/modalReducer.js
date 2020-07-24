export default (state = { visible: false }, action) => {
    switch (action.type) {
        case "TOGGLE_MODAL":
            return { ...state, visible: !state.visible }
        default:
            return state;
    }
}