import { Route, Routes } from "react-router-dom";
import NotFound from "../NotFound";
import Attributes from "./Attributes";

export default function ModeratorRoutes() {
  return (
    <Routes>
      <Route path="attributes" element={<Attributes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
