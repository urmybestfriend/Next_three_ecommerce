import React from "react"
import { Container, Row, Col, Breadcrumb, Button, Alert } from "react-bootstrap"
import i18next from "i18next"
import Icon from "../components/Icon"
import Link from "next/link"

import Cookies from "universal-cookie"

export async function getStaticProps() {
  return {
    props: {
      title: "Checkout confirmed",
      checkout: true,
    },
  }
}

const CheckoutConfirmed = () => {
  //initialize cookie
  const cookies = new Cookies()
  var customer = cookies.get("MALT_LOG_USR")

  return (
    <React.Fragment>
      <section className="hero py-6">
        <Container>
          <Breadcrumb>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>
              {" "}
              {i18next.t("order")} {i18next.t("confirmed")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content">
            <h1 className="hero-heading">
              {i18next.t("order")} {i18next.t("confirmed")}
            </h1>
            <Alert variant="success" className="d-flex align-items-center">
              <Icon
                icon="checked-circle-1"
                className="w-3rem h-3rem svg-icon-light flex-shrink-0 me-3"
              />
              {i18next.t("order_confirmation_success")}
            </Alert>
          </div>
        </Container>
      </section>
      <section className="pb-6">
        <Container>
          <p className="lead">
            {i18next.t("thank_you")}, {customer?.firstName}.{" "}
            {i18next.t("order_confirmation_success")}.
          </p>
          {/* <p className="lead mb-5">
            Your order hasn't shipped yet but we will send you ane email when it
            does.
          </p> */}
          <p className="col-md-12 d-flex align-items-center justify-content-between mb-6">
            <Link href="/customer-orders" passHref>
              <Button variant="outline-dark">
                {i18next.t("manage_orders")}
              </Button>
            </Link>
            <Link href="/customer-order" passHref>
              <Button variant="outline-dark bg-dark text-white">
                {i18next.t("make_payment")}
              </Button>
            </Link>
          </p>
          {/* <div className="p-5 bg-gray-100">
            <Row>
              {order.map((item) => (
                // Order details
                <Col key={item.label} xs="6" lg="3" className="mb-5 mb-lg-0">
                  <div className="text-sm text-uppercase text-muted mb-3">
                    {item.label}
                  </div>
                  <span className="h5">{item.value}</span>
                </Col>
              ))}
            </Row>
          </div> */}
        </Container>
      </section>
    </React.Fragment>
  )
}

export default CheckoutConfirmed
