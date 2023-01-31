import React, { useState } from "react"
import Joi, { join } from "joi-browser"
import validation from "../../helpers/validation"

import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Form, Tooltip, OverlayTrigger } from "react-bootstrap"
import { SignupUserData } from "../../hooks/requests/authHook"
import { ButtonLoader } from "../globals/Loaders"
import country from "../../data/countries.json"
import i18next from "i18next"

export default function UserRegistration({ closeForm, SignUpSuccess }) {
  //component states
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    zip: "",
    company: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  })
  const [errors, setErrors] = useState({})

  //defined validation schema
  const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    zip: Joi.string(),
    company: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    password: Joi.string().required().min(8),
    confirm_password: Joi.string().required().valid(Joi.ref("password")),
  }

  //Form inputs event handler
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  const registrationData = {
    firstName: formdata?.firstName,
    lastName: formdata?.lastName,
    country: formdata?.country,
    city: formdata?.city,
    zip: formdata?.zip,
    company: formdata?.company,
    email: formdata?.email,
    phone: formdata?.phone,
    password: formdata?.password,
  }

  //form data submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validation(formdata, schema)
    setErrors(errors || {})
    if (!errors) {
      registerUser(registrationData)
    } else {
      console.log(errors)
    }
  }

  //on success sign up
  const onSuccess = (data) => {
    SignUpSuccess()
    setTimeout(closeForm, 1500)
  }

  const onError = (error) => {
    console.log("error", error)
  }

  //API request handler
  const {
    mutate: registerUser,
    error,
    isSuccess,
    isError,
    isLoading,
  } = SignupUserData(onSuccess, onError)

  return (
    <>
      <p className="text-muted m-0">
        <span>{i18next.t("signup_salutation")}.</span>
      </p>
      {isError ? (
        <span className="text-danger">{error?.response?.data?.error}</span>
      ) : null}
      <Form>
        <div className="mt-2 mb-1 col-md-12">
          <div className="row">
            <div className="col-md-6">
              <Form.Label htmlFor="registerName mb-0">
                {i18next.t("firstname")}
              </Form.Label>
              <Form.Control
                id="firstName"
                type="text"
                onChange={handleChange}
                name="firstName"
                className="p-1 mt-0"
              />
              <small className="small text-danger">
                {errors.firstName && "First name is required"}{" "}
              </small>
            </div>
            <div className="col-md-6">
              <Form.Label htmlFor="registerName mb-0">
                {i18next.t("lastname")}
              </Form.Label>
              <Form.Control
                id="lastName"
                type="text"
                onChange={handleChange}
                name="lastName"
                className="p-1 mt-0"
              />
              <small className="small text-danger">
                {errors.lastName && "Last name is required"}{" "}
              </small>
            </div>
          </div>
        </div>
        <div className="mb-1 col-md-12">
          <div className="row">
            <div className="col-md-6">
              <Form.Label htmlFor="registerName mb-0">
                {i18next.t("country")}
              </Form.Label>
              <Form.Select
                id="country"
                onChange={handleChange}
                name="country"
                className="p-1 mt-0"
              >
                <option disabled selected>
                  Select a country
                </option>
                {country.map((country, index) => (
                  <option key={index + 1} value={country?.name}>
                    {country?.name}
                  </option>
                ))}
              </Form.Select>
              <small className="small text-danger">
                {errors.country && "A country is required"}{" "}
              </small>
            </div>
            <div className="col-md-6">
              <Form.Label htmlFor="registerName mb-0">
                {i18next.t("city")}
              </Form.Label>
              <Form.Control
                id="city"
                type="text"
                onChange={handleChange}
                name="city"
                className="p-1 mt-0"
              />
              <small className="small text-danger">
                {errors.city && "A city is required"}{" "}
              </small>
            </div>
          </div>
        </div>
        <div className="mb-1 col-md-12">
          <div className="row">
            <div className="col-md-6">
              <Form.Label htmlFor="registerName mb-0">
                {i18next.t("zip")}
              </Form.Label>
              <Form.Control
                id="zip"
                type="text"
                onChange={handleChange}
                name="zip"
                className="p-1 mt-0"
              />
            </div>
            <div className="col-md-6">
              <Form.Label htmlFor="registerName mb-0">
                {i18next.t("company")}
              </Form.Label>
              <Form.Control
                id="company"
                type="text"
                onChange={handleChange}
                name="company"
                className="p-1 mt-0"
              />
              <small className="small text-danger">
                {errors.company && "A company name is required"}{" "}
              </small>
            </div>
          </div>
        </div>
        <div className="mb-2">
          <Form.Label htmlFor="registerEmail">Email</Form.Label>
          <Form.Control
            id="email"
            type="email"
            onChange={handleChange}
            name="email"
            className="p-1 mt-0"
          />
          <small className="small text-danger">
            {errors.email && "A valid e-mail address is required"}{" "}
          </small>
        </div>
        <div className="mb-2">
          <Form.Label htmlFor="phone">{i18next.t("phone")}</Form.Label>
          <Form.Control
            id="phone"
            type="phone"
            onChange={handleChange}
            name="phone"
            className="p-1 mt-0"
            placeholder="Eg: +123589945889"
          />
          <small className="small text-danger">
            {errors.phone && "Please enter your phone number"}{" "}
          </small>
        </div>
        <div className="mb-2">
          <Form.Label htmlFor="registerPassword">
            {i18next.t("password")}
          </Form.Label>
          <Form.Control
            id="registerPassword"
            type="password"
            onChange={handleChange}
            name="password"
            className="p-1 mt-0"
          />
          <small className="small text-danger">
            {errors.password && "Should be at least 8 characters"}{" "}
          </small>
        </div>
        <div className="mb-2">
          <Form.Label htmlFor="registerPassword">
            {i18next.t("confirm")} {i18next.t("password")}
          </Form.Label>
          <Form.Control
            id="registerPassword"
            type="password"
            onChange={handleChange}
            name="confirm_password"
            className="p-1 mt-0"
          />
          <small className="small text-danger">
            {errors.confirm_password &&
              "Cannot be empty and should match your password."}{" "}
          </small>
        </div>
        <div className="text-center mb-4 mt-4">
          <Button
            disabled={isLoading ? true : false}
            type="button"
            variant="outline-dark"
            className=" w-100"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <ButtonLoader />
            ) : (
              <>
                <FontAwesomeIcon icon={faUser} className="me-2" />
                {i18next.t("register")}
              </>
            )}
          </Button>
        </div>
      </Form>
    </>
  )
}
