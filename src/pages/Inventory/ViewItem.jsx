import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ViewItem() {
  const { id } = useParams();
  useEffect(() => {
    document.title = `Item ${id}`; // TODO: add title of the product here
  });

  return <h1>View Item {id}</h1>;
}
