import React from "react"
import { Container, Row, Col, Breadcrumb } from "react-bootstrap"
import Link from "next/link"

import products from "../data/products-clothes.json"
import CardProduct from "../components/CardProduct"

import Pagination from "../components/Pagination"
import CategoryTopBar from "../components/CategoryTopBar"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export async function getStaticProps() {
  return {
    props: {
      title: "Category Fixed Width & masonry layout",
    },
  }
}

const CategoryMasonry = () => {
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
        <ResponsiveMasonry
          style={{ marginTop: "50px" }}
          columnsCountBreakPoints={{ 300: 2, 900: 3, 1100: 4 }}
        >
          <Masonry gutter="30px">
            {productsFull.slice(0, -2).map((product, index) => (
              <div key={index} style={{ marginTop: "-30px" }}>
                <CardProduct product={product} masonry />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
        <Pagination />
      </div>
    </Container>
  )
}

export default CategoryMasonry
