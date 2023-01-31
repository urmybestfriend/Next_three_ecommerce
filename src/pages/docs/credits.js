import React from "react"
import Link from "next/link"

import { Container, Row, Col, Breadcrumb } from "react-bootstrap"

import DocsNav from "../../components/Docs/DocsNav"

export async function getStaticProps() {
  return {
    props: {
      title: "Docs credits",
    },
  }
}

const Credits = () => {
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
                <Breadcrumb.Item active>Credits</Breadcrumb.Item>
              </Breadcrumb>
              <div className="hero-content">
                <h1 className="hero-heading">Credits</h1>
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
          <Col lg="10" xl="8" className="docs-content text-lg">
            <ul className="list-icon">
              <li className="mb-3">
                <strong>Bootstrap</strong> -{" "}
                <a href="https://getbootstrap.com/">
                  https://getbootstrap.com/
                </a>
              </li>
              <li className="mb-3">
                <strong>React Bootstrap</strong> -{" "}
                <a href="https://react-bootstrap.github.io/">
                  https://react-bootstrap.github.io/
                </a>
              </li>
              <li className="mb-3">
                <strong>React.js</strong> -{" "}
                <a href="https://reactjs.org/">https://reactjs.org/</a>
              </li>
              <li className="mb-3">
                <strong>Next.js</strong> -{" "}
                <a href="https://nextjs.org/">https://nextjs.org/</a>
              </li>
              <li className="mb-3">
                <strong>Vremena Grotesk </strong>-{" "}
                <a href="https://www.fontspring.com/fonts/abstrkt/vremena">
                  https://www.fontspring.com/fonts/abstrkt/vremena
                </a>
              </li>
              <li className="mb-3">
                <strong>Google Fonts - Poppins</strong> -{" "}
                <a href="https://fonts.google.com/specimen/Poppins">
                  https://fonts.google.com/specimen/Poppins
                </a>
              </li>
              <li className="mb-3">
                <strong>Orion Icons </strong> -{" "}
                <a href="https://orioniconlibrary.com">
                  https://orioniconlibrary.com
                </a>
              </li>
              <li className="mb-3">
                <strong>Font Awesome </strong> -{" "}
                <a href="http://fontawesome.io/get-started/">
                  http://fontawesome.io/get-started/
                </a>
              </li>
              <li className="mb-3">
                <strong>LeafletJS</strong> -{" "}
                <a href="https://leafletjs.com/">https://leafletjs.com/</a>
              </li>
              <li className="mb-3">
                <strong>React Leaflet</strong> -{" "}
                <a href="https://react-leaflet.js.org/">
                  https://react-leaflet.js.org/
                </a>
              </li>
              <li className="mb-3">
                <strong>Swiper </strong> -{" "}
                <a href="http://idangero.us/swiper/">
                  http://idangero.us/swiper/
                </a>
              </li>
              <li className="mb-3">
                <strong>NoUI Slider </strong> -{" "}
                <a href="https://refreshless.com/nouislider/">
                  https://refreshless.com/nouislider/
                </a>
              </li>
              <li className="mb-3">
                <strong>React NoUI Slider </strong> -{" "}
                <a href="https://github.com/mmarkelov/react-nouislider">
                  https://github.com/mmarkelov/react-nouislider
                </a>
              </li>
              <li className="mb-3">
                <strong>React Select</strong> -{" "}
                <a href="https://react-select.com/">
                  https://react-select.com/
                </a>
              </li>
              <li className="mb-3">
                <strong>React Image Lightbox</strong> -{" "}
                <a href="https://frontend-collective.github.io/react-image-lightbox/">
                  https://frontend-collective.github.io/react-image-lightbox/
                </a>
              </li>
              <li className="mb-3">
                <strong>AOS</strong> -{" "}
                <a href="https://michalsnik.github.io/aos/">
                  https://michalsnik.github.io/aos/
                </a>
              </li>
              <li className="mb-3">
                <strong>React Parallax</strong> -{" "}
                <a href="https://github.com/rrutsche/react-parallax">
                  https://github.com/rrutsche/react-parallax
                </a>
              </li>
              <li className="mb-3">
                <strong>React Magnifier</strong> -{" "}
                <a href="https://github.com/samuelmeuli/react-magnifier">
                  https://github.com/samuelmeuli/react-magnifier
                </a>
              </li>
              <li className="mb-3">
                <strong>React Responsive Masonry</strong> -{" "}
                <a href="https://github.com/cedricdelpoux/react-responsive-masonry">
                  https://github.com/cedricdelpoux/react-responsive-masonry
                </a>
              </li>
              <li className="mb-3">
                <strong>Next.js Progressbar</strong> -{" "}
                <a href="https://github.com/apal21/nextjs-progressbar">
                  https://github.com/apal21/nextjs-progressbar
                </a>
              </li>
              <li className="mb-3">
                <strong>Next.js + Images</strong> -{" "}
                <a href="https://github.com/twopluszero/next-images">
                  https://github.com/twopluszero/next-images
                </a>
              </li>

              <li className="mb-3">
                <strong>
                  Demo images from Bershka - not included in the download
                  package.
                </strong>
                -{" "}
                <a href="https://www.bershka.com/">https://www.bershka.com/</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Credits
