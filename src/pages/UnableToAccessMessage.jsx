export default function UnableToAccessMessage({ roleNeeded }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-6 offset-lg-3 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <h1 className="text-center">
            You need {roleNeeded} role to access this page
            <br />
            <button
              className="btn btn-primary"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </h1>
        </div>
      </div>
    </div>
  );
}
