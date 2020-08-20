import cryptoAppApi from "../apis/cryptoAppApi";
import { SIGN_IN, SIGN_OUT, TOGGLE_MENU, TOGGLE_MODAL, FETCH_CRYPTO, FETCH_USER, UPDATE_USER, REGISTER_USER, DELETE_USER, FETCH_HOLDINGS, POST_HOLDING, UPDATE_HOLDING, DELETE_HOLDING, DELETE_HOLDINGS } from "./type";
import history from '../history';

export const fetchCryptoData = (symbols, currency) => async (dispatch, getState) => {
  const livePath = "/realtime_data/";
  const placeholderPath = "/projects/api/displayDataPlaceholder.php";
  let urlPath = '';

  symbols == undefined ? urlPath = placeholderPath : urlPath = livePath;

  const response = await cryptoAppApi.get(
    urlPath + "?symbol=" + symbols + '&convert=' + currency
  );

  let cryptoArray = [];
  // Convert response data to array
  for (var key in response.data.data) {
    if (response.data.data.hasOwnProperty(key)) {
      cryptoArray.push(response.data.data[key]);
    }
  }

  // Merge holdings amounts with crypto data
  const holdings = getState().holdings;
  if (holdings.length) {
    cryptoArray.map((item, index) => {
      for (let i = 0; i < holdings.length; i++) {
        if (item.symbol == holdings[i].symbol) {
          return (
            item.amount = holdings[i].amount,
            item.invested = holdings[i].invested
          );
        }
      }
    });
  }

  dispatch({ type: FETCH_CRYPTO, payload: cryptoArray });
};

export const fetchUser = () => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await cryptoAppApi.get(
    "/user/?id=" + userId
  );
  console.log(response.data);
  // let results = { holdings: [] };
  // let i = 0;
  // Object.keys(response.data).forEach((key, index) => {
  //   if (key.indexOf('crypto_symbol_0') > -1 || key.indexOf('crypto_holding_0') > -1 || key.indexOf('invested_0') > -1) {
  //     i = key.slice(-1);
  //     results.holdings[i] = { ...results.holdings[i], [key.substring(0, key.length - 3)]: response.data[key] }
  //   } else {
  //     results[key] = response.data[key];
  //   }
  // });
  // console.log(results);

  // if (response.data == undefined) {
  //   response.data = [];
  // }

  dispatch({ type: FETCH_USER, payload: response.data });
}

export const updateUser = (formValues, action) => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await cryptoAppApi.patch(
    "/user/?id=" + userId, { 'form_values': formValues, 'action': action }
  );
  console.log(response);

  dispatch({ type: UPDATE_USER, payload: response });
}

export const registerUser = () => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await cryptoAppApi.post(
    "/user/?id=" + userId, { 'action': 'register' }
  ).then((e) => {
    console.log(e);
  }).catch((error) => {
    console.log(error.response);
  });
  console.log(response);

  dispatch({ type: REGISTER_USER, payload: response });
}

export const fetchHoldings = () => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await cryptoAppApi.get(
    "/holdings/?id=" + userId
  ).catch((error) => {
    console.log(error.response);
  });

  dispatch({ type: FETCH_HOLDINGS, payload: response.data });
}

export const postHolding = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await cryptoAppApi.post(
    "/holdings/?id=" + userId, { "formValues": formValues }
  ).then((e) => {
    dispatch(fetchHoldings());
  }).catch((error) => {
    console.log(error.response);
  });

  dispatch({ type: POST_HOLDING, payload: response });
  history.push("/projects/crypto_app/holdings");
}

export const updateHolding = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await cryptoAppApi.patch(
    "/holdings/?id=" + userId, { "formValues": formValues }
  ).then((e) => {
    dispatch(fetchHoldings());
  }).catch((error) => {
    console.log(error.response);
  });

  dispatch({ type: UPDATE_HOLDING, payload: response });
}

export const deleteHolding = (symbol) => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await cryptoAppApi.delete(
    "/holdings/?id=" + userId + "&symbol=" + symbol
  ).then((e) => {
    dispatch(fetchHoldings());
  }).catch((error) => {
    console.log(error.response);
  });

  dispatch({ type: DELETE_HOLDING, payload: response });
}

export const deleteHoldings = () => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await cryptoAppApi.delete(
    "/holdings/?id=" + userId, { 'action': 'delete_holdings' }
  ).then((e) => {
    console.log(e);
  }).catch((error) => {
    console.log(error.response);
  });
  console.log(response);

  dispatch({ type: DELETE_HOLDINGS, payload: response });
}

export const toggleMenu = (closed) => {
  return {
    type: TOGGLE_MENU,
    payload: closed
  }
};

export const toggleModal = (type, options) => {
  return {
    type: TOGGLE_MODAL,
    payload: { type, options }
  }
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
