import {
  CREATE_RESERVE_LIST,
  DELETE_RESERVE_LIST,
  ERROR_RESERVE,
  GET_RESERVE_LIST,
  LOADING_RESERVE,
  UPDATE_RESERVE_LIST,
} from "../type/reserveType";

const initialState = {
  loading: false,
  error: "",
  bookings: [],
};

export const reserveReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING_RESERVE:
      return { ...state, loading: payload };

    case GET_RESERVE_LIST:
      return { ...state, bookings: payload };

    case CREATE_RESERVE_LIST:
      return { ...state, bookings: [payload, ...state.bookings] };

    case UPDATE_RESERVE_LIST:
      return {
        ...state,
        bookings: state.bookings.map((x) =>
          x.codigo === payload.codigo ? { ...payload } : x
        ),
      };

    case DELETE_RESERVE_LIST:
      return {
        ...state,
        bookings: state.bookings.filter((x) => x.codigo !== payload),
      };

    case ERROR_RESERVE:
      return { ...state, error: payload };

    default:
      return state;
  }
};
