import { useState } from "react";
import { REQUEST_TO_DELETE_ACCOUNT_PATH } from "../constants/urlConstants";
import axiosInstance from "../api/axiosInstance";

export default function DeleteAccountModal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const requestAccountDeletion = async () => {
    setIsSubmitting(true);
    try {
      await axiosInstance.post(REQUEST_TO_DELETE_ACCOUNT_PATH);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Delete Account Confirmation Message
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setTimeout(setSuccess, 1000, false)}
            ></button>
          </div>
          <div className="modal-body">
            {success
              ? "You have been sent an email with a confirmation link to delete your account."
              : `Are you sure you want to delete your account? Be aware that this process is 
                irreversible, and that your account, and all the data associated to it, will be lost.`}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setTimeout(setSuccess, 1000, false)}
            >
              {success ? "Accept" : "Cancel"}
            </button>
            {!success && (
              <button
                type="button"
                disabled={isSubmitting}
                className="btn btn-danger"
                onClick={requestAccountDeletion}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                    <span role="status">Loading...</span>
                  </>
                ) : (
                  "Yes, I want to delete my account"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
