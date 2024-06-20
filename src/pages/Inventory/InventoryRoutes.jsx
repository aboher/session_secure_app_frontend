import ViewItem from "./ViewItem";
import AddItem from "./AddItem";
import UpdateItem from "./UpdateItem";
import Inventory from "./Inventory";
import { Route, Routes } from "react-router-dom";
import NotFound from "../NotFound";

export default function InventoryRoutes() {
  return (
    <Routes>
      <Route index element={<Inventory />} />
      <Route path="item/:id" element={<ViewItem />} />
      <Route path="additem" element={<AddItem />} />
      <Route path="updateitem" element={<UpdateItem />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
