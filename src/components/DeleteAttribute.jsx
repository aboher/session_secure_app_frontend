import { useEffect, useRef, useState } from "react";
import { useSession } from "../hooks/useSession";
import ErrorMessage from "./ErrorMessage";

export default function DeleteAttribute({ updaterFunction }) {
  const [attributeToDelete, setAttributeToDelete] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { deleteAttribute } = useSession();
  const errorRef = useRef();
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    handleAttributeDeletion();
    setIsSubmitting(false);
  };

  const handleAttributeDeletion = async () => {
    const result = await deleteAttribute(attributeToDelete);
    if (result != null) {
      setErrorMessage(result);
      return;
    }
    setAttributeToDelete("");
    updaterFunction && updaterFunction();
  };

  useEffect(() => {
    setErrorMessage("");
  }, [attributeToDelete]);

  return (
    <>
      <h1>Delete Attribute:</h1>
      <form onSubmit={handleSubmit}>
        <div className="col col-8 mb-3">
          <label htmlFor="attribute-to-delete" className="form-label">
            Attribute name:
          </label>
          <input
            type="text"
            id="attribute-to-delete"
            className="form-control"
            autoComplete="off"
            value={attributeToDelete}
            onChange={(e) => setAttributeToDelete(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary mb-3"
        >
          {isSubmitting ? "Submitting..." : "Delete Attribute"}
        </button>
        {errorMessage && (
          <ErrorMessage errorRef={errorRef} errorMessage={errorMessage} />
        )}
      </form>
    </>
  );
}
