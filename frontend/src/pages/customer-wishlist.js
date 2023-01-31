import React from "react"
import { Container, Row, Col, Breadcrumb } from "react-bootstrap"

import Link from "next/link"
import { WishlistContext } from "../components/WishlistContext"

import CustomerSidebar from "../components/CustomerSidebar"
import WishlistItems from "../components/WishlistItems"

export async function getStaticProps() {
  return {
    props: {
      title: "Customer wishlist",
    },
  }
}

const CustomerWishlist = () => {
  const [wishlistItemsState] = React.useContext(WishlistContext)
  return (
    <React.Fragment>
      <section className="hero py-6">
        <Container>
          <Breadcrumb>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Wishlist</Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content">
            <h1 className="hero-heading mb-3">Wishlist</h1>
            <div>
              <p className="lead text-muted mb-0">
                You have {wishlistItemsState.length} item
                {wishlistItemsState.length !== 1 && "s"} in your wishlist.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <Container className="pb-6">
        <Row>
          <Col lg="8" xl="9">
            <WishlistItems customer />
          </Col>
          <Col lg="4" xl="3" className="mb-5">
            <CustomerSidebar />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default CustomerWishlist
