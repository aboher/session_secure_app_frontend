import { Route, Routes } from "react-router-dom";
import NotFound from "../NotFound";
import AllUsersActiveSessions from "./AllUsersActiveSessions";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="active-sessions" element={<AllUsersActiveSessions />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
