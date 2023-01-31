import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Alert,
  Form,
  Button,
  Input,
  InputGroup,
} from "react-bootstrap"
import Magnifier from "react-magnifier"

import Icon from "../components/Icon"

import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

import dummyProduct from "../data/dummyproduct.json"
import Stars from "../components/Stars"
import ProductBottomTabs from "../components/ProductBottomTabs"
import ProductBottomProducts from "../components/ProductBottomProducts"
import Link from "next/link"
import SelectBox from "../components/SelectBox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons"

export async function getStaticProps() {
  return {
    props: {
      title: "Product with sticky info",
    },
  }
}

const Detail1 = () => {
  const [lightBoxOpen, setLightBoxOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [activeType, setActiveType] = useState("material_0")
  const [alert, setAlert] = useState(true)
  const onClick = (e, index) => {
    e.preventDefault()
    setActiveImage(index)
    setLightBoxOpen(!lightBoxOpen)
  }

  const customStyles = {
    overlay: {
      zIndex: "1000",
    },
    bodyOpen: {
      position: "fixed",
    },
  }

  const images = dummyProduct.img.detail

  return (
    <React.Fragment>
      <section>
        <Container fluid className="px-xl-7 pt-5 pb-3 pb-lg-6">
          <div className="d-block" id="addToCartAlert">
            <Alert
              variant="success"
              className="mb-4 mb-lg-5"
              role="alert"
              show={alert}
              onClose={() => setAlert(false)}
              dismissible
              closeVariant="white opacity-10"
            >
              <div className="d-flex align-items-center">
                <Icon
                  icon="checked-circle-1"
                  className="d-none d-sm-block w-3rem h-3rem svg-icon-light flex-shrink-0 me-3"
                />
                <p className="mb-0">
                  Push-up jeans have been added to your cart.
                  <br className="d-inline-block d-lg-none" />
                  <Link href="/cart">
                    <a className="text-reset text-decoration-underline ms-lg-3">
                      View Cart
                    </a>
                  </Link>
                </p>
              </div>
            </Alert>
          </div>
          <Breadcrumb>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/category-full" passHref>
              <Breadcrumb.Item>Jeans</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Push-up Jeans</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
            <Col
              lg="6"
              xl="7"
              className="pt-4 order-2 order-lg-1 photoswipe-gallery"
            >
              {dummyProduct.img.detail.map((image, index) => (
                <a
                  key={index}
                  onClick={(e) => onClick(e, index)}
                  className="d-block mb-4"
                  href={image.img}
                >
                  <Magnifier
                    mgShowOverflow={false}
                    mgWidth={2000}
                    mgHeight={2000}
                    className="img-fluid"
                    src={image.img}
                    alt={image.alt}
                    zoomFactor={0.11}
                    style={{ cursor: "pointer" }}
                  />
                </a>
              ))}
              {lightBoxOpen && (
                <Lightbox
                  mainSrc={images[activeImage].img}
                  nextSrc={images[(activeImage + 1) % images.length].img}
                  prevSrc={
                    images[(activeImage + images.length - 1) % images.length]
                      .img
                  }
                  onCloseRequest={() => setLightBoxOpen(false)}
                  imageCaption={images[activeImage].caption}
                  onMovePrevRequest={() =>
                    setActiveImage(
                      (activeImage + images.length - 1) % images.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setActiveImage((activeImage + 1) % images.length)
                  }
                  enableZoom={false}
                  reactModalStyle={customStyles}
                />
              )}
            </Col>
            <Col lg="6" xl="4" className="pt-4 order-1 order-lg-2 ms-lg-auto">
              <div className="sticky-top" style={{ top: "100px", zIndex: "1" }}>
                <h1 className="mb-4">{dummyProduct.name}</h1>
                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
                  <ul className="list-inline mb-2 mb-sm-0">
                    <li className="list-inline-item h4 fw-light mb-0">
                      ${dummyProduct.pricesale.toFixed(2)}
                    </li>
                    <li className="list-inline-item text-muted fw-light">
                      <del>${dummyProduct.price.toFixed(2)}</del>
                    </li>
                  </ul>
                  <div className="d-flex align-items-center text-sm">
                    <Stars
                      stars={4}
                      secondColor="gray-300"
                      className="me-2"
                      starClass="me-1"
                    />
                    <span className="text-muted text-uppercase">
                      25 reviews
                    </span>
                  </div>
                </div>
                <p className="mb-4 text-muted">
                  {dummyProduct.description.short}
                </p>
                <Form>
                  <Row>
                    <Col sm="6" lg="12" className="detail-option mb-4">
                      <h6 className="detail-option-heading">
                        Size <span>(required)</span>
                      </h6>
                      <SelectBox options={dummyProduct.sizes} />
                    </Col>
                    <Col sm="6" lg="12" className="detail-option mb-4">
                      <h6 className="detail-option-heading">
                        Type <span>(required)</span>
                      </h6>
                      {dummyProduct.types.map((type) => (
                        <label
                          key={type.value}
                          className={`btn btn-sm btn-outline-primary detail-option-btn-label ${
                            activeType === type.id ? "active" : ""
                          } me-1`}
                          for={type.id}
                        >
                          {type.label}
                          <Form.Control
                            className="input-invisible"
                            type="radio"
                            name="material"
                            value={type.value}
                            id={type.id}
                            onChange={() => setActiveType(type.id)}
                            required
                          />
                        </label>
                      ))}
                    </Col>
                  </Row>
                  <InputGroup className="w-100 mb-4">
                    <Form.Control
                      size="lg"
                      className="detail-quantity"
                      defaultValue="1"
                      name="items"
                      type="number"
                    />
                    <div className="flex-grow-1">
                      <div className="d-grid h-100">
                        <Button variant="dark" type="submit">
                          <FontAwesomeIcon
                            icon={faShoppingCart}
                            className="me-2 flex-grow-1 w-1rem"
                          />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </InputGroup>
                  <Row className="mb-4">
                    <Col xs="6">
                      <a href="#">
                        <FontAwesomeIcon icon={faHeart} className="me-2" />
                        Add to wishlist
                      </a>
                    </Col>
                    <Col xs="6" className="text-end">
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item me-2">
                          <a className="text-dark text-hover-primary" href="#">
                            <FontAwesomeIcon icon={faFacebookF} />
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a className="text-dark text-hover-primary" href="#">
                            <FontAwesomeIcon icon={faTwitter} />
                          </a>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                  <ul className="list-unstyled">
                    <li>
                      <strong>Category:&nbsp;</strong>
                      <a className="text-muted" href="#">
                        {dummyProduct.category}
                      </a>
                    </li>
                    <li>
                      <strong>Tags:&nbsp;</strong>
                      {dummyProduct.tags.map((tag, index) => (
                        <React.Fragment key={tag.name}>
                          <Link href={tag.link}>
                            <a className="text-muted">{tag.name}</a>
                          </Link>
                          {index < dummyProduct.tags.length - 1
                            ? ",\u00A0"
                            : ""}
                        </React.Fragment>
                      ))}
                    </li>
                  </ul>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <ProductBottomTabs product={dummyProduct} />
      <ProductBottomProducts />
    </React.Fragment>
  )
}

export default Detail1
