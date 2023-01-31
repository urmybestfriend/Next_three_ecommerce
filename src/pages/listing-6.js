import React from "react"
import { Container, Row, Col, Breadcrumb } from "react-bootstrap"
import Link from "next/link"

import products from "../data/products-clothes.json"
import CardProduct from "../components/CardProduct"

import Pagination from "../components/Pagination"
import CategoryTopBar from "../components/CategoryTopBar"

export async function getStaticProps() {
  return {
    props: {
      title: "Product Card 6",
    },
  }
}

const Listing6 = () => {
  const productsFull = products.concat(products)
  return (
    <Container className="py-6">
      <div className="products-grid">
        <div className="hero-content pb-5">
          <h1>Product Card 6</h1>
          <Row>
            <Col xl="8">
              <p className="lead text-muted">
                Product card with image slider for every product. Add to
                wishlist/cart links appear on hover.
              </p>
            </Col>
          </Row>
        </div>
        <Breadcrumb>
          <Link href="/" passHref>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Link>
          <Breadcrumb.Item active>Shop</Breadcrumb.Item>
        </Breadcrumb>
        <CategoryTopBar filter />
        <Row>
          {productsFull.slice(0, -2).map((product, index) => (
            <Col key={index} lg="4" sm="6" xl={3}>
              <CardProduct product={product} cardType={6} />
            </Col>
          ))}
        </Row>
        <Pagination />
      </div>
    </Container>
  )
}

export default Listing6
