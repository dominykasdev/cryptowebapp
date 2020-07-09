export default (state = {}, action) => {
    switch (action.type) {
        case "FETCH_USER_DATA":
            return action.payload
        case "POST_USER_DATA":
            return { ...state, [action.payload.id]: action.payload }
        case "REGISTER_USER":
            return { ...state, payload: action.payload }
        default:
            return state;
    }
}