import Link from "next/link"
import dynamic from "next/dynamic"
import React from "react"
import { Container, Row, Col, Breadcrumb, Form, Button } from "react-bootstrap"
import { Parallax, Background } from "react-parallax"
import Image from "../components/Image"
import UseWindowSize from "../hooks/UseWindowSize"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"
export async function getStaticProps() {
  return {
    props: {
      title: "Contact",
      header: {
        absolute: true,
        transparentNavbar: true,
      },
    },
  }
}

let MapComponent

const Contact = () => {
  const [mapLoaded, setMapLoaded] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  const [tap, setTap] = React.useState(false)
  const size = UseWindowSize()
  React.useEffect(() => {
    MapComponent = dynamic(() => import("../components/MapComponent"), {
      ssr: false,
    })
    setMapLoaded(true)
  }, [])
  React.useEffect(() => {
    if (mapLoaded) {
      setTap(size.width > 700)
      setDragging(size.width > 700)
    }
  }, [size, mapLoaded])

  return (
    <React.Fragment>
      <Parallax
        className="light-overlay position-relative"
        bgStyle={{ height: "120%" }}
        strength={500}
      >
        <Background className="vw-100">
          <Image
            src="/img/photo/maarten-deckers-0-frPETzEVs-unsplash.jpg"
            alt="Autumn vibes"
            layout="fill"
            className="bg-image"
            priority
          />
        </Background>
        <Container className="overlay-content hero hero-page py-7 text-center">
          <div className="pt-5 pt-lg-7">
            <Breadcrumb
              listProps={{
                className: "justify-content-center",
              }}
            >
              <Link href="/" passHref>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
              </Link>
              <Breadcrumb.Item active>Contact</Breadcrumb.Item>
            </Breadcrumb>
            <div className="hero-content">
              <h1 className="hero-heading">Contact</h1>
            </div>
          </div>
        </Container>
      </Parallax>
      <section className="py-6">
        <Container>
          <Row>
            <Col md="4" className="text-center text-md-start mb-4 mb-md-0">
              <h4>Address</h4>
              <p className="text-muted">
                13/25 New Avenue
                <br />
                New Heaven, 45Y 73J
                <br />
                England, <strong>Great Britain</strong>
              </p>
            </Col>
            <Col md="4" className="text-center text-md-start mb-4 mb-md-0">
              <h4>Call center</h4>
              <p className="text-muted">
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              </p>
              <p className="text-muted">
                <strong>+33 555 444 333</strong>
              </p>
            </Col>
            <Col md="4" className="text-center text-md-start mb-4 mb-md-0">
              <h4>Electronic support</h4>
              <p className="text-muted">
                Please feel free to write an email to us or to use our
                electronic ticketing system.
              </p>
              <ul className="list-unstyled text-muted">
                <li>info@varkala.com</li>
                <li>support@varkala.com</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="bg-gray-200 position-relative overflow-hidden">
        <Container fluid>
          <Row>
            <Col lg="6" className="px-0">
              {mapLoaded && (
                <MapComponent
                  style={{ height: "100%", minHeight: "500px" }}
                  dragging={dragging}
                  tap={tap}
                />
              )}
            </Col>
            <Col lg="6" className="py-6 px-lg-5 px-xl-6">
              <h2 className="display-3 fw-bold text-gray-600 mb-5">
                Our stores
              </h2>
              <Row className="py-4 border-bottom">
                <Col xs="6" md="3" className="fw-bold align-self-center">
                  <h4 className="mb-0">New York</h4>
                </Col>
                <Col xs="6" md="3" className="text-sm">
                  13/25 New Avenue, New Heaven, 45Y 73J
                </Col>
                <Col xs="6" md="3" className="text-sm">
                  564546 54566 54
                </Col>
                <Col xs="6" md="3" className="text-sm">
                  email@email.com
                </Col>
              </Row>
              <Row className="py-4 border-bottom">
                <Col xs="6" md="3" className="fw-bold align-self-center">
                  <h4 className="mb-0">London</h4>
                </Col>
                <Col xs="6" md="3" className="text-sm">
                  13/25 New Avenue, New Heaven, 45Y 73J
                </Col>
                <Col xs="6" md="3" className="text-sm">
                  564546 54566 54
                </Col>
                <Col xs="6" md="3" className="text-sm">
                  email@email.com
                </Col>
              </Row>
              <Row className="py-4 border-bottom">
                <Col xs="6" md="3" className="fw-bold align-self-center">
                  <h4 className="mb-0">Paris</h4>
                </Col>
                <Col xs="6" md="3" className="text-sm">
                  13/25 New Avenue, New Heaven, 45Y 73J
                </Col>
                <Col xs="6" md="3" className="text-sm">
                  564546 54566 54
                </Col>
                <Col xs="6" md="3" className="text-sm">
                  email@email.com
                </Col>
              </Row>
              <Row className="py-4 border-bottom">
                <Col xs="6" md="3" className="fw-bold align-self-center">
                  <h4 className="mb-0">Tokyo</h4>
                </Col>
                <Col xs="6" md="3" className="text-sm">
                  13/25 New Avenue, New Heaven, 45Y 73J
                </Col>
                <Col xs="6" md="3" className="text-sm">
                  564546 54566 54
                </Col>
                <Col xs="6" md="3" className="text-sm">
                  email@email.com
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-6">
        <Container>
          <Row>
            <Col lg="3">
              <h5
                className="display-2 fw-bold mb-4 mb-lg-5"
                style={{ lineHeight: "1" }}
              >
                Get in touch{" "}
              </h5>
              <ul className="list-inline h3 mb-6 mb-lg-0">
                <li className="list-inline-item me-4">
                  <a href="#">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                </li>
                <li className="list-inline-item me-4">
                  <a href="#">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
                <li className="list-inline-item me-4">
                  <a href="#">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </li>
              </ul>
            </Col>
            <Col lg="8" xl="6" className="ms-auto">
              <Form>
                <Row>
                  <Col sm="6">
                    <div className="mb-4">
                      <Form.Label htmlFor="nameContact">
                        Your firstname *
                      </Form.Label>
                      <Form.Control
                        className="form-control-underlined"
                        type="text"
                        name="nameContact"
                        id="name"
                        required="required"
                      />
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="mb-4">
                      <Form.Label htmlFor="surnameContact">
                        Your lastname *
                      </Form.Label>
                      <Form.Control
                        className="form-control-underlined"
                        type="text"
                        name="surnameContact"
                        id="surname"
                        required="required"
                      />
                    </div>
                  </Col>
                </Row>
                <div className="mb-4">
                  <Form.Label htmlFor="emailContact">Your email *</Form.Label>
                  <Form.Control
                    className="form-control-underlined"
                    type="email"
                    name="emailContact"
                    id="email"
                    required="required"
                  />
                </div>
                <div className="mb-4">
                  <Form.Label htmlFor="messageContact">
                    Your message for us *
                  </Form.Label>
                  <Form.Control
                    className="form-control-underlined"
                    rows="4"
                    name="messageContact"
                    type="textarea"
                    id="message"
                    required="required"
                  />
                </div>
                <Button
                  variant="outline-primary"
                  className="mt-3"
                  type="submit"
                >
                  Send message
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Contact
