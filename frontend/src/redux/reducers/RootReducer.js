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
} from "../reducers/SalaryReducer";

// Import Extra Income Reducer
import {
  ExtraIncomeCreateReducer,
  ExtraIncomeListReducer,
  ExtraIncomeUpdateReducer,
  ExtraIncomeDeleteReducer,
} from "../reducers/ExtraIncomeReducer";

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

  extraIncomeRecords: ExtraIncomeCreateReducer,
  extraIncomeListData: ExtraIncomeListReducer,
  extraIncomeUpdatedData: ExtraIncomeUpdateReducer,
  extraIncomeDeletedData: ExtraIncomeDeleteReducer,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
