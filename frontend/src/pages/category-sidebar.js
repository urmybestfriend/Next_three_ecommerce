import React from "react"
import { Container, Row, Col, Breadcrumb } from "react-bootstrap"
import Link from "next/link"

import products from "../data/products-clothes.json"
import CardProduct from "../components/CardProduct"

import Pagination from "../components/Pagination"
import CategoryTopBar from "../components/CategoryTopBar"
import CategoriesMenu from "../components/CategoriesMenu"
import Filters from "../components/Filters"

export async function getStaticProps() {
  return {
    props: {
      title: "Category Fixed Width & sidebar",
    },
  }
}

const CategorySidebar = () => {
  const productsFull = products.concat(products)
  return (
    <Container className="py-6">
      <Breadcrumb>
        <Link href="/" passHref>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Link>
        <Breadcrumb.Item active>Shop</Breadcrumb.Item>
      </Breadcrumb>
      <div className="hero-content pb-6">
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
      <Row>
        <Col xl="9" lg="8" className="products-grid order-lg-2">
          <CategoryTopBar />
          <Row>
            {productsFull.slice(0, -2).map((product, index) => (
              <Col key={index} xl="4" xs="6">
                <CardProduct product={product} />
              </Col>
            ))}
          </Row>
          <Pagination />
        </Col>
        <Col xl="3" lg="4" className="sidebar pe-xl-5 order-lg-1">
          <CategoriesMenu />
          <Filters />
        </Col>
      </Row>
    </Container>
  )
}

export default CategorySidebar
