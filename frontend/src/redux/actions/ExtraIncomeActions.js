import axios from "axios";
import {
  EXTRAINCOME_DETAIL_CREATE_FAILURE,
  EXTRAINCOME_DETAIL_CREATE_REQUEST,
  EXTRAINCOME_DETAIL_CREATE_SUCCESS,
  EXTRAINCOME_DETAIL_DELETE_FAILURE,
  EXTRAINCOME_DETAIL_DELETE_REQUEST,
  EXTRAINCOME_DETAIL_DELETE_SUCCESS,
  EXTRAINCOME_DETAIL_LIST_FAILURE,
  EXTRAINCOME_DETAIL_LIST_REQUEST,
  EXTRAINCOME_DETAIL_LIST_SUCCESS,
  EXTRAINCOME_DETAIL_UPDATE_FAILURE,
  EXTRAINCOME_DETAIL_UPDATE_REQUEST,
  EXTRAINCOME_DETAIL_UPDATE_SUCCESS,
} from "../constants/ExtraIncomeConstants";

// Extra Income Create Action
export const extraIncomeCreateAction =
  (
    month,
    year,
    incomeDate,
    incomeCreditAmount,
    amountCreditedType,
    amountCreditedBank,
    description,
    isExtraIncomeActive
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EXTRAINCOME_DETAIL_CREATE_REQUEST });

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
        "/api/extra-income/add",
        {
          month,
          year,
          incomeDate,
          incomeCreditAmount,
          amountCreditedType,
          amountCreditedBank,
          description,
          isExtraIncomeActive,
        },
        config
      );

      dispatch({ type: EXTRAINCOME_DETAIL_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EXTRAINCOME_DETAIL_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Extra Income List Action
export const extraIncomeListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EXTRAINCOME_DETAIL_LIST_REQUEST });

    const {
      userLogin: { userInfos },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfos.token}`,
      },
    };

    const { data } = await axios.get("/api/extra-income/lists", config);

    dispatch({ type: EXTRAINCOME_DETAIL_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXTRAINCOME_DETAIL_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Extra Income Update Action
export const extraIncomeUpdateAction =
  (
    extraIncomeId,
    month,
    year,
    incomeDate,
    incomeCreditAmount,
    amountCreditedType,
    amountCreditedBank,
    description
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: EXTRAINCOME_DETAIL_UPDATE_REQUEST });

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
        `/api/extra-income/${extraIncomeId}`,
        {
          month,
          year,
          incomeDate,
          incomeCreditAmount,
          amountCreditedType,
          amountCreditedBank,
          description,
        },
        config
      );

      dispatch({ type: EXTRAINCOME_DETAIL_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EXTRAINCOME_DETAIL_UPDATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Extra Income Delete Action
export const extraIncomeDeleteAction =
  (extraIncomeId) => async (dispatch, getState) => {
    try {
      dispatch({ type: EXTRAINCOME_DETAIL_DELETE_REQUEST });

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
        `/api/extra-income/remove/${extraIncomeId}`,
        {},
        config
      );

      dispatch({ type: EXTRAINCOME_DETAIL_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EXTRAINCOME_DETAIL_DELETE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
