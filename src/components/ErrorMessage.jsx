export default function ErrorMessage({ errorRef, errorMessage }) {
  return (
    <div className="p-2 mb-3 bg-danger-subtle rounded-2 text-center">
      <p ref={errorRef} aria-live="assertive">
        {errorMessage}
      </p>
    </div>
  );
}
