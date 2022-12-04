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
  EXPENSE_REPORT_CREATE_FAILURE,
  EXPENSE_REPORT_CREATE_REQUEST,
  EXPENSE_REPORT_CREATE_SUCCESS,
} from "../constants/ExpenseConstants";

// Expense Create Reducer
export const ExpenseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_DETAIL_CREATE_REQUEST:
      return {
        loading: true,
      };
    case EXPENSE_DETAIL_CREATE_SUCCESS:
      return {
        loading: false,
        expenseDatas: action.payload,
      };
    case EXPENSE_DETAIL_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Expense Import Reducer
export const ExpenseImportReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_DETAIL_IMPORT_REQUEST:
      return {
        loading: true,
      };
    case EXPENSE_DETAIL_IMPORT_SUCCESS:
      return {
        loading: false,
        expenseImportDatas: action.payload,
      };
    case EXPENSE_DETAIL_IMPORT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Expense List Reducer
export const ExpenseListReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_DETAIL_LIST_REQUEST:
      return {
        loading: true,
      };
    case EXPENSE_DETAIL_LIST_SUCCESS:
      return {
        loading: false,
        expenseLists: action.payload,
      };
    case EXPENSE_DETAIL_LIST_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Expense Update Reducer
export const ExpenseUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_DETAIL_UPDATE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case EXPENSE_DETAIL_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        expenseUpdated: action.payload,
      };
    case EXPENSE_DETAIL_UPDATE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Expense Delete Reducer
export const ExpenseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_DETAIL_DELETE_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case EXPENSE_DETAIL_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        expenseDeleted: action.payload,
      };
    case EXPENSE_DETAIL_DELETE_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Expense Report List Reducer
export const ExpenseReportListReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_REPORT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case EXPENSE_REPORT_CREATE_SUCCESS:
      return {
        loading: false,
        expenseReportLists: action.payload,
      };
    case EXPENSE_REPORT_CREATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
