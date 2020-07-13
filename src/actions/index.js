import coinMarketCap from "../apis/coinMarketCap";
import { SIGN_IN, SIGN_OUT, FETCH_CRYPTO, FETCH_USER_DATA, PATCH_USER_DATA, REGISTER_USER, TOGGLE_MENU } from "./type";
import history from '../history';

export const fetchCryptoData = (symbols, currency) => async dispatch => {

  const livePath = "/projects/api_test/displayData.php";
  const placeholderPath = "/projects/api_test/displayDataPlaceholder.php";
  let urlPath = '';

  symbols == undefined ? urlPath = placeholderPath : urlPath = livePath;

  const response = await coinMarketCap.get(
    urlPath + "?symbol=" + symbols + '&convert=' + currency
  );
  // console.log(response);

  let cryptoArray = [];

  for (var key in response.data.data) {
    if (response.data.data.hasOwnProperty(key)) {
      cryptoArray.push(response.data.data[key]);
    }
  }

  dispatch({ type: FETCH_CRYPTO, payload: cryptoArray });
};

export const toggleMenu = (closed) => {
  return {
    type: TOGGLE_MENU,
    payload: closed
  }
};

export const fetchUserData = () => async (dispatch, getState) => {
  const path = "/projects/api_test/";
  const { userId } = getState().auth;

  const response = await coinMarketCap.get(
    path + "?id=" + userId
  );
  // console.log(response.data);
  let results = { holdings: [] };
  let i = 0;
  Object.keys(response.data).forEach((key, index) => {
    if (key.indexOf('crypto_symbol_0') > -1 || key.indexOf('crypto_holding_0') > -1 || key.indexOf('invested_0') > -1) {
      i = key.slice(-1);
      results.holdings[i] = { ...results.holdings[i], [key.substring(0, key.length - 3)]: response.data[key] }
    } else {
      results[key] = response.data[key];
    }
  });
  console.log(results);

  dispatch({ type: FETCH_USER_DATA, payload: results });
}

export const patchUserData = (formValues, action) => async (dispatch, getState) => {
  const path = "/projects/api_test/";
  const { userId } = getState().auth;
  console.log(formValues);
  const response = await coinMarketCap.patch(
    path, { 'id': userId, 'form_values': formValues, 'action': action }
  );

  console.log(response);

  dispatch({ type: PATCH_USER_DATA, payload: response });
  if (action == 'update_holdings') { history.push("/projects/crypto_app/holdings") };
}

export const registerUser = (userId) => async (dispatch, getState) => {
  const path = "/projects/api_test/";
  const { userId } = getState().auth;

  const response = await coinMarketCap.post(
    path, { 'id': userId, 'action': 'register' }
  ).then((e) => {
    console.log(e);
  }).catch((error) => {
    console.log(error.response);
  });
  console.log(response);

  dispatch({ type: REGISTER_USER, payload: response });
}

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};
