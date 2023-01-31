import { FaCheck, FaExclamationCircle } from "react-icons/fa"
import { TbUserCheck } from "react-icons/tb"
import { ApproveCustomerData } from "../../../hooks/requests/usermanagementHook"
import i18next from "i18next"

export default function ApproveSelectedUser({ styles, closeForm }) {
  //get selected user data
  var __selected_customer, __storageItem

  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__malt_customer")
    __storageItem !== "undefined"
      ? (__selected_customer = JSON.parse(__storageItem))
      : null
  }

  //function to submit form data
  const handleSubmit = async (e) => {
    console.info(__selected_customer)
    e.preventDefault()
    senduserapproval(__selected_customer)
  }

  //on successful submission
  const onSuccess = (approval) => {
    closeForm(approval)
  }

  //on error before, while, after submission
  const onError = (error) => {
    console.log("error", error)
  }

  //request handler
  const {
    mutate: senduserapproval,
    isLoading,
    isError,
    error,
    isSuccess,
  } = ApproveCustomerData(onSuccess, onError)
  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column justify-content-between align-items-center w-100"
    >
      <TbUserCheck size={50} />
      <h5 className="title mt-4 mb-4 text-ceenter">
        {i18next.t("approval_salutation")}{" "}
        <span className="text-muted fw-bold">
          {__selected_customer?.email}?
        </span>
      </h5>

      {isSuccess ? (
        <span className="text-success mb-3">
          User approved successfully <FaCheck size={30} className="mb-2" />
          &nbsp;
        </span>
      ) : isError ? (
        <span className="text-danger mb-3">
          <FaExclamationCircle size={30} className="mb-2" />
          &nbsp; User approval unsuccessful. Please try again later{" "}
        </span>
      ) : null}

      <div className="col-md-12 d-flex flex-row justify-content-between view overlay">
        <button
          type="button"
          disabled={isLoading}
          className={
            "col-md-5 text-white bg-danger p-2 pl-0 pr-0 border-0 mask rgba-red-strong"
          }
          onClick={() => closeForm(__selected_customer)}
        >
          {i18next.t("cancel")}
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className={
            "col-md-5 text-dark bg-dark p-2 pl-0 pr-0 border border-dark bg-white mask rgba-red-strong "
          }
        >
          {isLoading ? (
            <div className="loader text-center">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            `${i18next.t("approval_salutation")}`
          )}
        </button>
      </div>
    </form>
  )
}
