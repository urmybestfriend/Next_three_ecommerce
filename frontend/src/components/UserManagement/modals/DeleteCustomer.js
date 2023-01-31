import { FaCheck, FaExclamationCircle } from "react-icons/fa"
import { TbUserCheck } from "react-icons/tb"
import {
  ApproveCustomerData,
  DeleteCustomerData,
} from "../../../hooks/requests/usermanagementHook"
import i18next from "i18next"

export default function DeleteCustomer({ closeForm }) {
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
    // console.info(__selected_customer)
    e.preventDefault()
    senduserapproval(__selected_customer?._id)
  }

  //on successful submission
  const onSuccess = (data) => {
    closeForm()
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
  } = DeleteCustomerData(onSuccess, onError)
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column justify-content-between align-items-center w-100"
      >
        <TbUserCheck size={50} />
        <h5 className="title mt-4 mb-4 text-ceenter">
          {i18next.t("deleting")}{" "}
          <span className="text-muted fw-bold">
            {__selected_customer?.email}?
          </span>
        </h5>

        {isSuccess ? (
          <span className="text-success mb-3">
            User deleted successfully <FaCheck size={30} className="mb-2" />
            &nbsp;
          </span>
        ) : isError ? (
          <span className="text-danger mb-3">
            <FaExclamationCircle size={30} className="mb-2" />
            &nbsp; {error?.response?.data?.error}. Please try again later{" "}
          </span>
        ) : null}

        <div className="col-md-12 d-flex flex-row justify-content-between view overlay">
          {isSuccess ? (
            <button
              type="button"
              disabled={isLoading}
              className={
                "col-md-12 text-dark bg-light p-2 pl-0 pr-0 border-1 border-dark mask rgba-red-strong"
              }
              onClick={() => closeForm(__selected_customer)}
            >
              {i18next.t("proceed")}
            </button>
          ) : (
            <>
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
                  `${i18next.t("delete")}`
                )}
              </button>
            </>
          )}
        </div>
      </form>
    </>
  )
}
