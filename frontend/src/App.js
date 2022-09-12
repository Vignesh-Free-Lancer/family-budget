import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./i18n/i18n";

import AppLayout from "./layouts/appLayout/AppLayout";

import Home from "./pages/home/Home";
import Registration from "./pages/registration/Registration";
import AccountConfirmation from "./pages/user/AccountConfirmation";
import AccountConfirmationSuccess from "./pages/user/AccountConfirmationSuccess";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import ResetEmailAddress from "./pages/resetEmail/resetEmail";
import Dashboard from "./pages/dashboard/Dashboard";
import UserList from "./pages/user/UserList";
import Salary from "./pages/salary/Salary";
import SalaryList from "./pages/salary/SalaryList";
import ExtraIncome from "./pages/extraIncome/ExtraIncome";
import ExtraIncomeList from "./pages/extraIncome/ExtraIncomeList";
import Expenses from "./pages/expenses/Expenses";
import Report from "./pages/report/Report";
import NotFound from "./pages/notFound/NotFound";
import PageExpired from "./pages/pageExpired/PageExpired";
import ThanksPage from "./pages/thanks/ThanksPage";

const App = () => {
  /* Redirect To Landing Page When close Or Reload The Page --- Start */
  window.addEventListener("beforeunload", () => {
    localStorage.removeItem("userInfos");
  });

  const PrivateRoute = (props) => {
    const { children } = props;
    const auth = localStorage.getItem("userInfos");

    // If authorized, return that will render child elements
    // If not, return element that will navigate to landing page
    return auth ? <>{children}</> : <Navigate to="/page/expired" />;
  };
  /* Redirect To Landing Page When close Or Reload The Page --- End */

  return (
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route
              path="/account/confirmation/:emailverification"
              element={<AccountConfirmation />}
            />
            <Route
              exact
              path="/account/confirmation/success/:token"
              element={<AccountConfirmationSuccess />}
            />
            <Route
              path="/user/profile/:userId"
              element={
                <PrivateRoute>
                  <Registration />
                </PrivateRoute>
              }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/reset-password/:userId"
              element={
                <PrivateRoute>
                  <ResetPassword />
                </PrivateRoute>
              }
            />
            <Route
              path="/email/modify/:userId"
              element={
                <PrivateRoute>
                  <ResetEmailAddress />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/list"
              element={
                <PrivateRoute>
                  <UserList />
                </PrivateRoute>
              }
            />
            <Route
              path="/salary"
              element={
                <PrivateRoute>
                  <Salary />
                </PrivateRoute>
              }
            />
            <Route
              path="/salary/:salaryId"
              element={
                <PrivateRoute>
                  <Salary />
                </PrivateRoute>
              }
            />
            <Route
              path="/salary/list"
              element={
                <PrivateRoute>
                  <SalaryList />
                </PrivateRoute>
              }
            />
            <Route
              path="/extra-income"
              element={
                <PrivateRoute>
                  <ExtraIncome />
                </PrivateRoute>
              }
            />
            <Route
              path="/extra-income/:extraIncomeId"
              element={
                <PrivateRoute>
                  <ExtraIncome />
                </PrivateRoute>
              }
            />
            <Route
              path="/extra-income/list"
              element={
                <PrivateRoute>
                  <ExtraIncomeList />
                </PrivateRoute>
              }
            />
            <Route
              path="/expense"
              element={
                <PrivateRoute>
                  <Expenses />
                </PrivateRoute>
              }
            />
            <Route
              path="/report"
              element={
                <PrivateRoute>
                  <Report />
                </PrivateRoute>
              }
            />
            <Route path="/thanks/page" element={<ThanksPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/page/expired" element={<PageExpired />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
