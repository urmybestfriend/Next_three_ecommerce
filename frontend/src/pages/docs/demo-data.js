import React from "react"
import Link from "next/link"

import { Container, Row, Col, Breadcrumb } from "react-bootstrap"

import DocsNav from "../../components/Docs/DocsNav"

export async function getStaticProps() {
  return {
    props: {
      title: "Docs demo data",
    },
  }
}

const DemoData = () => {
  return (
    <React.Fragment>
      <section className="hero py-6">
        <Container fluid>
          <Row className="px-xl-5">
            <Col lg={{ span: 10, offset: 2 }} xl="8">
              <Breadcrumb>
                <Link href="/" passHref>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Link>
                <Link href="/docs/introduction" passHref>
                  <Breadcrumb.Item>Documentation</Breadcrumb.Item>
                </Link>
                <Breadcrumb.Item active>Demo Data</Breadcrumb.Item>
              </Breadcrumb>
              <div className="hero-content">
                <h1 className="hero-heading">Docs - Demo Data</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Container fluid>
        <Row className="px-xl-5">
          <Col lg="2">
            <DocsNav />
          </Col>
          <Col lg="10" xl="8" className="docs-content">
            <div className="text-lg">
              <p className="text-muted">
                We use demo data in JSON files in this app to simulate API calls
                and input from your CMS. All of them are located in the{" "}
                <code>src/data</code> folder.
              </p>
              <p className="text-muted">
                A few of them are used to set default values in the Shopping
                Cart or Wishlist. On production, you need to modify the code
                slightly to remove the demo data.
              </p>
            </div>
            <div className="mt-5">
              <h6 className="text-uppercase mb-4">
                Please follow comments in components below:
              </h6>
              <ul>
                <li>
                  <code>/src/components/Header.js</code>
                </li>
                <li>
                  <code>/src/components/CartItems.js</code>
                </li>
                <li>
                  <code>/src/components/WishlistItems.js</code>
                </li>
                <li>
                  <code>/src/components/Filters.js</code>
                </li>
                <li>
                  <code>/src/pages/checkout-confirmed.js</code>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default DemoData
