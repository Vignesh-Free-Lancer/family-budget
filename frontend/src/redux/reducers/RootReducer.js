import { combineReducers } from "redux";
import { USER_LOGOUT } from "../constants/UserConstants";

// Import User Reducer
import {
  UserRegistrationReducer,
  UserAccountConfirmationReducer,
  UserLoginReducer,
  UserForgotPasswordReducer,
  UserAccountActivationReducer,
  UserResetPasswordReducer,
  UserResetEmailReducer,
  UserUpdateReducer,
  UserDeleteReducer,
  UserListReducer,
} from "../reducers/UserReducer";

// Import Salary Reducer
import {
  SalaryCreateReducer,
  SalaryListReducer,
  SalaryUpdateReducer,
  SalaryDeleteReducer,
  SalaryReportListReducer,
} from "../reducers/SalaryReducer";

// Import Extra Income Reducer
import {
  ExtraIncomeCreateReducer,
  ExtraIncomeListReducer,
  ExtraIncomeUpdateReducer,
  ExtraIncomeDeleteReducer,
} from "../reducers/ExtraIncomeReducer";

// Import Expense Reducer
import {
  ExpenseCreateReducer,
  ExpenseImportReducer,
  ExpenseListReducer,
  ExpenseUpdateReducer,
  ExpenseDeleteReducer,
  ExpenseReportListReducer,
} from "../reducers/ExpenseReducer";

// Import Grocery Reducer
import {
  GroceryCreateReducer,
  GroceryImportReducer,
  GroceryListReducer,
  GroceryUpdateReducer,
  GroceryDeleteReducer,
  GroceryReportListReducer,
} from "../reducers/GroceryReducer";

// Import Dashboard Reducer
import {
  LastThreeMonthDashboardDetailReducer,
  SalaryCurrentMonthReducer,
  ExtraIncomeCurrentMonthReducer,
  ExpenseCurrentMonthReducer,
} from "../reducers/DashboardReducer";

const appReducer = combineReducers({
  userRecords: UserRegistrationReducer,
  userAccountConfirmation: UserAccountConfirmationReducer,
  userLogin: UserLoginReducer,
  userForgotPassword: UserForgotPasswordReducer,
  userAccountActivation: UserAccountActivationReducer,
  userResetPassword: UserResetPasswordReducer,
  userResetEmail: UserResetEmailReducer,
  userUpdatedData: UserUpdateReducer,
  userDeletedData: UserDeleteReducer,
  userListData: UserListReducer,

  salaryRecords: SalaryCreateReducer,
  salaryListData: SalaryListReducer,
  salaryUpdatedData: SalaryUpdateReducer,
  salaryDeletedData: SalaryDeleteReducer,
  salaryReportListData: SalaryReportListReducer,

  extraIncomeRecords: ExtraIncomeCreateReducer,
  extraIncomeListData: ExtraIncomeListReducer,
  extraIncomeUpdatedData: ExtraIncomeUpdateReducer,
  extraIncomeDeletedData: ExtraIncomeDeleteReducer,

  expenseRecords: ExpenseCreateReducer,
  expenseImportRecords: ExpenseImportReducer,
  expenseListData: ExpenseListReducer,
  expenseUpdatedData: ExpenseUpdateReducer,
  expenseDeletedData: ExpenseDeleteReducer,
  expenseReportListData: ExpenseReportListReducer,

  groceryRecords: GroceryCreateReducer,
  groceryImportRecords: GroceryImportReducer,
  groceryListData: GroceryListReducer,
  groceryUpdatedData: GroceryUpdateReducer,
  groceryDeletedData: GroceryDeleteReducer,
  groceryReportListData: GroceryReportListReducer,

  lastThreeMonthDashboardData: LastThreeMonthDashboardDetailReducer,
  salaryCurrentMonthData: SalaryCurrentMonthReducer,
  extraIncomeCurrentMonthData: ExtraIncomeCurrentMonthReducer,
  expenseCurrentMonthData: ExpenseCurrentMonthReducer,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
