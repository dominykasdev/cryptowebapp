export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_CRYPTO":
      return action.payload;
    default:
      return state;
  }
};
