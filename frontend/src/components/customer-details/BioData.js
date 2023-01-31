import React, { useState } from "react"
import Joi from "joi-browser"
import validation from "../../helpers/validation"
import { Container, Row, Col, Breadcrumb, Form, Button } from "react-bootstrap"
import { ButtonLoaderLight } from "../globals/Loaders"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-regular-svg-icons"
import country from "../../data/countries.json"
import { UpdateUserData } from "../../hooks/requests/usermanagementHook"
import i18next from "i18next"

export const UserBioData = ({}) => {
  var __selected_customer, __storageItem
  //get selected user data
  if (typeof window !== "undefined") {
    __storageItem = window.localStorage.getItem("__previewcustomer")
    __storageItem !== "undefined"
      ? (__selected_customer = JSON.parse(__storageItem))
      : null
  } else {
    console.log(null)
  }

  //component states
  const [formdata, setFormdata] = useState({
    firstName: __selected_customer?.firstName,
    lastName: __selected_customer?.lastName,
    country: __selected_customer?.country,
    city: __selected_customer?.city,
    zip: __selected_customer?.zip,
    company: __selected_customer?.company,
    email: __selected_customer?.email,
    phone: __selected_customer?.phone,
  })
  const [errors, setErrors] = useState({})

  //defined validation schema
  const schema = {
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    country: Joi.string().optional(),
    city: Joi.string().optional(),
    zip: Joi.string().optional(),
    company: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional(),
  }

  //Form inputs event handler
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  const newuserdata = {
    firstName: formdata?.firstName,
    lastName: formdata?.lastName,
    country: formdata?.country,
    city: formdata?.city,
    zip: formdata?.zip,
    company: formdata?.company,
    email: formdata?.email,
    phone: formdata?.phone,
    id: __selected_customer?._id,
  }

  //form data submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validation(formdata, schema)
    setErrors(errors || {})
    if (!errors) {
      sendupdateuser(newuserdata)
    } else {
      console.log(errors)
    }
  }

  //on error before,  during,  after update
  const onError = (error) => {
    console.log("error", error)
  }

  //on successful role update
  const onSuccess = (data) => {
    console.log("data", data)
  }

  //API request handler
  const {
    mutate: sendupdateuser,
    error,
    isSuccess,
    isError,
    isLoading,
  } = UpdateUserData(onSuccess, onError)
  return (
    <div>
      <Form onSubmit={handleSubmit}>
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
                defaultValue={formdata?.firstName}
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
                defaultValue={formdata?.lastName}
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
                value={formdata?.country}
              >
                <option disabled>Select a country</option>
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
                defaultValue={formdata?.city}
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
                defaultValue={formdata?.zip}
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
                defaultValue={formdata?.company}
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
            defaultValue={formdata?.email}
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
            defaultValue={formdata?.phone}
          />
          <small className="small text-danger">
            {errors.phone && "Please enter your phone number"}{" "}
          </small>
        </div>

        <div className="mt-4 col-md-12">
          <div className="row">
            <div className="col-md-8">
              <Button type="submit" variant="dark">
                {isLoading ? (
                  <ButtonLoaderLight />
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSave} className="me-2" />
                    {i18next.t("save")}
                  </>
                )}
              </Button>
            </div>
            <div className="col-md-4">
              {isSuccess ? (
                <span className="text-success">
                  User data updated successfully.
                </span>
              ) : isError ? (
                <span className="text-danger">
                  {error?.response?.data?.error}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}
