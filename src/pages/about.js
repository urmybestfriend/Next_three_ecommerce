import React from "react"
import { Container, Row, Col } from "react-bootstrap"

import Brands from "../components/Brands"
import Image from "../components/Image"
import Avatar from "../components/Avatar"

export async function getStaticProps() {
  return {
    props: {
      title: "About company",
    },
  }
}

const About = () => {
  return (
    <React.Fragment>
      <Container className="py-6">
        <Row>
          <Col xl="2">
            <div className="horizontal-line d-none d-xl-block" />
          </Col>
          <Col xl="6">
            <h6 className="text-primary text-uppercase letter-spacing-5 mb-3">
              {" "}
              About us
            </h6>
            <h1 className="display-3 fw-bold mb-5">We are Varkala</h1>
            <p className="text-lg text-muted">
              One morning, when Gregor Samsa woke from troubled dreams, he found
              himself transformed in his bed into a horrible vermin. He lay on
              his armour-like back, and if he lifted his head a little he could
              see his brown belly, slightly domed and divided by arches into
              stiff sections
            </p>
          </Col>
        </Row>
      </Container>
      <Container className="pt-4 pb-6">
        <Row className="mb-5">
          <Col xl="2">
            <div className="horizontal-line d-none d-xl-block" />
          </Col>
          <Col xl="8">
            <h6 className="text-primary text-uppercase letter-spacing-5 mb-3">
              The old times
            </h6>
            <h1 className="display-3 fw-bold mb-5">History of Varkala</h1>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col sm="4">
            <Image
              className="img-fluid"
              src="/img/photo/raoul-ortega-2JtF6pYAOOI-unsplash.jpg"
              alt=""
              width={410}
              height={615}
            />
          </Col>
          <Col
            sm="8"
            md={{ span: 6, offset: 1 }}
            className="d-flex align-items-center"
          >
            <div>
              <h6 className="text-uppercase text-muted letter-spacing-5 mb-1">
                Humble beginnings
              </h6>
              <h2 className="mb-4">We started as little</h2>
              <p className="text-muted">
                The bedding was hardly able to cover it and seemed ready to
                slide off any moment. His many legs, pitifully thin compared
                with the size of the rest of him, waved about helplessly as he
                looked. &quot;What's happened to me?&quot; he thought. It wasn't
                a dream.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col sm="8" md="7" lg="6" className="d-flex align-items-center">
            <div>
              <h6 className="text-uppercase text-muted letter-spacing-5 mb-1">
                Varkala today
              </h6>
              <h2 className="mb-4">And then we grew a bit</h2>
              <p className="text-muted">
                The bedding was hardly able to cover it and seemed ready to
                slide off any moment. His many legs, pitifully thin compared
                with the size of the rest of him, waved about helplessly as he
                looked. &quot;What's happened to me?&quot; he thought. It wasn't
                a dream.
              </p>
            </div>
          </Col>
          <Col
            sm="4"
            md="5"
            lg={{ offset: 1 }}
            className="d-flex align-items-center"
          >
            <Image
              className="img-fluid"
              src="/img/photo/clark-street-mercantile-P3pI6xzovu0-unsplash.jpg"
              alt=""
              width={520}
              height={347}
            />
          </Col>
        </Row>
      </Container>
      <section className="py-6 bg-gray-100">
        <Container>
          <Row>
            <Col lg="5">
              <h2 className="mb-4">Varkala's Milestones</h2>
              <p className="text-lg text-muted mb-5 mb-lg-0">
                One morning, when Gregor Samsa woke from troubled dreams, he
                found himself transformed in his bed into a horrible vermin. He
                lay on his armour-like back, and if he lifted his head a little
                he could see his brown belly, slightly domed and divided by
                arches into stiff sections{" "}
              </p>
            </Col>
            <Col lg="6" className="ms-lg-auto">
              <Row>
                <Col sm="6" className="mb-4">
                  <h4>1995</h4>
                  <p className="text-muted">
                    One morning, when Gregor Samsa woke from troubled dreams, he
                    found himself transformed in his bed into a horrible vermin{" "}
                  </p>
                </Col>
                <Col sm="6" className="mb-4">
                  <h4>2000</h4>
                  <p className="text-muted">
                    The bedding was hardly able to cover it and seemed ready to
                    slide off any moment. His many legs, pitifully thin compared
                  </p>
                </Col>
                <Col sm="6" className="mb-4">
                  <h4>2010</h4>
                  <p className="text-muted">
                    His room, a proper human room although a little too small,
                    lay peacefully between its four familiar walls. A collection{" "}
                  </p>
                </Col>
                <Col sm="6" className="mb-4">
                  <h4>2018</h4>
                  <p className="text-muted">
                    Samsa was a travelling salesman - and above it there hung a
                    picture that he had recently cut out of an illustrated magaz{" "}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-5">
        <Container>
          <Row>
            <Col lg="5">
              <div className="p-5">
                <Image
                  className="img-fluid rounded-circle"
                  src="/img/avatar/avatar-0.jpg"
                  alt=""
                  width={424}
                  height={424}
                />
              </div>
            </Col>
            <Col lg="6" className="d-flex align-items-center">
              <div>
                <blockquote className="blockquote-icon mb-5">
                  <p className="text-xl text-serif mb-4">
                    Samsa was a travelling salesman - and above it there hung a
                    picture that he had recently cut out of an illustrated
                    magazine and housed in a nice, gilded frame.{" "}
                  </p>
                  <h6 className="text-lg text-uppercase text-primary">
                    — Frankie Kafka, Founder
                  </h6>
                </blockquote>
                <p className="text-muted">
                  Samsa was a travelling salesman - and above it there hung a
                  picture that he had recently cut out of an illustrated
                  magazine and housed in a nice, gilded frame.{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Container className="pt-6 pb-5">
        <Row>
          <Col xl="2">
            <div className="horizontal-line d-none d-xl-block" />
          </Col>
          <Col xl="10">
            <h6 className="text-primary text-uppercase letter-spacing-5 mb-3">
              {" "}
              Our team
            </h6>
            <h1 className="display-3 fw-bold mb-3">People</h1>
            <p className="text-muted mb-6">
              He must have tried it a hundred times, shut his eyes so that he
              wouldn't have to look at the floundering legs, and only stopped
              when he began to feel a mild, dull pain there that he had never
              felt before.
            </p>
            <Row>
              <Col xs="6" md="3" className="text-center mb-4">
                <Avatar
                  size="xxl"
                  image="/img/avatar/avatar-0.jpg"
                  alt=""
                  className="shadow-0 mb-3"
                  objectFit="cover"
                />

                <h4 className="h6 mb-1">Frankie Kafka</h4>
                <p className="text-sm text-muted">CEO &amp; Founder </p>
              </Col>
              <Col xs="6" md="3" className="text-center mb-4">
                <Avatar
                  size="xxl"
                  image="/img/avatar/avatar-1.jpg"
                  alt=""
                  className="shadow-0 mb-3"
                  objectFit="cover"
                />
                <h4 className="h6 mb-1">Brittney Day</h4>
                <p className="text-sm text-muted">CTO </p>
              </Col>
              <Col xs="6" md="3" className="text-center mb-4">
                <Avatar
                  size="xxl"
                  image="/img/avatar/avatar-2.jpg"
                  alt=""
                  className="shadow-0 mb-3"
                  objectFit="cover"
                />
                <h4 className="h6 mb-1">Kim Cervantes</h4>
                <p className="text-sm text-muted">Marketing </p>
              </Col>
              <Col xs="6" md="3" className="text-center mb-4">
                <Avatar
                  size="xxl"
                  image="/img/avatar/avatar-3.jpg"
                  alt=""
                  className="shadow-0 mb-3"
                  objectFit="cover"
                />
                <h4 className="h6 mb-1">Massey Armstrong</h4>
                <p className="text-sm text-muted">Customer care </p>
              </Col>
              <Col xs="6" md="3" className="text-center mb-4">
                <Avatar
                  size="xxl"
                  image="/img/avatar/avatar-4.jpg"
                  alt=""
                  className="shadow-0 mb-3"
                  objectFit="cover"
                />
                <h4 className="h6 mb-1">B.J. Petersen</h4>
                <p className="text-sm text-muted">E-commerce </p>
              </Col>
              <Col xs="6" md="3" className="text-center mb-4">
                <Avatar
                  size="xxl"
                  image="/img/avatar/avatar-5.jpg"
                  alt=""
                  className="shadow-0 mb-3"
                  objectFit="cover"
                />
                <h4 className="h6 mb-1">Mayra Holman</h4>
                <p className="text-sm text-muted">Customer care </p>
              </Col>
              <Col xs="6" md="3" className="text-center mb-4">
                <Avatar
                  size="xxl"
                  image="/img/avatar/avatar-6.jpg"
                  alt=""
                  className="shadow-0 mb-3"
                  objectFit="cover"
                />
                <h4 className="h6 mb-1">Gabriel Fisher</h4>
                <p className="text-sm text-muted">Customer care </p>
              </Col>
              <Col xs="6" md="3" className="text-center mb-4">
                <Avatar
                  size="xxl"
                  image="/img/avatar/avatar-7.jpg"
                  alt=""
                  className="shadow-0 mb-3"
                  objectFit="cover"
                />
                <h4 className="h6 mb-1">Jose Holman</h4>
                <p className="text-sm text-muted">Customer care </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Brands className="bg-light py-6" />
      <section className="py-6">
        <Container>
          <Row>
            <Col lg="10" className="mx-auto text-center">
              <h2 className="mb-6">
                At Varkala, we want the right choice to be as easy as putting on
                a great T-shirt
              </h2>
            </Col>
            <Col lg={{ span: 5, offset: 1 }}>
              <p className="text-muted text-sm">
                One morning, when Gregor Samsa woke from troubled dreams, he
                found himself transformed in his bed into a horrible vermin. He
                lay on his armour-like back, and if he lifted his head a little
                he could see his brown belly, slightly domed and divided by
                arches into stiff sections{" "}
              </p>
            </Col>
            <Col lg="5">
              <p className="text-muted text-sm">
                The bedding was hardly able to cover it and seemed ready to
                slide off any moment. His many legs, pitifully thin compared
                with the size of the rest of him, waved about helplessly as he
                looked. &quot;What's happened to me?&quot; he thought. It wasn't
                a dream.{" "}
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default About
