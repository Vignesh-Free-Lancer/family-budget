import axios from "axios";
import {
  EXPENSE_CURRENT_MONTH_GET_FAILURE,
  EXPENSE_CURRENT_MONTH_GET_REQUEST,
  EXPENSE_CURRENT_MONTH_GET_SUCCESS,
  EXTRAINCOME_CURRENT_MONTH_GET_FAILURE,
  EXTRAINCOME_CURRENT_MONTH_GET_REQUEST,
  EXTRAINCOME_CURRENT_MONTH_GET_SUCCESS,
  LAST_THREE_MONTH_DASHBOARD_DETAILS_FAILURE,
  LAST_THREE_MONTH_DASHBOARD_DETAILS_REQUEST,
  LAST_THREE_MONTH_DASHBOARD_DETAILS_SUCCESS,
  SALARY_CURRENT_MONTH_GET_FAILURE,
  SALARY_CURRENT_MONTH_GET_REQUEST,
  SALARY_CURRENT_MONTH_GET_SUCCESS,
} from "../constants/DashboardConstants";

// Last Three Month Income Action
export const lastThreeMonthIncomeAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LAST_THREE_MONTH_DASHBOARD_DETAILS_REQUEST });

    const {
      userLogin: { userInfos },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfos.token}`,
      },
    };

    const { data } = await axios.get(
      "/api/dashboard/three-month/dashboard/details",
      config
    );

    dispatch({
      type: LAST_THREE_MONTH_DASHBOARD_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LAST_THREE_MONTH_DASHBOARD_DETAILS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Salary Current Month Action
export const salaryCurrentMonthAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SALARY_CURRENT_MONTH_GET_REQUEST });

    const {
      userLogin: { userInfos },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfos.token}`,
      },
    };

    const { data } = await axios.get(
      "/api/dashboard/salary/current-month",
      config
    );

    dispatch({ type: SALARY_CURRENT_MONTH_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SALARY_CURRENT_MONTH_GET_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Extra Income Current Month Action
export const extraIncomeCurrentMonthAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: EXTRAINCOME_CURRENT_MONTH_GET_REQUEST });

      const {
        userLogin: { userInfos },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfos.token}`,
        },
      };

      const { data } = await axios.get(
        "/api/dashboard/extra-income/current-month",
        config
      );

      dispatch({
        type: EXTRAINCOME_CURRENT_MONTH_GET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EXTRAINCOME_CURRENT_MONTH_GET_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Expense Current Month Action
export const expenseCurrentMonthAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_CURRENT_MONTH_GET_REQUEST });

    const {
      userLogin: { userInfos },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfos.token}`,
      },
    };

    const { data } = await axios.get(
      "/api/dashboard/expense/current-month",
      config
    );

    dispatch({ type: EXPENSE_CURRENT_MONTH_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXPENSE_CURRENT_MONTH_GET_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
