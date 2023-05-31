import { fetchRequest, setRequestToken } from "../../helpers/fetchRequest";
import { getUserToken } from "../../helpers/setGetToken";
import {
  CREATE_RESERVE_LIST,
  DELETE_RESERVE_LIST,
  ERROR_RESERVE,
  GET_RESERVE_LIST,
  LOADING_RESERVE,
  UPDATE_RESERVE_LIST,
} from "../type/reserveType";

export const getReserve = () => async (dispatch) => {
  const token = getUserToken();

  dispatch({ type: LOADING_RESERVE, payload: true });

  try {
    setRequestToken(token);
    const resp = await fetchRequest("/bookings");
    const data = resp.data.data;

    dispatch({ type: GET_RESERVE_LIST, payload: data.reserve });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_RESERVE, payload: error });
  }
};

export const createReserve = (newReserva) => async (dispatch) => {
  const token = getUserToken();

  dispatch({ type: LOADING_RESERVE, payload: true });

  try {
    setRequestToken(token);
    const resp = await fetchRequest("/bookings", "POST", newReserva);
    const data = resp.data.data;

    dispatch({ type: CREATE_RESERVE_LIST, payload: data.reserve });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_RESERVE, payload: error });
  }
};

export const updateReserve = (newReserva, codigo) => async (dispatch) => {
  const token = getUserToken();

  dispatch({ type: LOADING_RESERVE, payload: true });

  try {
    setRequestToken(token);
    const resp = await fetchRequest(`/bookings/${codigo}`, "PUT", newReserva);
    const data = resp.data.data;

    dispatch({ type: UPDATE_RESERVE_LIST, payload: data.reservacion });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_RESERVE, payload: error });
  }
};

export const deleteReserve = (codigo) => async (dispatch) => {
  const token = getUserToken();

  dispatch({ type: LOADING_RESERVE, payload: true });

  try {
    setRequestToken(token);

    await fetchRequest(`/bookings/${codigo}`, "DELETE");

    dispatch({ type: DELETE_RESERVE_LIST, payload: codigo });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_RESERVE, payload: error });
  }
};
