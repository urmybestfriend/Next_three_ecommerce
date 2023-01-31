import i18next from "i18next"

export const ButtonLoader = () => {
  return (
    <div className="loader text-center">
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export const ButtonLoaderLight = () => {
  return (
    <div className="loader text-center">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export const APILoader = () => {
  return (
    <div className="d-flex flex-column text-center">
      <div className="loader text-center">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <span className="text-muted mt-2">{i18next.t("loading_text")}...</span>
    </div>
  )
}
