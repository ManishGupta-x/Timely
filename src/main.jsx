import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import App from "./App.jsx";
// import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { Signin } from '../src/Credentials/pages/Signin/Signin.jsx'
import { Signup } from '../src/Credentials/pages/Signup/Signup.jsx'
import { Otp } from '../src/Credentials/pages/Otp/Otp.jsx'
// import { Forms } from '../src/Credentials/pages/Forms/Forms.jsx'

// import {Dashboard} from './App.jsx'
import { AppLayout } from './Credentials/AppLayout.jsx'
import { ContextProvider } from "./contexts/ContextProvider.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AddSchedule} from "./Credentials/pages/Forms/AddSchedule.jsx";
import { AddTask } from "./Credentials/pages/Forms/Addtask.jsx";


ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home/*" element=<App /> />
          <Route path="/" element=<AppLayout /> />
          <Route path="/signin" element=<Signin /> />
          <Route path = "/signup" element = <Signup/>/>
          <Route path = "/scheduleadd" element = <AddSchedule/>/>
          <Route path="/taskadd/:scheduleId" element=<AddTask /> />
          
          
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);



