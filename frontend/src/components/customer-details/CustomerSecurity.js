import React, { useState } from "react"
import Joi from "joi-browser"
import validation from "../../helpers/validation"
import { Form, Button } from "react-bootstrap"
import { ButtonLoaderLight } from "../globals/Loaders"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-regular-svg-icons"
import { UpdatePasswordData } from "../../hooks/requests/profileHook"
import i18next from "i18next"

export const UserSecurityData = ({ _selected_customer }) => {
  //component states
  const [formdata, setFormdata] = useState({
    oldpassword: "",
    newpassword: "",
    confirm_password: "",
  })
  const [errors, setErrors] = useState({})

  //defined validation schema
  const schema = {
    oldpassword: Joi.string().required(),
    newpassword: Joi.string().required(),
    confirm_password: Joi.string().required().valid(Joi.ref("newpassword")),
  }

  //Form inputs event handler
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  const passwordupdate = {
    oldpassword: formdata?.oldpassword,
    newpassword: formdata?.newpassword,
  }

  //form data submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validation(formdata, schema)
    setErrors(errors || {})
    if (!errors) {
      sendupdatepassword(passwordupdate)
    } else {
      console.log(errors)
    }
  }

  //on error before,  during,  after update
  const onError = (error) => {
    console.log("error", error)
  }

  //on successful password update
  const onSuccess = (data) => {
    console.log("data", data)
  }

  //API request handler
  const {
    mutate: sendupdatepassword,
    error,
    isSuccess,
    isError,
    isLoading,
  } = UpdatePasswordData(onSuccess, onError)
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="mt-2 mb-1 col-md-12">
          <div className="row mb-4">
            <div className="col-md-6">
              <Form.Label htmlFor="oldpassword mb-0">
                {i18next.t("old")} {i18next.t("password")}
              </Form.Label>
              <Form.Control
                id="oldpassword"
                type="password"
                onChange={handleChange}
                name="oldpassword"
                className="p-1 mt-0"
                placeholder="Enter your old password"
              />
              <small className="small text-danger">
                {errors.oldpassword && "Please enter your old password"}{" "}
              </small>
            </div>
            <div className="col-md-6"></div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Label htmlFor="newpassword mb-0">
                {i18next.t("new")} {i18next.t("password")}
              </Form.Label>
              <Form.Control
                id="newpassword"
                type="password"
                onChange={handleChange}
                name="newpassword"
                className="p-1 mt-0"
                placeholder="Enter your new password"
              />
              <small className="small text-danger">
                {errors.newpassword && "Please enter your new password"}{" "}
              </small>
            </div>
            <div className="col-md-6">
              <Form.Label htmlFor="confirm_password mb-0">
                {i18next.t("confirm")} {i18next.t("password")}
              </Form.Label>
              <Form.Control
                id="confirm_password"
                type="password"
                onChange={handleChange}
                name="confirm_password"
                className="p-1 mt-0"
                placeholder="Confirm your new password"
              />
              <small className="small text-danger">
                {errors.confirm_password &&
                  "Confirm password cannot be empty and must match your password"}{" "}
              </small>
            </div>
          </div>
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
                  Password updated successfully.
                </span>
              ) : isError &&
                error?.response?.data !== undefined &&
                error.response.status === 401 ? (
                <span className="text-danger">
                  Your session may have expired. Please login again to update
                  our password.
                </span>
              ) : isError &&
                error?.response?.data !== undefined &&
                error.response.status !== 401 ? (
                <span className="text-danger">
                  An error occured: {error?.response?.data?.error}
                </span>
              ) : isError && error?.response?.data === undefined ? (
                <span className="text-danger">
                  An error occured: {error.message}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}
