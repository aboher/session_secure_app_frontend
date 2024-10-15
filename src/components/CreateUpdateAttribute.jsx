import { useEffect, useRef, useState } from "react";
import { useSession } from "../hooks/useSession";
import ErrorMessage from "./ErrorMessage";

export default function CreateUpdateAttribute({ updaterFunction }) {
  const [attribute, setAttribute] = useState({ name: "", value: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createUpdateAttribute } = useSession();
  const errorRef = useRef();
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await handleAttributeCreationOrUpdate();
    setIsSubmitting(false);
  };

  const handleAttributeCreationOrUpdate = async () => {
    const result = await createUpdateAttribute(attribute.name, {
      [attribute.name]: attribute.value,
    });
    if (result != null) {
      setErrorMessage(result);
      return;
    }
    setAttribute({ name: "", value: "" });
    updaterFunction && updaterFunction();
  };

  useEffect(() => {
    setErrorMessage("");
  }, [attribute]);

  return (
    <>
      <h1>Create/Update Attribute:</h1>
      <form onSubmit={handleSubmit}>
        <div className="col col-8 mb-3">
          <label htmlFor="attibute-name" className="form-label">
            Attribute name:
          </label>
          <input
            type="text"
            id="attribute-name"
            className="form-control"
            autoComplete="off"
            value={attribute.name}
            onChange={(e) =>
              setAttribute({ ...attribute, name: e.target.value })
            }
            required
          />
        </div>
        <div className="col col-8 mb-3">
          <label htmlFor="attribute-value" className="form-label">
            Attribute value:
          </label>
          <input
            type="text"
            id="attribute-value"
            className="form-control"
            autoComplete="off"
            value={attribute.value}
            onChange={(e) =>
              setAttribute({ ...attribute, value: e.target.value })
            }
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary mb-3"
        >
          {isSubmitting ? "Submitting..." : "Create/Update Attribute"}
        </button>
        {errorMessage && (
          <ErrorMessage errorRef={errorRef} errorMessage={errorMessage} />
        )}
      </form>
    </>
  );
}
