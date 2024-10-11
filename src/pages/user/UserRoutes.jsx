import UserSessionInfo from "./UserSessionInfo";
import UserActiveSessions from "./UserActiveSessions";
import { Route, Routes } from "react-router-dom";
import NotFound from "../NotFound";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="session-info/:id" element={<UserSessionInfo />} />
      <Route path="active-sessions/:email" element={<UserActiveSessions />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
