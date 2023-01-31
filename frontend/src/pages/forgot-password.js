import React, { useState } from "react"
import Joi from "joi-browser"
import validation from "../helpers/validation"
import {
  ForgotPasswordDataSubmit,
  SendLoginCredentials,
} from "../hooks/requests/authHook"
import { Modal, Nav, Tab, CloseButton } from "react-bootstrap"

import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons"
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
import Link from "next/link"
import { ButtonLoader } from "../components/globals/Loaders"
import i18next from "i18next"

export default function ForgotPassword() {
  //component states
  const [formdata, setFormdata] = useState({
    email: "",
  })
  const [errors, setErrors] = useState({})

  //defined validation schema
  const schema = {
    email: Joi.string().required().email(),
  }

  //Form inputs event handler
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  //form data submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validation(formdata, schema)
    setErrors(errors || {})
    if (!errors) {
      forgotpassword(formdata)
    } else {
      console.log(errors)
    }
  }
  //on success sign up
  const onSuccess = (data) => {
    console.info("forgot ps", data)
  }

  const onError = (error) => {
    console.log("error", error)
  }

  //API request handler
  const {
    mutate: forgotpassword,
    error,
    isSuccess,
    isError,
    isLoading,
  } = ForgotPasswordDataSubmit(onSuccess, onError)

  return (
    <div className="mt-5 mb-5 col-md-12 d-flex flex-colum justify-content-center align-center">
      <div style={{ alignSelf: "center" }} className="col-md-4">
        <h2> {i18next.t("forgot_password_salutation")}</h2>

        {isSuccess ? (
          <span className="text-success">
            A reset link has been sent to your mail. Kindly check to
            continue..."
          </span>
        ) : isError ? (
          <span className="text-danger">{error?.response?.data?.error}</span>
        ) : null}
        <Form onSubmit={handleSubmit} className="mt-8 mb-8">
          <div className="mb-4">
            <Form.Label htmlFor="registerEmail">Email</Form.Label>
            <Form.Control
              id="email"
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="Email to receive reset link"
            />
            <span className="small text-danger">
              {errors.email && "Email is required"}{" "}
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
                  <FontAwesomeIcon icon={faSignInAlt} className="me-2" />{" "}
                  {i18next.t("reset")}
                  {i18next.t("password")}
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
