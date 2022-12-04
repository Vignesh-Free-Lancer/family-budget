import axios from "axios";
import {
  GROCERY_DETAIL_CREATE_FAILURE,
  GROCERY_DETAIL_CREATE_REQUEST,
  GROCERY_DETAIL_CREATE_SUCCESS,
  GROCERY_DETAIL_DELETE_FAILURE,
  GROCERY_DETAIL_DELETE_REQUEST,
  GROCERY_DETAIL_DELETE_SUCCESS,
  GROCERY_DETAIL_IMPORT_FAILURE,
  GROCERY_DETAIL_IMPORT_REQUEST,
  GROCERY_DETAIL_IMPORT_SUCCESS,
  GROCERY_DETAIL_LIST_FAILURE,
  GROCERY_DETAIL_LIST_REQUEST,
  GROCERY_DETAIL_LIST_SUCCESS,
  GROCERY_DETAIL_UPDATE_FAILURE,
  GROCERY_DETAIL_UPDATE_REQUEST,
  GROCERY_DETAIL_UPDATE_SUCCESS,
  GROCERY_REPORT_CREATE_FAILURE,
  GROCERY_REPORT_CREATE_REQUEST,
  GROCERY_REPORT_CREATE_SUCCESS,
} from "../constants/GroceryConstants";

// Grocery Create Action
export const groceryCreateAction =
  (month, year, particulars, qty, unitPrice, totalPrice) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GROCERY_DETAIL_CREATE_REQUEST });

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
        "/api/grocery/add",
        {
          month,
          year,
          particulars,
          qty,
          unitPrice,
          totalPrice,
        },
        config
      );

      dispatch({ type: GROCERY_DETAIL_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GROCERY_DETAIL_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Grocery Import Action
export const groceryImportAction =
  (month, year) => async (dispatch, getState) => {
    try {
      dispatch({ type: GROCERY_DETAIL_IMPORT_REQUEST });

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
        `/api/grocery/import/${month}/${year}`,
        config
      );

      dispatch({ type: GROCERY_DETAIL_IMPORT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GROCERY_DETAIL_IMPORT_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Grocery List Action
export const groceryListAction =
  (month, year) => async (dispatch, getState) => {
    try {
      dispatch({ type: GROCERY_DETAIL_LIST_REQUEST });

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
        `/api/grocery/lists/${month}/${year}`,
        config
      );

      dispatch({ type: GROCERY_DETAIL_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GROCERY_DETAIL_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Grocery Update Action
export const groceryUpdateAction =
  (groceryId, month, year, particulars, qty, unitPrice, totalPrice) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GROCERY_DETAIL_UPDATE_REQUEST });

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
        `/api/grocery/${groceryId}`,
        {
          month,
          year,
          particulars,
          qty,
          unitPrice,
          totalPrice,
        },
        config
      );

      dispatch({ type: GROCERY_DETAIL_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GROCERY_DETAIL_UPDATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Grocery Delete Action
export const groceryDeleteAction =
  (groceryId) => async (dispatch, getState) => {
    try {
      dispatch({ type: GROCERY_DETAIL_DELETE_REQUEST });

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
        `/api/grocery/remove/${groceryId}`,
        {},
        config
      );

      dispatch({ type: GROCERY_DETAIL_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GROCERY_DETAIL_DELETE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Grocery Report List Action
export const groceryReportListAction =
  (reportType, month, year) => async (dispatch, getState) => {
    try {
      dispatch({ type: GROCERY_REPORT_CREATE_REQUEST });

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
        `/api/grocery/report/${reportType}/${month}/${year}`,
        config
      );

      dispatch({ type: GROCERY_REPORT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GROCERY_REPORT_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
