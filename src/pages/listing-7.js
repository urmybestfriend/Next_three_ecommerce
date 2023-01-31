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
      title: "Product Card 7",
    },
  }
}

const Listing7 = () => {
  const productsFull = products.concat(products)
  return (
    <Container className="py-6">
      <div className="products-grid">
        <div className="hero-content pb-5">
          <h1>Product Card 7</h1>
          <Row>
            <Col xl="8">
              <p className="lead text-muted">
                Product card with more large button on hover. Optional color or
                variant buttons that switch product images. Ribbons instead of
                badges.
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
              <CardProduct product={product} cardType={7} />
            </Col>
          ))}
        </Row>
        <Pagination />
      </div>
    </Container>
  )
}

export default Listing7
