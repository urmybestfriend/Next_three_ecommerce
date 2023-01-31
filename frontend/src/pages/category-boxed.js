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
      title: "Category Fixed Width",
    },
  }
}

const CategoryBoxed = () => {
  const productsFull = products.concat(products)
  return (
    <Container className="py-6">
      <div className="products-grid">
        <div className="hero-content pb-5">
          <h1>Jackets and tops</h1>
          <Row>
            <Col xl="8">
              <p className="lead text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
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
            <Col key={index} sm="4" xl="3" xs="6">
              <CardProduct product={product} cardType={6} />
            </Col>
          ))}
        </Row>
        <Pagination />
      </div>
    </Container>
  )
}

export default CategoryBoxed
