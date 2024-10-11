import "./scss/styles.scss";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import NotFound from "./pages/NotFound";
import RequireUnauth from "./components/RequireUnauth";
import RequireAuth from "./components/RequireAuth";
import ConfirmEmail from "./pages/ConfirmEmail";
import RequestPasswordChange from "./pages/RequestPasswordChange";
import ChangePassword from "./pages/ChangePassword";
import UserRoutes from "./pages/user/UserRoutes";
import AdminRoutes from "./pages/admin/AdminRoutes";
import RequireAdminAuth from "./components/RequireAdminAuth";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="user/*"
          element={
            <RequireAuth>
              <UserRoutes />
            </RequireAuth>
          }
        />
        <Route
          path="admin/*"
          element={
            <RequireAdminAuth>
              <AdminRoutes />
            </RequireAdminAuth>
          }
        />
        <Route
          path="/signin"
          element={
            <RequireUnauth>
              <SignIn />
            </RequireUnauth>
          }
        />
        <Route
          path="/signup"
          element={
            <RequireUnauth>
              <SignUp />
            </RequireUnauth>
          }
        />
        <Route
          path="/confirm-account"
          element={
            <RequireUnauth>
              <ConfirmEmail />
            </RequireUnauth>
          }
        />
        <Route
          path="/request-password-change"
          element={<RequestPasswordChange />}
        />
        <Route path="/password-change" element={<ChangePassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
