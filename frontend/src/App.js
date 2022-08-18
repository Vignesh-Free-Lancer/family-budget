import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./i18n/i18n";

import AppLayout from "./layouts/appLayout/AppLayout";

import Home from "./pages/home/Home";
import Registration from "./pages/registration/Registration";
import UserList from "./pages/user/UserList";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Salary from "./pages/salary/Salary";
import SalaryList from "./pages/salary/SalaryList";
import ExtraIncome from "./pages/extraIncome/ExtraIncome";
import ExtraIncomeList from "./pages/extraIncome/ExtraIncomeList";
import Expenses from "./pages/expenses/Expenses";
import Report from "./pages/report/Report";
import NotFound from "./pages/notFound/NotFound";
import PageExpired from "./pages/pageExpired/PageExpired";

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
    return auth ? <>{children}</> : <Navigate to="/" />;
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
            <Route path="/user/:userId" element={<Registration />} />
            <Route path="/user/list" element={<UserList />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/salary" element={<Salary />} />
            <Route path="/salary/:salaryId" element={<Salary />} />
            <Route path="/salary/list" element={<SalaryList />} />
            <Route path="/extra-income" element={<ExtraIncome />} />
            <Route
              path="/extra-income/:extraIncomeId"
              element={<ExtraIncome />}
            />
            <Route path="/extra-income/list" element={<ExtraIncomeList />} />
            <Route path="/expense" element={<Expenses />} />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
