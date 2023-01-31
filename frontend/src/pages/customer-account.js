import React, { useState } from "react"
import { Container, Row, Col, Breadcrumb, Form, Button } from "react-bootstrap"

import Link from "next/link"
import CustomerSidebar from "../components/CustomerSidebar"
import { useRouter } from "next/router"
import { UserInformationData } from "../hooks/requests/usermanagementHook"
import { UserBioData } from "../components/customer-details/BioData"
import { ChangeUserRole } from "../components/customer-details/UpdateUserRole"
import i18next from "i18next"

export async function getStaticProps() {
  return {
    props: {
      title: "Customer account",
    },
  }
}

const CustomerAccount = () => {
  //next router definition
  const router = useRouter()

  //get verfication token
  const queryParams = Object.keys(router.query)[0]
  console.log("query-params", queryParams)

  //get customer / user details
  const onError = (error) => {
    console.log("error", error)
  }

  const onSuccess = (data) => {
    // console.log("sucesss :", data)
  }

  //get user / customer request handler
  const {
    data: selected_user,
    isLoading,
    error,
    isSuccess,
  } = UserInformationData(onSuccess, onError, queryParams)
  var _selected_customer = selected_user?.data
  // console.log("init----", _selected_customer)

  return (
    <React.Fragment>
      <section className="hero py-6">
        <Container>
          <Breadcrumb>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>
              {i18next.t("your_addresses")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content">
            <h1 className="hero-heading mb-3">{i18next.t("your_addresses")}</h1>
            <div>
              <p className="lead text-muted">
                {_selected_customer?.zip}&nbsp;
                {_selected_customer?.city}
                {","}&nbsp; {_selected_customer?.country}
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
                  <h3 className="mb-5 ">{i18next.t("personal_details")}</h3>
                </div>
                <div className=" col-md-4">
                  {" "}
                  <ChangeUserRole />
                </div>
              </div>
              <UserBioData />
            </Col>
            <Col xl="3" lg="4" className="mb-5">
              <CustomerSidebar _selected_customer={_selected_customer} />
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default CustomerAccount
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
