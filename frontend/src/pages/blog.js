import React from "react"
import { Container, Breadcrumb, Row, Pagination } from "react-bootstrap"

import Link from "next/link"
import { Parallax, Background } from "react-parallax"

import blogPosts from "../data/blog-posts.json"
import CardPost from "../components/CardPost"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Image from "../components/Image"
export async function getStaticProps() {
  return {
    props: {
      title: "Blog",
      header: {
        transparentNavbar: true,
        absolute: true,
      },
    },
  }
}

const Blog = () => {
  return (
    <React.Fragment>
      <Parallax
        className="hero hero-boxed"
        bgStyle={{ height: "calc(100% + 130px)", top: "-15%" }}
        strength={700}
      >
        <Background className="vw-100">
          <Image
            src="/img/photo/blog-2.jpg"
            alt="Background image"
            layout="fill"
            className="bg-image"
            priority
          />
        </Background>
        <Container className="py-7 pb-xl-6">
          <Breadcrumb>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Blog</Breadcrumb.Item>
          </Breadcrumb>
          <div className="hero-content">
            <h1 className="hero-heading">Blog</h1>
            <div>
              <p className="lead ">
                As am hastily invited settled at limited civilly fortune me.
                Really spring in extent an by. Judge but built party world. Of
                so am he remember although required. Bachelor unpacked be
                advanced at. Confined in declared marianne is vicinity.
              </p>
            </div>
          </div>
        </Container>
      </Parallax>

      <section className="py-6">
        <Container className="overflow-hidden">
          <Row className="mx-lg-n5">
            {blogPosts.map((post, index) => (
              <CardPost key={index} post={post} category />
            ))}
          </Row>
          <Pagination
            className="justify-content-between mb-5"
            aria-label="Blog pagination"
          >
            <Pagination.Item href="#">
              <FontAwesomeIcon icon={faChevronLeft} className="me-1" />
              Older posts
            </Pagination.Item>
            <Pagination.Item disabled href="#">
              Newer posts
              <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
            </Pagination.Item>
          </Pagination>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Blog
