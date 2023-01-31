import React from "react"
import { Container, Row, Col, Breadcrumb, Card } from "react-bootstrap"

import { FormContext } from "../components/FormContext"

import Link from "next/link"
import CartItems from "../components/CartItems"
import OrderSummary from "../components/OrderSummary"
import CustomerSidebar from "../components/CustomerSidebar"
export async function getStaticProps() {
  return {
    props: {
      title: "Customer order",
      checkout: true,
    },
  }
}

const CustomerOrder = () => {
  const [formInputs, setFormInputs] = React.useContext(FormContext)
  console.log(formInputs)
  const today = new Date()
  const day = today.getDate()
  const month = today.toLocaleString("default", { month: "short" })
  const year = today.getFullYear()
  const finalPrice = formInputs.cart
    ? 10 +
      formInputs.cart.reduce(
        (sum, { price, quantity }) => sum + price * quantity,
        0
      )
    : 450
  const shipping = formInputs.shipping ? formInputs.shipping[1] : "DHL"
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
            <Link href="/customer-orders" passHref>
              <Breadcrumb.Item>Orders</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Order #1735</Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content">
            <h1 className="hero-heading">Order #1735</h1>
            <div>
              <p className="lead text-muted">
                Order #1735 was placed on <strong>22/06/2013</strong> and is
                currently <strong>Being prepared</strong>.
              </p>
              <p className="text-muted">
                If you have any questions, please feel free to{" "}
                <Link href="/contact">
                  <a>contact us</a>
                </Link>
                , our customer service center is working for you 24/7.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="pb-6">
        <Container>
          <Row>
            <Col lg="8" xl="8">
              <CartItems review />
              <Row className="my-5">
                <Col md="6">
                  <OrderSummary />
                </Col>
                <Col md="6">
                  <Card className="mb-4">
                    <Card.Header>
                      <h5 className="mb-0"> Invoice address</h5>
                    </Card.Header>
                    <Card.Body className="py-4">
                      <Card.Text className="text-muted">
                        John Brown
                        <br />
                        13/25 New Avenue
                        <br />
                        New Heaven
                        <br />
                        45Y 73J
                        <br />
                        England
                        <br />
                        <strong>Great Britain</strong>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className="mb-5">
                    <Card.Header>
                      <h5 className="mb-0"> Invoice address</h5>
                    </Card.Header>
                    <Card.Body className="py-4">
                      <Card.Text className="text-muted">
                        John Brown
                        <br />
                        13/25 New Avenue
                        <br />
                        New Heaven
                        <br />
                        45Y 73J
                        <br />
                        England
                        <br />
                        <strong>Great Britain</strong>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xl="3" lg="4" className="mb-5">
              <CustomerSidebar />
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default CustomerOrder
