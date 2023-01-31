import React from "react"
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Collapse,
  Form,
  Button,
} from "react-bootstrap"

import Link from "next/link"
import CustomerSidebar from "../components/CustomerSidebar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-regular-svg-icons"
export async function getStaticProps() {
  return {
    props: {
      title: "Customer addresses",
    },
  }
}

const CustomerAddresses = () => {
  const [formInputs, setFormInputs] = React.useState({})
  const [collapse, setCollapse] = React.useState(false)
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
          </div>
        </Container>
      </section>
      <section className="pb-6">
        <Container>
          <Row>
            <Col lg="8" xl="9" className="mb-5 mb-lg-0">
              {inputs.map((block) => (
                <Collapse
                  key={block.name}
                  in={block.collapse ? collapse : true}
                >
                  <div>
                    <h3 className={block.titleclass}>{block.name}</h3>
                    {block.inputs && (
                      <Row>
                        {block.inputs.map((input, index) => (
                          <React.Fragment key={index}>
                            {input.type === "text" && (
                              <Col md={6} key={index} className="mb-4">
                                <Form.Label htmlFor={input.name}>
                                  {input.label}
                                </Form.Label>
                                <Form.Control
                                  type={input.type}
                                  name={input.name}
                                  placeholder={input.placeholder}
                                  id={input.name}
                                  value={formInputs[input.name] || ""}
                                  onChange={(e) => onChange(e)}
                                />
                              </Col>
                            )}
                            {input.type === "password" && (
                              <Col md={6} key={index} className="mb-4">
                                <Form.Label htmlFor={input.name}>
                                  {input.label}
                                </Form.Label>
                                <Form.Control
                                  type={input.type}
                                  name={input.name}
                                  id={input.name}
                                  value={formInputs[input.name] || ""}
                                  onChange={(e) => onChange(e)}
                                />
                              </Col>
                            )}
                            {input.toggleshipping && (
                              <Col xs={12} key={index} className="mb-4 mt-3">
                                <Form.Check
                                  id={input.name}
                                  type={input.type}
                                  name={input.name}
                                  onChange={() => setCollapse(!collapse)}
                                  label={input.label}
                                />
                              </Col>
                            )}
                          </React.Fragment>
                        ))}
                      </Row>
                    )}
                  </div>
                </Collapse>
              ))}
              <div className="mt-4 mb-4">
                <Button variant="dark" type="submit">
                  <FontAwesomeIcon icon={faSave} className="me-2" />
                  Save changes
                </Button>
              </div>
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

export default CustomerAddresses

const inputs = [
  {
    name: "Invoice address",
    titleclass: "mb-4",
    inputs: [
      {
        label: "Full Name",
        name: "fullname_invoice",
        placeholder: "Joe Black",
        type: "text",
      },
      {
        label: "Email Address",
        name: "emailaddress_invoice",
        placeholder: "joe.black@gmail.com",
        type: "text",
      },
      {
        label: "Street",
        name: "street_invoice",
        placeholder: "123 Main St.",
        type: "text",
      },
      {
        label: "City",
        name: "city_invoice",
        placeholder: "City",
        type: "text",
      },
      {
        label: "ZIP",
        name: "zip_invoice",
        placeholder: "Postal code",
        type: "text",
      },
      {
        label: "State",
        name: "state_invoice",
        placeholder: "State",
        type: "text",
      },
      {
        label: "Phone Number",
        name: "phonenumber_invoice",
        placeholder: "Phone Number",
        type: "text",
      },
      {
        label: "Use a different shipping address",
        name: "show-shipping-address",
        type: "checkbox",
        toggleshipping: true,
      },
    ],
  },
  {
    name: "Shipping address",
    titleclass: "my-4",
    collapse: true,
    inputs: [
      {
        label: "Full Name",
        name: "shipping_fullname_invoice",
        placeholder: "Joe Black",
        type: "text",
      },
      {
        label: "Email Address",
        name: "shipping_emailaddress_invoice",
        placeholder: "joe.black@gmail.com",
        type: "text",
      },
      {
        label: "Street",
        name: "shipping_street_invoice",
        placeholder: "123 Main St.",
        type: "text",
      },
      {
        label: "City",
        name: "shipping_city_invoice",
        placeholder: "City",
        type: "text",
      },
      {
        label: "ZIP",
        name: "shipping_zip_invoice",
        placeholder: "Postal code",
        type: "text",
      },
      {
        label: "State",
        name: "shipping_state_invoice",
        placeholder: "State",
        type: "text",
      },
      {
        label: "Phone Number",
        name: "shipping_phonenumber_invoice",
        placeholder: "Phone Number",
        type: "text",
      },
    ],
  },
]
