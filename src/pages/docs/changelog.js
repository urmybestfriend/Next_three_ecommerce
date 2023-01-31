import React, { useState } from "react"
import Link from "next/link"

import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Card,
  Collapse,
  Button,
  Badge,
} from "react-bootstrap"

import DocsNav from "../../components/Docs/DocsNav"
import ChangedFile from "../../components/Docs/ChangedFile"

export async function getStaticProps() {
  return {
    props: {
      title: "Docs changelog",
    },
  }
}

const Changelog = () => {
  const [collapse, setCollapse] = useState({})
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

                <Breadcrumb.Item active>Changelog</Breadcrumb.Item>
              </Breadcrumb>
              <div className="hero-content">
                <h1 className="hero-heading">Changelog</h1>
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
            <div id="version2.+.0" className="docs-item">
              <h5 className="text-uppercase mb-4">Version 2.1.0</h5>
              <div className="docs-desc">
                <p className="text-muted">April 26, 2022</p>
              </div>
              <div className="mt-5">
                <Card className="bg-gray-100 border-0">
                  <Card.Body className="py-4">
                    <pre className="card-text">
                      {"-"} <strong>new:</strong> Added 7 new product cards.{" "}
                      <Link href="/docs/components-theme#product">
                        <a>See demo</a>
                      </Link>
                      .{"\n"}
                      {"-"} <strong>fixed:</strong> Homepage slider priority
                      loading{"\n"}
                      {"-"} <strong>updated packages:</strong> Next.js 12.1.5,
                      React Bootstrap 2.3.0
                    </pre>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() =>
                        setCollapse({ ...collapse, ["210"]: !collapse["210"] })
                      }
                    >
                      Show a complete list of changed files
                    </Button>
                    <Collapse in={collapse["210"]}>
                      <div className="bg-white p-3 rounded mt-2">
                        <ul className="list-unstyled text-sm mb-0">
                          {v210.map((item) => (
                            <li className="mb-1" key={item.name}>
                              <ChangedFile {...item} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Collapse>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div id="version2.0.0" className="docs-item">
              <h5 className="text-uppercase mb-4">Version 2.0.0</h5>
              <div className="docs-desc">
                <p className="text-muted">January 10, 2022</p>
              </div>
              <div className="mt-5">
                <Card className="bg-gray-100 border-0">
                  <Card.Body className="py-4">
                    <pre className="card-text">
                      {"-"} <strong>update:</strong> Updated to Bootstrap 5
                      {"\n"}
                      {"-"} <strong>new:</strong> Converted from ReactStrap to
                      React Bootstrap package (see docs{" "}
                      <a href="https://react-bootstrap.github.io/components/alerts">
                        here
                      </a>
                      ){"\n"}
                      {"-"} <strong>new:</strong> Font Awesome React component
                      (see usage{" "}
                      <a href="https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react">
                        here
                      </a>
                      ){"\n"}
                      {"-"} <strong>new:</strong> Avatar component (
                      <code>src/components/Avatar</code>){"\n"}
                      {"-"} <strong>new:</strong> Header component is split to
                      multiple components for better readiblity (
                      <code>src/components/Header</code>){"\n"}
                      {"-"} <strong>updated packages:</strong> NPM update,
                      Next.js (12.0.7), Swiper (7.3.1), react-select (5.2.1),
                      react-scroll (1.8.4){"\n"}- <strong>new:</strong> Image
                      component using next/image (
                      <code>src/components/Image</code>){"\n"}-{" "}
                      <strong>improved:</strong> Removed Swiper react wrapper
                      (ReactIdSwiper). Using Swiper.js's react component{"\n"}-{" "}
                      <strong>improved:</strong> Moved TopBar and MainIcons
                      component to Header component folder{"\n"}-{" "}
                      <strong>fixed:</strong> Mobile megamenu width overflow
                    </pre>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div id="version1.0.0" className="docs-item">
              <h5 className="text-uppercase mb-4">Version 1.0.0</h5>
              <div className="docs-desc">
                <p className="text-muted">November 3, 2020</p>
              </div>
              <div className="mt-5">
                <Card className="bg-gray-100 border-0">
                  <Card.Body className="py-4"> Initial Release</Card.Body>
                </Card>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Changelog

const v210 = [
  {
    name: "package.json",
    type: "m",
  },
  {
    name: "package-lock.json",
    type: "m",
  },
  {
    name: "src/components/Swiper.js",
    type: "m",
  },
  {
    name: "src/components/CardProduct/1.js",
    type: "a",
  },
  {
    name: "src/components/CardProduct/2.js",
    type: "a",
  },
  {
    name: "src/components/CardProduct/3.js",
    type: "a",
  },
  {
    name: "src/components/CardProduct/4.js",
    type: "a",
  },
  {
    name: "src/components/CardProduct/5.js",
    type: "a",
  },
  {
    name: "src/components/CardProduct/6.js",
    type: "a",
  },
  {
    name: "src/components/CardProduct/7.js",
    type: "a",
  },
  {
    name: "src/components/CardProduct/Colors.js",
    type: "a",
  },
  {
    name: "src/components/ { CardProduct.js → CardProduct/Default.js }",
    type: "r",
  },
  {
    name: "src/components/CardProduct/index.js",
    type: "a",
  },
  {
    name: "src/components/Docs/Theme/Product.js",
    type: "a",
  },
  {
    name: "src/components/Header/DropdownMenuItem.js",
    type: "m",
  },
  {
    name: "src/data/menu.json",
    type: "m",
  },
  {
    name: "src/data/products-clothes.json",
    type: "m",
  },
  {
    name: "src/pages/category-big-products.js",
    type: "m",
  },
  {
    name: "src/pages/category-boxed.js",
    type: "m",
  },
  {
    name: "src/pages/category-full-sidebar.js",
    type: "m",
  },
  {
    name: "src/pages/docs/components-theme.js",
    type: "m",
  },
  {
    name: "src/pages/listing-0.js",
    type: "a",
  },
  {
    name: "src/pages/listing-1.js",
    type: "a",
  },
  {
    name: "src/pages/listing-2.js",
    type: "a",
  },
  {
    name: "src/pages/listing-3.js",
    type: "a",
  },
  {
    name: "src/pages/listing-4.js",
    type: "a",
  },
  {
    name: "src/pages/listing-5.js",
    type: "a",
  },
  {
    name: "src/pages/listing-6.js",
    type: "a",
  },
  {
    name: "src/pages/listing-7.js",
    type: "a",
  },
  {
    name: "src/scss/theme/_container.scss",
    type: "m",
  },
  {
    name: "src/scss/theme/_icons.scss",
    type: "m",
  },
  {
    name: "src/scss/theme/_navbar.scss",
    type: "m",
  },
  {
    name: "src/scss/theme/_products.scss",
    type: "m",
  },
  {
    name: "src/scss/theme/_ribbon.scss",
    type: "a",
  },
  {
    name: "src/scss/theme/_swiper.scss",
    type: "m",
  },
  {
    name: "src/scss/theme/_theme.scss",
    type: "m",
  },
  {
    name: "src/scss/theme/_utilities.scss",
    type: "m",
  },
  {
    name: "src/scss/theme/_variables.scss",
    type: "m",
  },
]
