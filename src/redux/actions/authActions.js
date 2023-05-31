import { authTypes, userTypes } from "../type/authTypes";
import { getUserToken, setUserToken } from "../../helpers/setGetToken";
import {
  fetchRequest,
  removeRequestToken,
  setRequestToken,
} from "../../helpers/fetchRequest";

export const checkUserSession = () => async (dispatch) => {
  const token = getUserToken();

  try {
    setRequestToken(token);
    const resp = await fetchRequest("/relogin");
    const dataToken = resp.data.data;

    dispatch({ type: authTypes.authUpdateToken, payload: dataToken });

    setUserToken(dataToken.tokenInfo.token);
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: authTypes.authCheckingSession, payload: false });
  }
};

export const startLoginUser = (email, password) => async (dispatch) => {
  dispatch({ type: authTypes.authLoading });

  try {
    removeRequestToken();

    const response = await fetchRequest("/login", "POST", {
      email,
      password,
    });

    const userData = response.data.data;

    dispatch(login(userData));

    setUserToken(userData.tokenInfo.token);
  } catch (error) {
    dispatch({
      type: authTypes.authSetError,
      payload:
        typeof error.response?.data.errores === "string"
          ? error.response.data.errores
          : "Ocurrio un error inesperado, por favor intentalo de nuevo más tarde",
    });
  }
};

export const clearError = () => ({
  type: authTypes.authRemoveError,
});

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userPermissions");

  dispatch({
    type: authTypes.authLogout,
  });
};

export const updateUserImage = (fileName) => ({
  type: userTypes.updateImageUser,
  payload: fileName,
});

export const updateEmpresaImage = (fileName) => ({
  type: userTypes.updateEmpresaImage,
  payload: fileName,
});

export const getUsersDetails = (data) => async (dispatch) => {
  try {
    const response = await fetchRequest(
      `/users/get-user-detail/${data}`,
      "GET"
    );

    const userData = response.data.data;

    dispatch({ type: userTypes.getDetailUsers, payload: userData });
  } catch (error) {
    dispatch({
      type: authTypes.authSetError,
      payload:
        typeof error.response?.data.errores === "string"
          ? error.response.data.errores
          : "Ocurrio un error inesperado, por favor intentalo de nuevo más tarde",
    });
  }
};

export const updateUsersDetails = (data, id) => async (dispatch) => {
  try {
    await fetchRequest(`/users/update-user-detail/${id}`, "PUT", data);

    dispatch({ type: userTypes.updateDetailUsers, payload: data });
  } catch (error) {
    dispatch({
      type: authTypes.authSetError,
      payload:
        typeof error.response?.data.errores === "string"
          ? error.response.data.errores
          : "Ocurrio un error inesperado, por favor intentalo de nuevo más tarde",
    });
  }
};

export const getBusinesDetails = (data) => async (dispatch) => {
  try {
    const response = await fetchRequest(`/users/get-business/${data}`, "GET");

    const userData = response.data.data;

    dispatch({ type: userTypes.getBusinesUsers, payload: userData.response });
  } catch (error) {
    console.log(error);
    dispatch({
      type: authTypes.authSetError,
      payload:
        typeof error.response?.data.errores === "string"
          ? error.response.data.errores
          : "Ocurrio un error inesperado, por favor intentalo de nuevo más tarde",
    });
  }
};

export const updateBusinessDetails =
  (data, id, idBusiness) => async (dispatch) => {
    try {
      await fetchRequest(
        `/users/update-business-detail/${id}/${idBusiness}`,
        "PUT",
        data
      );

      dispatch({ type: userTypes.updateDetailBusines, payload: data });
    } catch (error) {
      dispatch({
        type: authTypes.authSetError,
        payload:
          typeof error.response?.data.errores === "string"
            ? error.response.data.errores
            : "Ocurrio un error inesperado, por favor intentalo de nuevo más tarde",
      });
    }
  };

/* TODO: Hacer la limpieza de los datos al cambiar de contraseña */
export const setTempDatRegister = (data) => ({
  type: authTypes.authRegister,
  payload: data,
});

export const removeTempDatRegister = () => ({
  type: authTypes.authRemoveRegister,
});

export const login = (user) => ({
  type: authTypes.authLogin,
  payload: user,
});

export const updateTemporalPassword = () => ({
  type: authTypes.authUpdateTempPass,
});

export const updateMemorandoLogin = (memorandoID) => ({
  type: userTypes.updateMemorandoLogin,
  payload: { id: memorandoID },
});

export const setDarkMode = () => async (dispatch, getState) => {
  const {
    user: { opciones, usuario },
  } = getState().auth;
  const newValue = opciones?.temaApp === "Claro" ? "Oscuro" : "Claro";

  window.localStorage.setItem("theme_app", newValue);

  dispatch({
    type: userTypes.setDarkMode,
    payload: newValue,
  });

  const token = getUserToken();

  setRequestToken(token);
  await fetchRequest(
    "users/actualizar_tema_usuario/" + usuario.idUsuario,
    "POST",
    {
      temaApp: newValue,
    }
  );
};
