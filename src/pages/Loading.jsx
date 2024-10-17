import Spinner from "../components/Spinner";

const Loading = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-lg-6 offset-lg-3 mt-5 mb-5 border border-secondary-subtle rounded-3 text-bg-light p-3">
          <h1 style={{ textAlign: "center" }} className="m-5">
            Loading <br />
            <Spinner />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loading;
