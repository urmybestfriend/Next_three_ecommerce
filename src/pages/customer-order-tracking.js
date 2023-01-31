import React from "react"
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Card,
  Form,
  Button,
} from "react-bootstrap"

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarked } from "@fortawesome/free-solid-svg-icons"
export async function getStaticProps() {
  return {
    props: {
      title: "Checkout order tracking",
    },
  }
}

const CustomerOrderTracking = () => {
  return (
    <React.Fragment>
      <section className="hero py-6">
        <Container>
          <Breadcrumb>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Customer zone</Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content">
            <h1 className="hero-heading mb-3">Track your order</h1>
            <div>
              <p className="text-muted mb-0">
                To track your order please enter your Order ID in the box below
                and press the "Track" button. This was given to you on your
                receipt and in the confirmation email you should have received.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="pb-6">
        <Container>
          <Row>
            <Col lg="5">
              <Card>
                <Card.Body className="p-5">
                  <Form>
                    <div className="mb-4">
                      <Form.Label htmlFor="orderId">Order ID</Form.Label>
                      <Form.Control
                        id="orderId"
                        type="text"
                        aria-describedby="orderIdHelp"
                      />
                      <Form.Text id="orderIdHelp" className="text-muted">
                        Found in your order confirmation email.
                      </Form.Text>
                    </div>
                    <div className="mb-4">
                      <Form.Label htmlFor="email">Billing email</Form.Label>
                      <Form.Control
                        id="email"
                        type="email"
                        aria-describedby="emailHelp"
                      />
                      <Form.Text id="emailHelp" className="text-muted">
                        Found in your order confirmation email.
                      </Form.Text>
                    </div>
                    <Button variant="dark" type="submit">
                      <FontAwesomeIcon icon={faMapMarked} className="me-2" />{" "}
                      Track
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default CustomerOrderTracking
