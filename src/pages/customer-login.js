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
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons"
export async function getStaticProps() {
  return {
    props: {
      title: "Customer login",
    },
  }
}

const CustomerLogin = () => {
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
            <h1 className="hero-heading mb-3">Customer zone</h1>
            <div>
              <p className="text-muted">
                You can use the navbar-modal link or this page for customers'
                sign in.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="pb-5">
        <Container>
          <Row>
            <Col lg="5">
              <Card>
                <Card.Header className="py-4 px-5">
                  <h5 className="mb-0">Login</h5>
                </Card.Header>
                <Card.Body className="p-5">
                  <p className="lead">Already our customer?</p>
                  <p className="text-muted text-sm">
                    Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas. Vestibulum tortor quam,
                    feugiat vitae, ultricies eget, tempor sit amet.
                  </p>
                  <hr className="my-4" />
                  <Form action="/customer-orders">
                    <div className="mb-4">
                      <Form.Label htmlFor="emailLogin">Email</Form.Label>
                      <Form.Control id="emailLogin" type="text" />
                    </div>
                    <div className="mb-4">
                      <Form.Label htmlFor="passwordLogin">Password</Form.Label>
                      <Form.Control id="passwordLogin" type="password" />
                    </div>
                    <Button variant="dark" type="submit">
                      <FontAwesomeIcon icon={faSignInAlt} className="me-2" />{" "}
                      Log in
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={{ span: 5, offset: 1 }}>
              <Card>
                <Card.Header className="py-4 px-5">
                  <h5 className="mb-0">New account</h5>
                </Card.Header>
                <Card.Body className="p-5">
                  <p className="lead">Not our registered customer yet?</p>
                  <p className="text-muted text-sm">
                    With registration with us new world of fashion, fantastic
                    discounts and much more opens to you! The whole process will
                    not take you more than a minute!
                  </p>
                  <p className="text-muted text-sm">
                    If you have any questions, please feel free to{" "}
                    <Link href="contact.html">
                      <a>contact us</a>
                    </Link>
                    , our customer service center is working for you 24/7.
                  </p>
                  <hr className="my-4" />
                  <Form action="/customer-orders">
                    <div className="mb-4">
                      <Form.Label htmlFor="name">Name</Form.Label>
                      <Form.Control id="name" type="text" />
                    </div>
                    <div className="mb-4">
                      <Form.Label htmlFor="emailSignup">Email</Form.Label>
                      <Form.Control id="emailSignup" type="text" />
                    </div>
                    <div className="mb-4">
                      <Form.Label htmlFor="passwordSignup">Password</Form.Label>
                      <Form.Control id="passwordSignup" type="password" />
                    </div>
                    <Button variant="dark" type="submit">
                      <FontAwesomeIcon icon={faUser} className="me-2" />{" "}
                      Register
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

export default CustomerLogin
