import React from "react"
import { useRouter } from "next/router"
import { MdVerified } from "react-icons/md"

import { VerifyUserAccountSubmit } from "../hooks/requests/authHook"
import {
  Button,
  Row,
  Col,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap"
import Link from "next/link"
import { ButtonLoader } from "../components/globals/Loaders"
import i18next from "i18next"

export default function VerifyMail() {
  //next router definition
  const router = useRouter()

  //get verfication token
  let queryParams = router.query

  //hook data
  var verification_token = `token=${queryParams?.token}&userId=${queryParams?.userId}`

  //form data submission
  const handleSubmit = (e) => {
    e.preventDefault()
    accountVerification(verification_token)
  }

  //on success sign up
  const onSuccess = (data) => {
    console.info("verification stat", data)
  }

  const onError = (error) => {
    console.log("error", error)
  }

  //API request handler
  const {
    mutate: accountVerification,
    error,
    isSuccess,
    isError,
    isLoading,
  } = VerifyUserAccountSubmit(onSuccess, onError)

  return (
    <div className="mt-5 mb-5 col-md-12 d-flex flex-colum justify-content-center align-center">
      <div style={{ alignSelf: "center" }} className="col-md-4">
        <h2>{i18next.t("verification_salutation")}...</h2>
        {isSuccess ? (
          <span className="text-success">
            {" "}
            Account verification successful. Your account will be approved soon
            for login.
          </span>
        ) : (isError &&
            error?.response?.data !== undefined &&
            error.response.status === 401) ||
          400 ? (
          <span className="text-danger">
            Your token may have expired. Please contact admin support to request
            for a new verification link.
          </span>
        ) : (isError &&
            error?.response?.data !== undefined &&
            error.response.status !== 401) ||
          400 ? (
          <span className="text-danger">
            An error occured: {error?.response?.data?.error}
          </span>
        ) : isError && error?.response?.data === undefined ? (
          <span className="text-danger">An error occured: {error.message}</span>
        ) : null}
        <Form className="mt-8 mb-8">
          <div className="mb-4 mt-6">
            <Button
              onClick={handleSubmit}
              disabled={isLoading ? true : false}
              variant="outline-dark w-100"
              type="submit"
            >
              {isLoading ? (
                <ButtonLoader />
              ) : (
                <>
                  {i18next.t("verify_account")} &nbsp;
                  <MdVerified size="20" className=" mb-1" />
                </>
              )}
            </Button>
          </div>
        </Form>
        <hr className="my-3 hr-text letter-spacing-2" data-content="OR" />
        <div className="text-center">
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Back to home</Tooltip>}
          >
            <Link href="/">
              <Button
                variant="outline-primary"
                className="letter-spacing-0 me-1"
              >
                Home
              </Button>
            </Link>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  )
}
