export default (state = {}, action) => {
    switch (action.type) {
        case "FETCH_HOLDINGS":
            return action.payload
        case "POST_HOLDING":
            return state
        case "UPDATE_HOLDING":
            return { ...state, [action.payload.id]: action.payload }
        case "DELETE_HOLDING":
            return []
        case "DELETE_HOLDINGS":
            return []
        default:
            return state;
    }
}