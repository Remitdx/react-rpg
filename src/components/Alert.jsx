export function Alert({showAlert, text, type}) {
  return <>
    {showAlert &&
      <div className={`position-absolute alert ${type} mt-3`} role="alert">
        <p>{text}</p>
      </div>}
  </>
}
