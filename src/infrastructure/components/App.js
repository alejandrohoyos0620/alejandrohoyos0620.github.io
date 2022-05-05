import Home from "../pages/Home";
import Footer from "./shared/Footer";
import { BrowserRouter, Route, Routes, Switch, Outlet } from "react-router-dom";
import LoginClient from "./auth/client/Login-client";
import LoginUser from "./auth/user/Login-user";
import RegisterClient from "./auth/client/Register-client";
import ForgotPasswordClient from "./auth/client/Forgot-password-client";
import RecoveryPasswordClient from "./auth/client/Recovery-password-client";
import ForgotPasswordUser from "./auth/user/Forgot-password-user";
import RecoveryPasswordUser from "./auth/user/Recovery-password-user";
import CreateUser from "./auth/user/Create-user";
import Layout from './shared/Layout';


import 'bootstrap/dist/js/bootstrap.bundle.min';

import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from "../pages/User";
import UserInfo from "../pages/UserInfo";
import TestFile from "./auth/client/testFile";
function App() {

  const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )} />
  )
  function LayoutShared() {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }
  return (
    <div className="h-100">
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<Outlet />}>
            <Route path='client' element={<Outlet />}>
              <Route exact path='login' element={<LoginClient />} />
              <Route exact path='register' element={<RegisterClient />} />
              <Route exact path='forgot-password' element={<ForgotPasswordClient />} />
              <Route exact path='recovery-password' element={<RecoveryPasswordClient />} />
            </Route>
            <Route path='user' element={<Outlet />}>
              <Route exact path='login' element={<LoginUser />} />
            </Route> 
          </Route>
          <Route exact path='/' element={<LayoutShared />} >
            <Route exact path='/' element={<Home />} />
            {/* <Route path='user' element={<Outlet />}>
              <Route exact path='login' element={<LoginUser />} />
              <Route exact path='register' element={<RegisterUser />} />
              <Route exact path='forgot-password' element={<ForgotPasswordUser />} />
              <Route exact path='recovery-password' element={<RecoveryPasswordUser />} />
            </Route> */}
            <Route exact path='user' element={<User />} />
            <Route exact path='user-info' element={<UserInfo />} />
            <Route exact path='create-user' element={<CreateUser />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer transition={Flip} />
    </div>
  );
}

export default App;
