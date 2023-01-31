import React, { useState } from "react"
import { Container, Row, Col, Breadcrumb, Form, Button } from "react-bootstrap"

import Link from "next/link"
import CustomerSidebar from "../components/CustomerSidebar"
import { UserSecurityData } from "../components/customer-details/CustomerSecurity"
import Cookies from "universal-cookie"
import { LoggedInUser } from "../hooks/requests/profileHook"
import i18next from "i18next"

export async function getStaticProps() {
  return {
    props: {
      title: "Customer security",
    },
  }
}

const CustomerSecurity = () => {
  //initialize cookie
  const cookies = new Cookies()

  //---Get logged in user profile for RBAC---//
  const onError = (error) => {
    console.log("error---?", error)
  }

  const onSuccess = (data) => {
    cookies.set("MALT_LOG_USR", data?.data)
  }

  //get user profile
  const { data: user_data } = LoggedInUser(onSuccess, onError)
  const logged_in_user = user_data?.data
  // console.log("profile-->", logged_in_user)

  return (
    <React.Fragment>
      <section className="hero py-6">
        <Container>
          <Breadcrumb>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>
              {i18next.t("your_security")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content">
            <h1 className="hero-heading mb-3">{i18next.t("your_security")}</h1>
            <div>
              <p className="lead text-muted">
                {logged_in_user?.zip}&nbsp;
                {logged_in_user?.city}
                {","}&nbsp; {logged_in_user?.country}
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="pb-6">
        <Container>
          <Row>
            <Col lg="8" xl="9" className="mb-5 mb-lg-0">
              <hr className="mb-5" />
              <div className="col-md-12 d-flex flex-row justify-content-between">
                <div className="col-md-6">
                  <h3 className="mb-5 ">{i18next.t("security_update")}</h3>
                </div>
                <div className=" col-md-4"> </div>
              </div>
              <UserSecurityData _selected_customer={logged_in_user} />
            </Col>
            <Col xl="3" lg="4" className="mb-5">
              <CustomerSidebar _selected_customer={logged_in_user} />
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default CustomerSecurity
const passwordInputs = [
  [
    {
      label: "Old password",
      name: "password_old",
      type: "password",
      autocomplete: "current-password",
    },
  ],
  [
    {
      label: "New password",
      name: "password_1",
      type: "password",
      autocomplete: "new-password",
    },
    {
      label: "Retype new password",
      name: "password_2",
      type: "password",
      autocomplete: "new-password",
    },
  ],
]
const personalInputs = [
  [
    {
      label: "Firstname",
      name: "firstName",
      type: "text",
    },
    {
      label: "Lastname",
      name: "lastName",
      type: "text",
    },
  ],
  [
    {
      label: "Company",
      name: "company",
      type: "text",
    },
  ],

  [
    {
      label: "ZIP",
      name: "zip",
      type: "text",
      md: 3,
    },
    {
      label: "City",
      name: "city",
      type: "select",
      md: 3,
    },
    {
      label: "Country",
      name: "country",
      type: "select",
      md: 3,
    },
    {
      label: "Telephone",
      name: "phone",
      type: "text",
    },
    {
      label: "Email",
      name: "emailAccount",
      type: "text",
    },
  ],
]
