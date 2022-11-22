import axios from "axios";
import {
  EXPENSE_DETAIL_CREATE_FAILURE,
  EXPENSE_DETAIL_CREATE_REQUEST,
  EXPENSE_DETAIL_CREATE_SUCCESS,
  EXPENSE_DETAIL_DELETE_FAILURE,
  EXPENSE_DETAIL_DELETE_REQUEST,
  EXPENSE_DETAIL_DELETE_SUCCESS,
  EXPENSE_DETAIL_IMPORT_FAILURE,
  EXPENSE_DETAIL_IMPORT_REQUEST,
  EXPENSE_DETAIL_IMPORT_SUCCESS,
  EXPENSE_DETAIL_LIST_FAILURE,
  EXPENSE_DETAIL_LIST_REQUEST,
  EXPENSE_DETAIL_LIST_SUCCESS,
  EXPENSE_DETAIL_UPDATE_FAILURE,
  EXPENSE_DETAIL_UPDATE_REQUEST,
  EXPENSE_DETAIL_UPDATE_SUCCESS,
} from "../constants/ExpenseConstants";

// Expense Create Action
export const expenseCreateAction =
  (
    month,
    year,
    particular,
    particularType,
    estimatedCost,
    actualCost,
    paymentType,
    paymentBank,
    paymentDate,
    description
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EXPENSE_DETAIL_CREATE_REQUEST });

      const {
        userLogin: { userInfos },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfos.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/expense/add",
        {
          month,
          year,
          particular,
          particularType,
          estimatedCost,
          actualCost,
          paymentType,
          paymentBank,
          paymentDate,
          description,
        },
        config
      );

      dispatch({ type: EXPENSE_DETAIL_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EXPENSE_DETAIL_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Expense Import Action
export const expenseImportAction =
  (month, year) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXPENSE_DETAIL_IMPORT_REQUEST });

      const previousMonth = month - 1 === 0 ? 12 : month - 1;
      const previousYear = previousMonth === 12 ? year - 1 : year;

      month = previousMonth;
      year = previousYear;

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
        `/api/expense/import/${month}/${year}`,
        config
      );

      dispatch({ type: EXPENSE_DETAIL_IMPORT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EXPENSE_DETAIL_IMPORT_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Expense List Action
export const expenseListAction =
  (month, year) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXPENSE_DETAIL_LIST_REQUEST });

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
        `/api/expense/lists/${month}/${year}`,
        config
      );

      dispatch({ type: EXPENSE_DETAIL_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EXPENSE_DETAIL_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Expense Update Action
export const expenseUpdateAction =
  (
    expenseId,
    month,
    year,
    particular,
    particularType,
    estimatedCost,
    actualCost,
    paymentType,
    paymentBank,
    paymentDate,
    description
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EXPENSE_DETAIL_UPDATE_REQUEST });

      const {
        userLogin: { userInfos },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfos.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/expense/${expenseId}`,
        {
          month,
          year,
          particular,
          particularType,
          estimatedCost,
          actualCost,
          paymentType,
          paymentBank,
          paymentDate,
          description,
        },
        config
      );

      dispatch({ type: EXPENSE_DETAIL_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EXPENSE_DETAIL_UPDATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Expense Delete Action
export const expenseDeleteAction =
  (expenseId) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXPENSE_DETAIL_DELETE_REQUEST });

      const {
        userLogin: { userInfos },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfos.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/expense/remove/${expenseId}`,
        {},
        config
      );

      dispatch({ type: EXPENSE_DETAIL_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EXPENSE_DETAIL_DELETE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
