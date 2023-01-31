import React from "react"
import { Container, Row, Col, Breadcrumb, Button } from "react-bootstrap"

import OrderSummary from "../components/OrderSummary"
import Link from "next/link"
import CartItems from "../components/CartItems"

export async function getStaticProps() {
  return {
    props: {
      title: "Shopping cart",
    },
  }
}
import { CartContext } from "../components/CartContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faSync } from "@fortawesome/free-solid-svg-icons"
import i18next from "i18next"
const Cart = () => {
  const [cartItems, dispatch] = React.useContext(CartContext)
  return (
    <React.Fragment>
      <section className="hero py-6">
        <Container>
          <Breadcrumb>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>
              {" "}
              {i18next.t("shopping_cart")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content">
            <h1 className="hero-heading"> {i18next.t("shopping_cart")}</h1>
            <div>
              <p className="lead text-muted">
                {i18next.t("cart_description_1")} {cartItems.length}{" "}
                {i18next.t("cart_description_2")}.
              </p>
              {/* <p className="lead text-muted">
                For the checkout, you can use either a{" "}
                <Link href="/checkout1">
                  <a>Multiple pages checkout</a>
                </Link>{" "}
                or have everything on a{" "}
                <Link href="/checkout">
                  <a>single page</a>
                </Link>
                .
              </p> */}
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <Row className="mb-5">
            <Col lg="8" className="pe-xl-5">
              <CartItems className="mb-5" />
              <div className="d-flex justify-content-between flex-column flex-lg-row mb-5 mb-lg-0">
                <Button
                  variant="link"
                  className="text-muted"
                  href="/category-full"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
                  {i18next.t("continue_shopping")}
                </Button>
                <Button variant="link" className="text-primary" href="#">
                  <FontAwesomeIcon icon={faSync} className="me-2" />{" "}
                  {i18next.t("update_cart")}
                </Button>
              </div>
            </Col>
            <Col lg="4">
              <OrderSummary showProceedToCheckout />
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Cart
