import React, { useState } from "react"
import Joi from "joi-browser"
import validation from "../../helpers/validation"
import { SendLoginCredentials } from "../../hooks/requests/authHook"
import { passwordValidate } from "../../helpers/constants"

import { Modal, Nav } from "react-bootstrap"
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
import { useRouter } from "next/router"
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons"
import { ButtonLoader } from "../globals/Loaders"
import Cookies from "universal-cookie"
import i18next from "i18next"

export default function UserLogin({ closeForm }) {
  //initialize next router
  const router = useRouter()

  //initialize cookie
  const cookies = new Cookies()

  //component states
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    rememberme: true,
  })
  const [errors, setErrors] = useState({})

  //defined validation schema
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    rememberme: Joi.optional(),
  }

  //Form inputs event handler
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  //data to submit
  const loginData = {
    email: formdata?.email,
    password: formdata?.password,
  }

  //form data submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validation(formdata, schema)
    setErrors(errors || {})
    // return
    if (!errors) {
      loginUser(loginData)
    } else {
      console.log(errors)
    }
  }

  //on success sign up
  const onSuccess = (data) => {
    if (formdata?.rememberme === "on") {
      cookies.set("REM_MALT_AC_USER", true)
    }
    cookies.set("MALT_AC_TOK", data?.data?.accessToken, {
      expires: new Date(Date.now() + 90000000),
    })
    cookies.set("MALT_AC_REF", data?.data?.refreshToken, {
      expires: new Date(Date.now() + 90000000),
    })
    router.reload()
    closeForm()
  }

  const onError = (error) => {
    console.log("error", error)
  }

  //API request handler
  const {
    mutate: loginUser,
    error,
    isSuccess,
    isError,
    isLoading,
  } = SendLoginCredentials(onSuccess, onError)

  return (
    <>
      <p className="text-muted">
        <span>{i18next.t("login_salutation")}</span>
      </p>
      {isSuccess ? (
        <span className="text-success">Login successful. Redirecting...</span>
      ) : isError ? (
        <span className="text-danger">{error?.response?.data?.error}</span>
      ) : null}
      <Form>
        <div className="mb-2">
          <Form.Label htmlFor="registerEmail">Email</Form.Label>
          <Form.Control
            id="registerEmail"
            type="email"
            onChange={handleChange}
            name="email"
            className="p-1"
          />
          <span className="small text-danger">
            {errors.email && "A valid e-mail address is required"}{" "}
          </span>
        </div>

        <div className="mb-4">
          <Row>
            <Col>
              <Form.Label htmlFor="loginPassword">
                {i18next.t("password")}
              </Form.Label>
            </Col>
            <Col xs="auto">
              {" "}
              <Nav.Link
                href="/forgot-password"
                className={`nav-link-sm m-0`}
                eventKey="forgotpassword"
              >
                <Form.Text className="small text-primary" as="a">
                  {i18next.t("forgot_password")}?
                </Form.Text>{" "}
              </Nav.Link>
            </Col>
          </Row>
          <Form.Control
            id="registerPassword"
            type="password"
            onChange={handleChange}
            name="password"
            className="p-1"
          />
          <span className="small text-danger">
            {errors.password && "Should be at least 8 characters"}{" "}
          </span>
        </div>
        <div className="mb-4">
          <Form.Check
            type="checkbox"
            id="loginRemember"
            name="rememberme"
            defaultChecked={formdata?.rememberme}
            onChange={handleChange}
            label={
              <span className="text-sm text-muted">
                {i18next.t("remember_login")}?
              </span>
            }
          />
        </div>
        <div className="mb-4">
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading ? true : false}
            variant="outline-dark w-100"
          >
            {isLoading ? (
              <ButtonLoader />
            ) : (
              <>
                <FontAwesomeIcon icon={faSignInAlt} className="me-2" />{" "}
                {i18next.t("login")}
              </>
            )}
          </Button>
        </div>
      </Form>
    </>
  )
}
