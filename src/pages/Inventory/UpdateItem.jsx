import { useEffect } from "react";

export default function UpdateItem() {
  useEffect(() => {
    document.title = "Update Item";
  });

  return <h1>UpdateItem</h1>;
}
