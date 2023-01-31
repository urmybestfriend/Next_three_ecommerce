import React from "react"
import { Container, Row, Col, Breadcrumb, Nav } from "react-bootstrap"

import OrderSummary from "../components/OrderSummary"
import FormCheckout from "../components/FormCheckout"
import Link from "next/link"
import { FormContext } from "../components/FormContext"
export async function getStaticProps() {
  return {
    props: {
      title: "Checkout five steps",
      checkout: true,
    },
  }
}

const Checkout4 = () => {
  const [formInputs, setFormInputs] = React.useContext(FormContext)

  React.useEffect(() => {
    setFormInputs({
      ...formInputs,
      cart: JSON.parse(localStorage.getItem("cart")),
    })
  }, [])
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
              <p className="lead text-muted">Please review your order.</p>
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
                    <Nav.Link className="text-sm">Payment Method</Nav.Link>
                  </Link>
                </Nav.Item>
                <Nav.Item className="w-25">
                  <Link href="/checkout4" passHref>
                    <Nav.Link className="text-sm" active>
                      Order Review
                    </Nav.Link>
                  </Link>
                </Nav.Item>
              </Nav>
              <FormCheckout
                step={4}
                prev={["Back to the payment method", "/checkout3"]}
                next={["Place an order", "/checkout-confirmed"]}
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

export default Checkout4
