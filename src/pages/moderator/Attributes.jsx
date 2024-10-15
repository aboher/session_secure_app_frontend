import { useCallback, useEffect, useState } from "react";
import { useSession } from "../../hooks/useSession";
import CreateUpdateAttribute from "../../components/CreateUpdateAttribute";
import DeleteAttribute from "../../components/DeleteAttribute";

export default function Attributes() {
  const [attributes, setAttributes] = useState(null);
  const { getAllAttributes } = useSession();

  const getUpdateAttributes = useCallback(async () => {
    setAttributes(await getAllAttributes());
  }, [getAllAttributes]);

  useEffect(() => {
    getUpdateAttributes();
  }, [getUpdateAttributes]);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-10 offset-lg-1 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <div className="container mb-5">
            <div className="row">
              <div className="col col-6">
                <CreateUpdateAttribute updaterFunction={getUpdateAttributes} />
              </div>
              <div className="col col-6">
                <DeleteAttribute updaterFunction={getUpdateAttributes} />
              </div>
            </div>
          </div>
          <h1>All Attributes:</h1>
          {attributes &&
            Object.entries(attributes).map(([key, value]) => (
              <div key={key}>
                <h4>{key}:</h4>
                <pre>{JSON.stringify(value, null, 4)}</pre>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
