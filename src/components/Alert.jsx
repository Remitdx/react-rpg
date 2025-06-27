export function Alert({showAlert}) {
  return <>
    {showAlert &&
      <div className="position-absolute alert alert-warning mt-3" role="alert">
        <p>Sorry, you can't afford this !</p>
      </div>}
  </>
}
