import React from "react"
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Button,
  Form,
  Collapse,
  Table,
} from "react-bootstrap"

import Link from "next/link"
import { CartContext } from "../components/CartContext"
import { FormContext } from "../components/FormContext"

export async function getStaticProps() {
  return {
    props: {
      title: "Checkout single-page",
      checkout: true,
    },
  }
}

const Checkout = () => {
  const [formInputs, setFormInputs] = React.useContext(FormContext) // Checkout inputs context
  const [cart] = React.useContext(CartContext) // Cart context
  const [collapse, setCollapse] = React.useState(false)
  const defaultShipping = Object.values(inputs.shipping[0]).slice(0, 3) // Default shipping option without name attr
  const defaultPayment = Object.values(inputs.payment[0]).slice(0, 2) // Default payment option without name and text attr
  const subTotal = cart.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  ) // Count price of cart items together

  const onChange = (e) => {
    // On input change
    const value = e.target.value
    setFormInputs({ ...formInputs, [e.target.name]: value })
  }
  const onRadioChange = (e, label, price) => {
    // On radio change
    const value = e.target.id
    setFormInputs({ ...formInputs, [e.target.name]: [value, label, price] })
  }

  React.useEffect(() => {
    !formInputs.shipping &&
      setFormInputs({
        ...formInputs,
        shipping: defaultShipping,
        payment: defaultPayment,
        cart: JSON.parse(localStorage.getItem("cart")),
      }) // If checkout inputs not set then set default shipping, default payment and cart items to checkout context
  }, [])

  const total = formInputs.shipping
    ? subTotal + formInputs.shipping[2]
    : subTotal + defaultShipping[2] // Total price including shipping fee. If checkout inputs not set then use default shipping price
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
              <p className="lead text-muted">
                Are you a returning customer?{" "}
                <Link href="/customer-login">
                  <a>Login</a>
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
      <Container className="pb-6">
        <Row>
          <Col lg="7" className="pe-xl-6">
            <Form action="/checkout-confirmed">
              {/* ADRESS INPUTS */}
              {inputs.adress.map((block) => (
                <Collapse
                  key={block.name}
                  in={block.collapse ? collapse : true}
                >
                  <div>
                    {block.title && (
                      <h5 className={block.titleclass}>{block.name}</h5>
                    )}
                    {block.inputs && (
                      <Row>
                        {block.inputs.map((input, index) => (
                          <React.Fragment key={index}>
                            {/* TEXT INPUT */}
                            {input.type === "text" && (
                              <div key={index} className="col-md-6 mb-4">
                                <Form.Label htmlFor={input.name}>
                                  {input.label}
                                </Form.Label>
                                <Form.Control
                                  className="form-control-underlined ps-0"
                                  type={input.type}
                                  name={input.name}
                                  placeholder={
                                    input.placeholder ? input.placeholder : ""
                                  }
                                  id={input.name}
                                  value={formInputs[input.name] || ""}
                                  onChange={(e) => onChange(e)}
                                />
                              </div>
                            )}
                            {/* END TEXT INPUT */}

                            {/* SHIPPING ADRESS TOGGLER */}
                            {input.toggleshipping && (
                              <div key={index} className="col-12 mt-3 mb-4">
                                <Form.Check
                                  id={input.name}
                                  type={input.type}
                                  name={input.name}
                                  onChange={() => setCollapse(!collapse)} // On change func
                                  label={input.label}
                                />
                              </div>
                            )}
                            {/* END SHIPPING ADRESS TOGGLER */}
                          </React.Fragment>
                        ))}
                      </Row>
                    )}
                  </div>
                </Collapse>
              ))}
              {/* END ADRESS INPUTS */}
            </Form>
          </Col>
          <Col lg="5">
            <h5 className="mb-5 text-primary">Order Summary</h5>
            <Table className="border-bottom border-dark mb-5">
              <tbody>
                {/* CART ITEMS */}
                {cart.map((item) => (
                  <tr key={item.name} className="text-sm">
                    <th className="py-4 fw-normal text-muted">
                      {item.name} <span>x {item.quantity}</span>
                    </th>
                    <td className="py-4 text-end text-muted">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
                {/* END CART ITEMS */}

                {/* SUB TOTAL */}
                <tr>
                  <th className="py-4 text-uppercase fw-normal text-sm align-bottom">
                    Order Subtotal{" "}
                  </th>
                  <td className="py-4 text-end text-muted">
                    ${subTotal.toFixed(2)}
                  </td>
                </tr>
                {/* END SUB TOTAL */}

                {/* SHIPPING INPUTS */}
                <tr>
                  <th className="py-5 border-dark" colSpan="2">
                    <div className="mb-4">Shipping and handling</div>
                    {inputs.shipping.map((input, index) => (
                      <div key={index} className="mb-1 ms-4">
                        <Form.Check
                          id={input.id}
                          type="radio"
                          name={input.name}
                          onChange={(e) =>
                            onRadioChange(e, input.label, input.price)
                          } // On change func
                          checked={
                            formInputs[input.name]
                              ? formInputs[input.name][0] === input.id
                              : index === 0
                          } // Checked input control, if first input checked by default
                          label={input.label}
                        />
                      </div>
                    ))}
                  </th>
                </tr>
                {/* END SHIPPING INPUTS */}

                {/* TOTAL */}
                <tr>
                  <th className="py-4 text-uppercase fw-normal border-dark align-bottom">
                    Total
                  </th>
                  <td className="py-4 text-end h3 fw-normal border-dark">
                    ${total.toFixed(2)}
                  </td>
                </tr>
                {/* END TOTAL */}

                {/* PAYMENT INPUTS */}
                {inputs.payment.map((input, index) => (
                  <tr key={index}>
                    <th
                      className={`${
                        index === 0 ? "pt-5 pb-4 border-dark" : ""
                      }  ${index !== 0 ? "py-4" : ""}`}
                      colSpan="2"
                    >
                      <Form.Check
                        id={input.id}
                        type="radio"
                        name={input.name}
                        onChange={(e) => onRadioChange(e, input.label)} // On change func
                        checked={
                          formInputs[input.name]
                            ? formInputs[input.name][0] === input.id
                            : index === 0
                        } // Checked input control, if first input checked by default
                        label={input.label}
                      />

                      <Collapse
                        in={
                          formInputs.payment &&
                          formInputs.payment[0] === input.id
                        }
                      >
                        <div>
                          <div className="pt-4">
                            <p className="text-muted text-sm">{input.text}</p>
                          </div>
                        </div>
                      </Collapse>
                    </th>
                  </tr>
                ))}
                {/* END PAYMENT INPUTS */}
              </tbody>
            </Table>
            <p className="text-muted text-sm">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our <a href="#">privacy policy</a>.
            </p>
            <p className="text-muted text-sm mb-5">
              I have read and agree to the website{" "}
              <a href="#">terms and conditions</a>. *{" "}
            </p>

            {/* PLACE ORDER */}
            <Link href="/checkout-confirmed" passHref>
              <Button variant="dark" size="lg" className="mb-5 w-100">
                Place order
              </Button>
            </Link>
            {/* END PLACE ORDER */}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

// INPUTS OBJECT IS ON THE BOTTOM OF THIS FILE

export default Checkout

const inputs = {
  adress: [
    {
      name: "Invoice address",
      title: true,
      titleclass: "mb-5 text-primary",
      inputs: [
        {
          label: "Full Name",
          name: "fullname_invoice",
          type: "text",
        },
        {
          label: "Email Address",
          name: "emailaddress_invoice",
          type: "text",
        },
        {
          label: "Street",
          name: "street_invoice",
          type: "text",
        },
        {
          label: "City",
          name: "city_invoice",
          type: "text",
        },
        {
          label: "ZIP",
          name: "zip_invoice",
          type: "text",
        },
        {
          label: "State",
          name: "state_invoice",
          type: "text",
        },
        {
          label: "Phone Number",
          name: "phonenumber_invoice",
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
      titleclass: "my-4 text-primary",
      title: true,
      collapse: true,
      inputs: [
        {
          label: "Full Name",
          name: "shipping_fullname_invoice",
          type: "text",
        },
        {
          label: "Email Address",
          name: "shipping_emailaddress_invoice",
          type: "text",
        },
        {
          label: "Street",
          name: "shipping_street_invoice",
          type: "text",
        },
        {
          label: "City",
          name: "shipping_city_invoice",
          type: "text",
        },
        {
          label: "ZIP",
          name: "shipping_zip_invoice",
          type: "text",
        },
        {
          label: "State",
          name: "shipping_state_invoice",
          type: "text",
        },
        {
          label: "Phone Number",
          name: "shipping_phonenumber_invoice",
          type: "text",
        },
      ],
    },
  ],
  shipping: [
    {
      id: "shipping0",
      label: "DHL $10",
      price: 10,
      name: "shipping",
    },
    {
      label: "Branch pickup $5",
      id: "shipping1",
      price: 5,
      name: "shipping",
    },
  ],
  payment: [
    {
      id: "payment0",
      label: "Pay on delivery",
      name: "payment",
      text: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed in",
    },
    {
      id: "payment1",
      label: "Card payment",
      name: "payment",
      text: "The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pit",
    },
    {
      id: "payment2",
      label: "PayPal",
      name: "payment",
      text: "His room, a proper human room although a little too small, lay peacefully between its four familiar",
    },
  ],
}
