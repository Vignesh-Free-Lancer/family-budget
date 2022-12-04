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

// Salary Create Reducer
export const SalaryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SALARY_DETAIL_CREATE_REQUEST:
      return {
        loading: true,
      };
    case SALARY_DETAIL_CREATE_SUCCESS:
      return {
        loading: false,
        salaryDatas: action.payload,
      };
    case SALARY_DETAIL_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Salary List Reducer
export const SalaryListReducer = (state = {}, action) => {
  switch (action.type) {
    case SALARY_DETAIL_LIST_REQUEST:
      return {
        loading: true,
      };
    case SALARY_DETAIL_LIST_SUCCESS:
      return {
        loading: false,
        salaryLists: action.payload,
      };
    case SALARY_DETAIL_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Salary Update Reducer
export const SalaryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SALARY_DETAIL_UPDATE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case SALARY_DETAIL_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        salaryUpdated: action.payload,
      };
    case SALARY_DETAIL_UPDATE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Salary Delete Reducer
export const SalaryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SALARY_DETAIL_DELETE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case SALARY_DETAIL_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        salaryDeleted: action.payload,
      };
    case SALARY_DETAIL_DELETE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Salary Report List Reducer
export const SalaryReportListReducer = (state = {}, action) => {
  switch (action.type) {
    case SALARY_REPORT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case SALARY_REPORT_CREATE_SUCCESS:
      return {
        loading: false,
        salaryReportLists: action.payload,
      };
    case SALARY_REPORT_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
