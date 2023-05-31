import {
  CREATE_ROOM_LIST,
  DELETE_ROOM_LIST,
  ERROR_ROOM,
  GET_ROOM_LIST,
  LOADING_ROOM,
  UPDATE_ROOM_LIST,
} from "../type/roomType";

const initialState = {
  loading: false,
  error: "",
  room: [],
};

export const roomReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_ROOM:
      return { ...state, loading: payload };

    case GET_ROOM_LIST:
      return { ...state, room: payload };

    case DELETE_ROOM_LIST:
      return { ...state, room: state.room.filter((x) => x.codigo !== payload) };

    case CREATE_ROOM_LIST:
      return { ...state, room: [payload, ...state.room] };

    case UPDATE_ROOM_LIST:
      return {
        ...state,
        room: state.room.map((x) =>
          x.codigo === payload.codigo ? { ...payload } : x
        ),
      };

    case ERROR_ROOM:
      return { ...state, error: payload };

    default:
      return state;
  }
};
