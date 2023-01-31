import React from "react"
import { Container, Row, Col, Breadcrumb } from "react-bootstrap"
import Link from "next/link"
import products from "../data/products-clothes.json"
import CardProduct from "../components/CardProduct"

import CategoriesMenu from "../components/CategoriesMenu"

import Pagination from "../components/Pagination"
import Filters from "../components/Filters"
import CategoryTopBar from "../components/CategoryTopBar"

export function getAllProductsIds() {
  return products.map((product) => ({
    params: {
      category: product.category[1],
    },
  }))
}

export function getCategoryProducts(slug) {
  return products.filter((product) => product.category[1] === slug)
}

export async function getStaticPaths() {
  return {
    paths: getAllProductsIds(),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const products = getCategoryProducts(params.category)
  return {
    props: {
      title: products[0].category[0],
      products,
    },
  }
}

const Category = ({ products }) => {
  return (
    <React.Fragment>
      <Container fluid className="container-fluid-px py-6">
        <Row>
          <Col xl="9" lg="8" className="products-grid order-lg-2">
            <div className="hero-content pb-5">
              <h1>Jackets and tops</h1>
              <Row>
                <Col xl="8">
                  <p className="lead text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt.
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
            <CategoryTopBar />
            <Row>
              {products.map((product, index) => (
                <Col key={index} sm="4" xl="3" xs="6">
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
    </React.Fragment>
  )
}

export default Category
