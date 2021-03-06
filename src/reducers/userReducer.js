export default (state = {}, action) => {
    switch (action.type) {
        case "FETCH_USER":
            return action.payload
        case "POST_USER":
            return { ...state, [action.payload.id]: action.payload }
        case "REGISTER_USER":
            return { ...state, payload: action.payload }
        case "DELETE_USER":
            return { ...state, payload: action.payload }
        default:
            return state;
    }
}