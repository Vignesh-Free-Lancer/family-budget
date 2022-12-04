import axios from "axios";
import {
  SALARY_DETAIL_CREATE_FAILURE,
  SALARY_DETAIL_CREATE_REQUEST,
  SALARY_DETAIL_CREATE_SUCCESS,
  SALARY_DETAIL_DELETE_FAILURE,
  SALARY_DETAIL_DELETE_REQUEST,
  SALARY_DETAIL_DELETE_SUCCESS,
  SALARY_DETAIL_LIST_FAILURE,
  SALARY_DETAIL_LIST_REQUEST,
  SALARY_DETAIL_LIST_SUCCESS,
  SALARY_DETAIL_UPDATE_FAILURE,
  SALARY_DETAIL_UPDATE_REQUEST,
  SALARY_DETAIL_UPDATE_SUCCESS,
  SALARY_REPORT_CREATE_FAILURE,
  SALARY_REPORT_CREATE_REQUEST,
  SALARY_REPORT_CREATE_SUCCESS,
} from "../constants/SalaryConstants";

// Salary Create Action
export const salaryCreateAction =
  (
    month,
    year,
    monthlySalary,
    bonusAmount,
    otherAllowance,
    totalCR,
    pf,
    incomeTax,
    professionalTax,
    otherDeductions,
    totalDR,
    netPayAmount,
    isActive
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SALARY_DETAIL_CREATE_REQUEST });

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
        "/api/salary/add",
        {
          month,
          year,
          monthlySalary,
          bonusAmount,
          otherAllowance,
          totalCR,
          pf,
          incomeTax,
          professionalTax,
          otherDeductions,
          totalDR,
          netPayAmount,
          isActive,
        },
        config
      );

      dispatch({ type: SALARY_DETAIL_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SALARY_DETAIL_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Salary List Action
export const salaryListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SALARY_DETAIL_LIST_REQUEST });

    const {
      userLogin: { userInfos },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfos.token}`,
      },
    };

    const { data } = await axios.get("/api/salary/lists", config);

    dispatch({ type: SALARY_DETAIL_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SALARY_DETAIL_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Salary Update Action
export const salaryUpdateAction =
  (
    salaryId,
    month,
    year,
    monthlySalary,
    bonusAmount,
    otherAllowance,
    totalCR,
    pf,
    incomeTax,
    professionalTax,
    otherDeductions,
    totalDR,
    netPayAmount
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SALARY_DETAIL_UPDATE_REQUEST });

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
        `/api/salary/${salaryId}`,
        {
          month,
          year,
          monthlySalary,
          bonusAmount,
          otherAllowance,
          totalCR,
          pf,
          incomeTax,
          professionalTax,
          otherDeductions,
          totalDR,
          netPayAmount,
        },
        config
      );

      dispatch({ type: SALARY_DETAIL_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SALARY_DETAIL_UPDATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Salary Delete Action
export const salaryDeleteAction = (salaryId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SALARY_DETAIL_DELETE_REQUEST });

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
      `/api/salary/remove/${salaryId}`,
      {},
      config
    );

    dispatch({ type: SALARY_DETAIL_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SALARY_DETAIL_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Salary Report List Action
export const salaryReportListAction =
  (reportType, month, year) => async (dispatch, getState) => {
    try {
      dispatch({ type: SALARY_REPORT_CREATE_REQUEST });

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
        `/api/salary/report/${reportType}/${month}/${year}`,
        config
      );

      dispatch({ type: SALARY_REPORT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: SALARY_REPORT_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
