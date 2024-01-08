import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Screens/Signup";
import Login from "../Screens/Login";
import Dashboard from "../Screens/Entrepreneur/Dashboard";
import "../Screens/CSS/variableCss.css";
import Welcome from "../Components/welcome";

import Wallet from "../Screens/Entrepreneur/Wallet";
import Profile from "../Screens/Entrepreneur/Profile";
import NavbarEntrep from "../Components/navbarEntrep";
import Business from "../Screens/Entrepreneur/Business";
// import Notification from "../Screens/Entrepreneur/Notification";
import NavbarInvestor from "../Components/investorNavbar";
import DashboardInvestor from "../Screens/Investor/Dashboard";
import Feeds from "../Screens/Investor/Feeds";
import Investment from "../Screens/Investor/Investment";

// import NotificationInvestor from "../Screens/Notification";
import ProfileInvestor from "../Screens/Investor/Profile";

import ListOfBusiness from "../Components/listBusiness";

import Post from "../Components/post";

import Payreturn from "../Components/payreturn";

import VerifyAccount from "../Components/VerifyAccount";
import VerifyAccountEntrep from "../Components/VerifyAccountEntrep";

import UnauthorizedAlert from "../Utils/UnauthorizedAlert";

import Pitch from "../Components/pitch";
import ViewBusinesInvestor from "../Screens/Investor/ViewBusinesInvestor";
import Account from "../Screens/Investor/Account";
import AccountEntrep from "../Screens/Entrepreneur/AccountEntrep";

import BusinessPayments from "../Components/BusinessPayments";
import ChatComponent from "../Screens/Chat/ChatComponent";
import ViewEntrepProfile from "../Components/ViewEntrepProfile";
import UpdateInvestmentModa from "../Components/DisplayBusiness/UpdateInvestmentModa";
import UpdateBusiness from "../Components/UpdateBusiness";
import ServerError from "../ErrorPage/ServerError";
import ConnectionError from "../ErrorPage/ConnectionError";
import GeneralError from "../ErrorPage/GeneralError";

function Router(props) {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/error" element={<ConnectionError />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="/somethingwrong" element={<GeneralError />} />
      <Route path="/entrepreneur" element={<NavbarEntrep />}>
        <Route path="updatebusiness" element={<UpdateBusiness />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="pitch" element={<Pitch />} />
        <Route path="account" element={<AccountEntrep />}>
          <Route path="business" element={<Business />}>
            <Route index element={<Post />} />

            <Route path="r/:id" element={<Payreturn />} />
            <Route path="payments?" element={<BusinessPayments />} />
          </Route>
          <Route path="wallet" element={<Wallet />} />

          <Route path="profile" element={<Profile />} />
          <Route path="verify" element={<VerifyAccountEntrep />} />
          <Route path="chat" element={<ChatComponent />} />
        </Route>

        {/* <Route path="notification" element={<Notification />} /> */}
      </Route>

      <Route path="/investor" element={<NavbarInvestor />}>
        <Route path="dashboard" element={<DashboardInvestor />} />
        <Route path="investment-update" element={<UpdateInvestmentModa />} />

        <Route path="feeds" element={<Feeds />}>
          <Route
            path="list/:typeKey/category/:category"
            element={<ListOfBusiness />}
          ></Route>
        </Route>
        <Route path="business-details" element={<ViewBusinesInvestor />} />
        <Route path="account" element={<Account />}>
          <Route path="investment" element={<Investment />}>
            {" "}
          </Route>

          <Route path="profile" element={<ProfileInvestor />}></Route>
          <Route path="verify" element={<VerifyAccount />} />
        </Route>
        <Route path="entrep-details" element={<ViewEntrepProfile />} />
        <Route path="chat" element={<ChatComponent />} />
      </Route>
    </Routes>
  );
}

export default Router;
