import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Image from "../components/Image"

export async function getStaticProps() {
  return {
    props: {
      title: "About person",
    },
  }
}

const About2 = () => {
  return (
    <section>
      <Container fluid>
        <Row className="my-lg-3">
          <Col lg="7" xl="6" className="order-lg-2 mb-3 mb-lg-0">
            <div className="d-flex align-items-center p-5 p-xl-6 bg-gray-100 h-100">
              <div>
                <h6 className="text-uppercase text-primary letter-spacing-5 mb-3">
                  {" "}
                  About me
                </h6>
                <h1 className="display-3 fw-bold mb-5">Frankie Kafka</h1>
                <Row>
                  <Col xl="6">
                    <p className="text-lg text-muted mb-lg-0">
                      One morning, when Gregor Samsa woke from troubled dreams,
                      he found himself transformed in his bed into a horrible
                      vermin. He lay on his armour-like ba
                    </p>
                  </Col>
                  <Col xl="6">
                    <p className="text-lg text-muted mb-0">
                      The bedding was hardly able to cover it and seemed ready
                      to slide off any moment. His many legs, pitifully thin
                      compared with the size of the rest of{" "}
                    </p>
                  </Col>
                </Row>
                <hr className="my-5" />
                <Row>
                  <Col xl="6">
                    <h6 className="text-uppercase text-primary letter-spacing-3 mb-4">
                      Get in touch
                    </h6>
                    <p className="text-muted mb-5 mb-xl-0">
                      123 Firebrigade St
                      <br />
                      San Antonio, CA
                      <br />
                      U.S.A.
                    </p>
                  </Col>
                  <Col xl="6">
                    <h6 className="text-uppercase text-primary letter-spacing-3 mb-4">
                      Company details
                    </h6>
                    <p className="text-muted mb-0">
                      Reg.Id: 15456456
                      <br />
                      VAT Id: 646643463546
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col lg="5" xl="6" className="pe-lg-0 order-lg-1">
            <div className="dark-overlay mh-full-screen-with-header h-100">
              <Image
                className="bg-image"
                src="/img/photo/raoul-ortega-2JtF6pYAOOI-unsplash.jpg"
                alt=""
                layout="fill"
                sizes="(max-width: 992px) 100vw, 50vw"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default About2
