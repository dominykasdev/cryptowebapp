export default (state = {}, action) => {
    switch (action.type) {
        case "FETCH_HOLDINGS":
            return action.payload
        case "UPDATE_HOLDING":
            return { ...state, [action.payload.id]: action.payload }
        case "DELETE_HOLDING":
            return { ...state, payload: action.payload }
        case "DELETE_HOLDINGS":
            return { ...state, payload: action.payload }
        default:
            return state;
    }
}