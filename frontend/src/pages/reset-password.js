import React, { useState } from "react"
import { useRouter } from "next/router"
import Joi from "joi-browser"
import validation from "../helpers/validation"
import { ChangePasswordDataSubmit } from "../hooks/requests/authHook"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Button,
  Row,
  Col,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap"
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons"
import { passwordValidate } from "../helpers/constants"
import Link from "next/link"
import { ButtonLoader } from "../components/globals/Loaders"
import i18next from "i18next"

export default function ResetPassword() {
  //next router definition
  const router = useRouter()

  //get verfication token
  let Token = Object.keys(router.query)[0]

  //component states
  const [formdata, setFormdata] = useState({
    password: "",
    confirm_password: "",
  })
  const [errors, setErrors] = useState({})

  //defined validation schema
  const schema = {
    password: Joi.string().required().min(8),
    confirm_password: Joi.string().required().valid(Joi.ref("password")),
  }

  //Form inputs event handler
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  //password reset data
  const resetPassWordData = {
    token: Token,
    newpassword: formdata.password,
  }

  //form data submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validation(formdata, schema)
    setErrors(errors || {})
    if (!errors) {
      passwordchange(resetPassWordData)
    } else {
      console.log(errors)
    }
  }

  //on success sign up
  const onSuccess = (data) => {
    console.info("change ps", data)
  }

  const onError = (error) => {
    console.log("error", error)
  }

  //API request handler
  const {
    mutate: passwordchange,
    error,
    isSuccess,
    isError,
    isLoading,
  } = ChangePasswordDataSubmit(onSuccess, onError)

  return (
    <div className="mt-5 mb-5 col-md-12 d-flex flex-colum justify-content-center align-center">
      <div style={{ alignSelf: "center" }} className="col-md-4">
        <h2>{i18next.t("password_change_salutation")}</h2>
        {isSuccess ? (
          <span className="text-success">
            Password change successful. Please login to continue...
          </span>
        ) : isError ? (
          <span className="text-danger">{error?.response?.data?.error}</span>
        ) : null}
        <Form onSubmit={handleSubmit} className="mt-8 mb-8">
          <div className="mb-4">
            <Form.Label htmlFor="registerEmail">
              {i18next.t("new")} {i18next.t("password")}
            </Form.Label>
            <Form.Control
              id="password"
              type="password"
              onChange={handleChange}
              name="password"
            />
            <span className="small text-danger">
              {errors.password && "Should be at least 8 characters"}{" "}
            </span>
          </div>
          <div className="mb-4">
            <Form.Label htmlFor="registerEmail">
              {i18next.t("confirm")} {i18next.t("password")}
            </Form.Label>
            <Form.Control
              id="confirm_password"
              type="password"
              onChange={handleChange}
              name="confirm_password"
            />
            <span className="small text-danger">
              {errors.confirm_password &&
                "Cannot be empty and should match your password."}{" "}
            </span>
          </div>
          <div className="mb-4">
            <Button
              disabled={isLoading ? true : false}
              variant="outline-dark w-100"
              type="submit"
            >
              {isLoading ? (
                <ButtonLoader />
              ) : (
                <>
                  <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                  {i18next.t("change")} {i18next.t("password")}
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
