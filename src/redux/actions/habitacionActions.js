import { fetchRequest, setRequestToken } from "../../helpers/fetchRequest";
import { getUserToken } from "../../helpers/setGetToken";
import {
  CREATE_ROOM_LIST,
  DELETE_ROOM_LIST,
  ERROR_ROOM,
  GET_ROOM_LIST,
  LOADING_ROOM,
  UPDATE_ROOM_LIST,
} from "../type/roomType";

export const getRoom = () => async (dispatch) => {
  const token = getUserToken();

  dispatch({ type: LOADING_ROOM, payload: true });

  try {
    setRequestToken(token);
    const resp = await fetchRequest("/rooms");
    const data = resp.data.data;

    dispatch({ type: GET_ROOM_LIST, payload: data.habitaciones });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_ROOM, payload: error });
  }
};

export const createRoom = (data) => async (dispatch) => {
  const token = getUserToken();

  dispatch({ type: LOADING_ROOM, payload: true });

  try {
    setRequestToken(token);

    const response = await fetchRequest(`/rooms`, "POST", data);

    const { newRoom } = response.data.data;

    console.log(response.data.data);

    dispatch({ type: CREATE_ROOM_LIST, payload: newRoom });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_ROOM, payload: error });
  }
};

export const updateRoom = (data, codigo) => async (dispatch) => {
  const token = getUserToken();

  dispatch({ type: LOADING_ROOM, payload: true });

  try {
    setRequestToken(token);

    const response = await fetchRequest(`/rooms/${codigo}`, "PUT", data);

    const { newRoom } = response.data.data;

    dispatch({ type: UPDATE_ROOM_LIST, payload: newRoom });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_ROOM, payload: error });
  }
};

export const deleteRoom = (codigo) => async (dispatch) => {
  const token = getUserToken();

  dispatch({ type: LOADING_ROOM, payload: true });

  try {
    setRequestToken(token);

    await fetchRequest(`/rooms/${codigo}`, "DELETE");

    dispatch({ type: DELETE_ROOM_LIST, payload: codigo });
  } catch (error) {
    console.log(error);
    dispatch({ type: ERROR_ROOM, payload: error });
  }
};
