import React from "react"
import { Container, Row, Col, Breadcrumb, Nav } from "react-bootstrap"

import OrderSummary from "../components/OrderSummary"
import FormCheckout from "../components/FormCheckout"
import Link from "next/link"
import { FormContext } from "../components/FormContext"
import i18next from "i18next"

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
            <Breadcrumb.Item active>
              {i18next.t("confirm")} {i18next.t("order")}{" "}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content">
            <h1 className="hero-heading">
              {i18next.t("confirm")} {i18next.t("order")}
            </h1>
            <div>
              <p className="lead text-muted">
                {i18next.t("order_review_notice")}.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <Nav variant="pills" className="custom-nav mb-5">
                {/* <Nav.Item className="w-25">
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
                </Nav.Item> */}
                <Nav.Item className="w-25">
                  <Link href="/checkout4" passHref>
                    <Nav.Link className="text-sm" active>
                      {i18next.t("order")} {i18next.t("review")}
                    </Nav.Link>
                  </Link>
                </Nav.Item>
              </Nav>
              <FormCheckout
                step={4}
                prev={[`${i18next.t("back")}`, "/cart"]}
                next={[
                  `${i18next.t("confirm")} ${i18next.t("order")}`,
                  "/order-confirmed",
                ]}
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
