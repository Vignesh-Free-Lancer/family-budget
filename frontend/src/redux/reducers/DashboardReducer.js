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

// Last Three Month Salary, Income & Expense Reducer
export const LastThreeMonthDashboardDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case LAST_THREE_MONTH_DASHBOARD_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case LAST_THREE_MONTH_DASHBOARD_DETAILS_SUCCESS:
      return {
        loading: false,
        lastThreeMonthDashboardDetail: action.payload,
      };
    case LAST_THREE_MONTH_DASHBOARD_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Salary Current Month Reducer
export const SalaryCurrentMonthReducer = (state = {}, action) => {
  switch (action.type) {
    case SALARY_CURRENT_MONTH_GET_REQUEST:
      return {
        loading: true,
      };
    case SALARY_CURRENT_MONTH_GET_SUCCESS:
      return {
        loading: false,
        salaryCurrentMonth: action.payload,
      };
    case SALARY_CURRENT_MONTH_GET_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Extra Income Current Month Reducer
export const ExtraIncomeCurrentMonthReducer = (state = {}, action) => {
  switch (action.type) {
    case EXTRAINCOME_CURRENT_MONTH_GET_REQUEST:
      return {
        loading: true,
      };
    case EXTRAINCOME_CURRENT_MONTH_GET_SUCCESS:
      return {
        loading: false,
        extraIncomeCurrentMonth: action.payload,
      };
    case EXTRAINCOME_CURRENT_MONTH_GET_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Expense Current Month Reducer
export const ExpenseCurrentMonthReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPENSE_CURRENT_MONTH_GET_REQUEST:
      return {
        loading: true,
      };
    case EXPENSE_CURRENT_MONTH_GET_SUCCESS:
      return {
        loading: false,
        expenseCurrentMonth: action.payload,
      };
    case EXPENSE_CURRENT_MONTH_GET_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
