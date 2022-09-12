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
  userUpdateReducer,
  userDeleteReducer,
  userListReducer,
} from "../reducers/UserReducer";

const appReducer = combineReducers({
  userRecords: UserRegistrationReducer,
  userAccountConfirmation: UserAccountConfirmationReducer,
  userLogin: UserLoginReducer,
  userForgotPassword: UserForgotPasswordReducer,
  userAccountActivation: UserAccountActivationReducer,
  userResetPassword: UserResetPasswordReducer,
  userResetEmail: UserResetEmailReducer,
  userUpdatedData: userUpdateReducer,
  userDeletedData: userDeleteReducer,
  userListData: userListReducer,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
