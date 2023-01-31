import React from "react"
import { Container, Row, Col, Breadcrumb, Form, Button } from "react-bootstrap"

import Link from "next/link"
import CustomerSidebar from "../components/CustomerSidebar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-regular-svg-icons"
export async function getStaticProps() {
  return {
    props: {
      title: "Customer account",
    },
  }
}

const CustomerAccount = () => {
  const [formInputs, setFormInputs] = React.useState({})
  const onChange = (e) => {
    const value = e.target.value
    setFormInputs({ ...formInputs, [e.target.name]: value })
  }
  return (
    <React.Fragment>
      <section className="hero py-6">
        <Container>
          <Breadcrumb>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Your addresses</Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content">
            <h1 className="hero-heading mb-3">Your addresses</h1>
            <div>
              <p className="lead text-muted">
                Maecenas sollicitudin. In rutrum. In convallis. Nunc tincidunt
                ante vitae massa. Cras pede libero, dapibus nec, pretium sit
                amet, tempor quis. Fusce dui leo, imperdiet in.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="pb-6">
        <Container>
          <Row>
            <Col lg="8" xl="9" className="mb-5 mb-lg-0">
              <div className="mb-5">
                <h3 className="mb-5">Change your password</h3>
                <Form>
                  {passwordInputs.map((inputsblock, index) => (
                    <Row key={index}>
                      {inputsblock.map((input) => (
                        <Col sm="6" key={input.name}>
                          <div className="mb-4">
                            <Form.Label for={input.name}>
                              {input.label}
                            </Form.Label>
                            <Form.Control
                              type={input.type}
                              id={input.name}
                              value={formInputs[input.name] || ""}
                              onChange={(e) => onChange(e)}
                              autoComplete={input.autocomplete}
                            />
                          </div>
                        </Col>
                      ))}
                    </Row>
                  ))}
                  <div className="mt-4">
                    <Button variant="dark" type="submit">
                      <FontAwesomeIcon icon={faSave} className="me-2" />
                      Change password
                    </Button>
                  </div>
                </Form>
              </div>
              <hr className="mb-5" />
              <h3 className="mb-5">Personal details</h3>
              <Form>
                {personalInputs.map((inputsblock, index) => (
                  <Row key={index}>
                    {inputsblock.map((input) => (
                      <Col sm="6" md={input.md} key={input.name}>
                        <div className="mb-4">
                          <Form.Label for={input.name}>
                            {input.label}
                          </Form.Label>
                          <Form.Control
                            type={input.type}
                            id={input.name}
                            value={formInputs[input.name] || ""}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                ))}
                <div className="mt-4">
                  <Button variant="dark" type="submit">
                    <FontAwesomeIcon icon={faSave} className="me-2" />
                    Save changes
                  </Button>
                </div>
              </Form>
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
      name: "firstname",
      type: "text",
    },
    {
      label: "Lastname",
      name: "lastname",
      type: "text",
    },
  ],
  [
    {
      label: "Company",
      name: "company",
      type: "text",
    },
    {
      label: "Street",
      name: "street",
      type: "text",
    },
  ],
  [
    {
      label: "Company",
      name: "company2",
      type: "text",
      md: 3,
    },
    {
      label: "ZIP",
      name: "zip",
      type: "text",
      md: 3,
    },
    {
      label: "State",
      name: "state",
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
