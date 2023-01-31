import React from "react"
import { Container, Row, Col, Breadcrumb, Button, Alert } from "react-bootstrap"

import { FormContext } from "../components/FormContext"

import Icon from "../components/Icon"

import Link from "next/link"
export async function getStaticProps() {
  return {
    props: {
      title: "Checkout confirmed",
      checkout: true,
    },
  }
}

const CheckoutConfirmed = () => {
  const [formInputs, setFormInputs] = React.useContext(FormContext) // Checkout inputs context
  console.log(formInputs) // Log of filled inputs and cart items
  const today = new Date() // Demo date
  const day = today.getDate() // Demo day
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ] // DEMO ONLY - English month names
  const month = months[today.getMonth()] // Demo month
  const year = today.getFullYear() // Demo year

  // Remove on production
  const finalPrice = formInputs.cart
    ? formInputs.shipping[2] +
      formInputs.cart.reduce(
        (sum, { price, quantity }) => sum + price * quantity,
        0
      )
    : 450

  // Uncomment on production - final sum of cart items plus shipping
  // const finalPrice = formInputs.shipping[2] + formInputs.cart.reduce((sum, { price, quantity }) => sum + price * quantity, 0)

  // Remove on production
  const shipping = formInputs.shipping ? formInputs.shipping[1] : "DHL"

  // Uncomment on production - selected shipping option
  //const shipping = formInputs.shipping[1]

  // Order details - fill Order no. & date with real data on production
  const order = [
    {
      label: "Order no.",
      value: "2019",
    },
    {
      label: "Date",
      value: `${month} ${day}, ${year}`,
    },
    {
      label: "Total",
      value: "$" + finalPrice,
    },
    {
      label: "Shipping",
      value: shipping,
    },
  ]
  return (
    <React.Fragment>
      <section className="hero py-6">
        <Container>
          <Breadcrumb>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Order confirmed</Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content">
            <h1 className="hero-heading">Order confirmed</h1>
            <Alert variant="success" className="d-flex align-items-center">
              <Icon
                icon="checked-circle-1"
                className="w-3rem h-3rem svg-icon-light flex-shrink-0 me-3"
              />
              Your order is confirmed
            </Alert>
          </div>
        </Container>
      </section>
      <section className="pb-6">
        <Container>
          <p className="lead">Thank you, Julie. Your order is confirmed.</p>
          <p className="lead mb-5">
            Your order hasn't shipped yet but we will send you ane email when it
            does.
          </p>
          <p className="mb-6">
            <Link href="/customer-order" passHref>
              <Button variant="outline-dark">View or manage your order</Button>
            </Link>
          </p>
          <div className="p-5 bg-gray-100">
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
          </div>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default CheckoutConfirmed
