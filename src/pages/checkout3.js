import React from "react"
import { Container, Row, Col, Breadcrumb, Nav } from "react-bootstrap"

import OrderSummary from "../components/OrderSummary"
import FormCheckout from "../components/FormCheckout"
import Link from "next/link"
export async function getStaticProps() {
  return {
    props: {
      title: "Checkout five steps",
      checkout: true,
    },
  }
}

const Checkout3 = () => {
  return (
    <React.Fragment>
      <section className="hero py-6">
        <Container>
          <Breadcrumb>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Checkout </Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content">
            <h1 className="hero-heading">Checkout</h1>
            <div>
              <p className="lead text-muted">Choose the payment method.</p>
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <Nav variant="pills" className="custom-nav mb-5">
                <Nav.Item className="w-25">
                  <Link href="/checkout1" passHref>
                    <Nav.Link className="text-sm" href="/checkout1">
                      Address
                    </Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item className="w-25">
                  <Link href="/checkout2" passHref>
                    <Nav.Link className="text-sm">Delivery Method</Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item className="w-25">
                  <Link href="/checkout3" passHref>
                    <Nav.Link className="text-sm" active>
                      Payment Method
                    </Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item className="w-25">
                  <Nav.Link className="text-sm disabled" href="#">
                    Order Review
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <FormCheckout
                step={3}
                prev={["Back to the delivery method", "/checkout2"]}
                next={["Continue to order review", "/checkout4"]}
              />
            </Col>
            <Col lg="4">
              <OrderSummary />
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Checkout3
