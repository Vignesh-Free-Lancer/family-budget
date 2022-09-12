import axios from "axios";
import {
  USER_ACCOUNTACTIVATION_FAILURE,
  USER_ACCOUNTACTIVATION_REQUEST,
  USER_ACCOUNTACTIVATION_SUCCESS,
  USER_DELETE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_EMAILRESET_FAILURE,
  USER_EMAILRESET_REQUEST,
  USER_EMAILRESET_SUCCESS,
  USER_EMAIL_ACTIVATE_FAILURE,
  USER_EMAIL_ACTIVATE_REQUEST,
  USER_EMAIL_ACTIVATE_SUCCESS,
  USER_FORGOTPASSWORD_FAILURE,
  USER_FORGOTPASSWORD_REQUEST,
  USER_FORGOTPASSWORD_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PASSWORDRESET_FAILURE,
  USER_PASSWORDRESET_REQUEST,
  USER_PASSWORDRESET_SUCCESS,
  USER_REGISTRAION_FAILURE,
  USER_REGISTRAION_REQUEST,
  USER_REGISTRAION_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/UserConstants";

// User Registration Action
export const UserRegistrationAction =
  (username, email, password, gender, dob, pic, isActive) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTRAION_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/registration",
        { username, email, password, gender, dob, pic, isActive },
        config
      );

      dispatch({ type: USER_REGISTRAION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_REGISTRAION_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// User Account Activation Confirmation
export const UserAccountConfirmationAction = (token) => async (dispatch) => {
  try {
    dispatch({ type: USER_EMAIL_ACTIVATE_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.get(
      `/account/confirmation/success/${token}`,
      config
    );

    dispatch({ type: USER_EMAIL_ACTIVATE_SUCCESS, payload: data });
    localStorage.setItem("userInfos", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_EMAIL_ACTIVATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User Login Action
export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfos", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User Logout Action
export const userLogoutAction = () => async (dispatch) => {
  localStorage.removeItem("userInfos");
  dispatch({ type: USER_LOGOUT });
};

// User Forgot Password Action
export const userForgotPasswordAction =
  (userEmail, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: USER_FORGOTPASSWORD_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/user/forgot/password/${userEmail}`,
        { newPassword },
        config
      );

      dispatch({ type: USER_FORGOTPASSWORD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_FORGOTPASSWORD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// User Account Activation Action
export const userAccountActivationAction = (userEmail) => async (dispatch) => {
  try {
    dispatch({ type: USER_ACCOUNTACTIVATION_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/user/account/activation/${userEmail}`,
      config
    );

    dispatch({ type: USER_ACCOUNTACTIVATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_ACCOUNTACTIVATION_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User Reset Password Action
export const userResetPasswordAction =
  (userId, oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: USER_PASSWORDRESET_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/user/reset/password/${userId}`,
        { oldPassword, newPassword },
        config
      );

      dispatch({ type: USER_PASSWORDRESET_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_PASSWORDRESET_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// User Reset Email Action
export const userResetEmailAction = (userId, userEmail) => async (dispatch) => {
  try {
    dispatch({ type: USER_EMAILRESET_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/user/reset/email/${userId}`,
      { userEmail },
      config
    );

    dispatch({ type: USER_EMAILRESET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_EMAILRESET_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User Multi Dispatch Reset Email Action
export const userTopLevelEmailAction =
  (userId, userEmail) => async (dispatch, getState) => {
    await dispatch(userResetEmailAction(userId, userEmail));

    const { userResetEmail } = getState();
    if (!userResetEmail.error) {
      dispatch(userLogoutAction());
    }
  };

// User Update Action
export const userUpdateAction =
  (userId, username, email, gender, dob, pic, isActive) => async (dispatch) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/user/profile/${userId}`,
        { username, email, gender, dob, pic, isActive },
        config
      );

      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// User Delete Action
export const userDeleteAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/user/profile/remove/${userId}`,
      config
    );

    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User Multi Dispatch Delete Action
export const userTopLevelDeleteAction = (userId) => (dispatch) => {
  return Promise.all([
    dispatch(userDeleteAction(userId)),
    dispatch(userLogoutAction()),
  ]);
};

// User List Action
export const userListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfos },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfos.token}`,
      },
    };

    const { data } = await axios.get("/api/user/list", config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
