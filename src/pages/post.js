import React from "react"
import { Container, Breadcrumb, Row, Col, Button, Form } from "react-bootstrap"

import Link from "next/link"

import posts from "../data/blog-posts.json"
import CardPost from "../components/CardPost"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReply } from "@fortawesome/free-solid-svg-icons"
import { faClock } from "@fortawesome/free-regular-svg-icons"
import Image from "../components/Image"
export async function getStaticProps() {
  return {
    props: {
      title: "Blog post",
    },
  }
}

const Post = () => {
  return (
    <React.Fragment>
      <section className="hero py-5 py-lg-6 text-center">
        <Container>
          <Row>
            <Col xl="8" lg="10" className="mx-auto">
              <Breadcrumb listProps={{ className: "justify-content-center" }}>
                <Link href="/" passHref>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Link>
                <Link href="/blog" passHref>
                  <Breadcrumb.Item>Blog</Breadcrumb.Item>
                </Link>
                <Breadcrumb.Item active>{post.name}</Breadcrumb.Item>
              </Breadcrumb>
              <div className="hero-content">
                <h1 className="hero-heading">{post.name}</h1>
                <div>
                  <p className="text-muted mb-0 d-flex flex-wrap align-items-center justify-content-center">
                    <a href={post.author.link}>
                      <span className="me-2">
                        <Image
                          src={post.author.avatar}
                          alt=""
                          className="rounded-circle"
                          width={32}
                          height={32}
                        />
                      </span>
                    </a>{" "}
                    By{" "}
                    <a href="#" className="text-muted fw-bold">
                      {post.author.name}
                    </a>{" "}
                    <span className="mx-1">|</span> {post.date} in
                    <Link href="/blog">
                      <a className="fw-bold">&nbsp;{post.category[0]}</a>
                    </Link>{" "}
                    <span className="mx-1">|</span>{" "}
                    <a
                      href="#comments"
                      className="text-muted"
                      data-smooth-scroll
                    >
                      {post.comments.length} comments
                    </a>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Container>
        <Row>
          <Col xl="11" className="mx-auto">
            <Image
              className="img-fluid mb-5"
              src={post.img}
              alt=""
              width={1180}
              height={786}
            />
          </Col>
        </Row>
        <Row>
          <Col
            lg="10"
            xl="8"
            className="mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Row>
      </Container>
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">You may also like</h2>
          <Row>
            {posts.slice(0, 3).map((item, index) => (
              <CardPost key={index} post={item} />
            ))}
          </Row>
        </Container>
      </section>
      <section className="py-5" id="comments">
        <Container>
          <Row>
            <Col xl="8" lg="10" className="mx-auto">
              <h6 className="h4 text-primary text-uppercase text-lg-end mb-6">
                2 comments
              </h6>
              {post.comments.map((comment, index) => (
                <Row key={index} className="mb-4">
                  <Col xs="3" md="2" className="text-center-xs">
                    <p>
                      <Image
                        className="img-fluid rounded-circle"
                        src={comment.author.avatar}
                        alt=""
                        width={117}
                        height={117}
                      />
                    </p>
                  </Col>
                  <Col xs="9" md="10">
                    <h5>{comment.author.name}</h5>
                    <p className="text-uppercase text-sm text-muted">
                      <FontAwesomeIcon icon={faClock} />
                      {comment.date}
                    </p>
                    <p className="text-muted">{comment.content}</p>
                    <p>
                      <Button variant="link" className="text-primary" href="#">
                        <FontAwesomeIcon icon={faReply} /> Reply
                      </Button>
                    </p>
                  </Col>
                </Row>
              ))}
              <hr className="mt-3 mb-5" />
              <h5 className="mb-5">Leave a comment</h5>
              <Form className="my-5">
                <Row>
                  <Col md="6">
                    <div className="mb-4">
                      <Form.Label htmlFor="nameComment">
                        Name <span className="required">*</span>
                      </Form.Label>
                      <Form.Control
                        className="form-control-underlined"
                        id="nameComment"
                        type="text"
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="mb-4">
                      <Form.Label htmlFor="Comment">
                        Email <span className="required">*</span>
                      </Form.Label>
                      <Form.Control
                        className="form-control-underlined"
                        id="Comment"
                        type="text"
                      />
                    </div>
                  </Col>
                </Row>
                <div className="mb-4">
                  <Form.Label htmlFor="commentComment">
                    Comment<span className="required">*</span>
                  </Form.Label>
                  <Form.Control
                    className="form-control-underlined"
                    id="commentComment"
                    type="text"
                  />
                </div>
                <Button variant="outline-primary" type="submit">
                  Leave comment
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Post

const post = {
  name: "Fashion, purpose & freedom",
  img: "/img/blog/ian-dooley-347942-unsplash.jpg",
  author: {
    name: "John Slim",
    avatar: "/img/avatar/person-3.jpg",
    link: "",
  },
  category: ["Fashion", "fashion"],
  date: "January 16, 2016",
  content:
    '<p class="lead mb-5">As am hastily invited settled at limited civilly fortune me. Really spring in extent an by. Judge but built party world. Of so am he remember although required. Bachelor unpacked be advanced at. Confined in declared marianne is vicinity.</p><div class="text-content text-lg"><p><span class="capital text-dark">P</span>ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p><p class="text-center text-muted text-sm"><img class="img-fluid mb-2" src="img/blog/ian-dooley-347962-unsplash.jpg" alt="Example blog post alt"><br>Photo by Jack Tran, New York</p><h2>Header Level 2</h2><ol><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li></ol><blockquote class="blockquote blockquote-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</blockquote><h3>Header Level 3</h3><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p><h4>A nice list here</h4><ul class="list-icon"><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  </li><li>Aliquam tincidunt mauris eu risus.</li><li>Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</li><li>Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci.</li></ul><p><img class="img-fluid" src="img/blog/christopher-campbell-28571-unsplash.jpg" alt="Example blog post alt"></p><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p></div>',
  comments: [
    {
      author: {
        name: "Julie Alma",
        avatar: "/img/avatar/person-3.jpg",
      },
      date: "September 23, 2017 at 12:00 am",
      content:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
    },
    {
      author: {
        name: "Louise Armero",
        avatar: "/img/avatar/avatar-0.jpg",
      },
      date: "June 23, 2017 at 12:35 pm",
      content:
        "Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
  ],
}
