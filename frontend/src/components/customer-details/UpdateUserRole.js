import React, { useState } from "react"
import Joi from "joi-browser"
import validation from "../../helpers/validation"
import { Container, Row, Col, Breadcrumb, Form, Button } from "react-bootstrap"
import { ButtonLoader } from "../globals/Loaders"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-regular-svg-icons"
import country from "../../data/countries.json"
import {
  UpdateRoleData,
  UpdateUserData,
} from "../../hooks/requests/usermanagementHook"
import APILoader from "../../components/globals/Loaders"
import i18next from "i18next"

export const ChangeUserRole = () => {
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

  //-------Updating user role--------//
  //component states
  const [formdata, setFormdata] = useState(__selected_customer?.role)
  console.log("current", formdata)

  const [errors, setErrors] = useState({})

  //Form inputs event handler
  const handleChange = (value) => {
    var newrole = value.target.value
    console.log("new role", newrole)
    setFormdata(newrole)

    const newroledata = {
      role: newrole,
      id: __selected_customer?._id,
    }

    if (newrole !== null) {
      sendroledata(newroledata)
    }
  }

  //on error before,  during,  after update
  const onError = (error) => {
    console.log("error", error)
  }

  const onSuccess = (data) => {
    console.log("sucesss :", data)
  }

  //API request handler
  const {
    mutate: sendroledata,
    error,
    isSuccess,
    isError,
    isLoading,
  } = UpdateRoleData(onSuccess, onError)

  return (
    <Form className="text-right">
      <div className="col-md-12">
        <Form.Label htmlFor="registerName mb-0">
          {i18next.t("change_role")}
        </Form.Label>
        <Form.Select
          id="role"
          onChange={(value) => handleChange(value)}
          name="role"
          className="p-1 mt-0 w-100"
          value={formdata}
          disabled={isLoading}
        >
          <option disabled>Select a role</option>
          <option value="admin">admin</option>
          <option value="user">user</option>
        </Form.Select>
        {isLoading ? (
          <small className="small text-dark">Changing role...</small>
        ) : isSuccess ? (
          <small className="small text-success">
            Role changed successfully...
          </small>
        ) : isError ? (
          <small className="small text-danger">
            {error?.response?.data?.error}
          </small>
        ) : null}
      </div>
    </Form>
  )
}
