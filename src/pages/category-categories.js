import React from "react"
import { Container, Row, Col, Breadcrumb } from "react-bootstrap"
import Link from "next/link"
import categoriesmenu from "../data/categoriesmenu.json"
import Image from "../components/Image"

export async function getStaticProps() {
  return {
    props: {
      title: "Category Subcategories",
    },
  }
}

const CategoryCategories = () => {
  return (
    <Container className="py-6">
      <Breadcrumb>
        <Link href="/" passHref>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Link>
        <Breadcrumb.Item active>Shop</Breadcrumb.Item>
      </Breadcrumb>
      <div className="hero-content pb-5">
        <h1>Ladies</h1>
        <Row>
          <Col xl="8">
            <p className="lead text-muted">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </Col>
        </Row>
      </div>
      <div className="products-grid">
        <Row>
          {categoriesmenu.categories.slice(0, -2).map((category, index) => (
            <Col key={index} sm="6" lg="4" className="mb-5">
              <div className="card-scale" data-aos="zoom-in">
                <div className="img-scale-container mb-3">
                  <Image
                    className="img-fluid img-scale"
                    src={category.img}
                    alt=""
                    width={410}
                    height={525}
                  />
                </div>
                <h5>
                  <Link href={category.link}>
                    <a className="stretched-link text-reset">
                      {" "}
                      {category.name}
                    </a>
                  </Link>
                  <span className="text-sm text-muted ms-2">
                    {category.productcount}
                  </span>
                </h5>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  )
}

export default CategoryCategories
