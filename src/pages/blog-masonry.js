import React from "react"
import { Container, Breadcrumb, Pagination } from "react-bootstrap"
import { Parallax, Background } from "react-parallax"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import blogPosts from "../data/blog-posts.json"
import Link from "next/link"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "../components/Image"
export async function getStaticProps() {
  return {
    props: {
      title: "Blog Masonry",
    },
  }
}

const BlogMasonry = () => {
  return (
    <React.Fragment>
      <Container className="mt-5">
        <Parallax
          className="hero hero-boxed"
          strength={500}
          bgStyle={{ height: "120%" }}
        >
          <Background className="vw-100">
            <Image
              src="/img/photo/chris-murray-YGzEX5yLKeA-unsplash.jpg"
              alt="Background image"
              layout="fill"
              className="bg-image"
              priority
            />
          </Background>
          <div className="z-index-10 position-relative  py-lg-7">
            <Breadcrumb>
              <Link href="/" passHref>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
              </Link>
              <Breadcrumb.Item active>Blog</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="display-2 text-white">Blog</h1>
          </div>
        </Parallax>
      </Container>
      <section className="pt-5 pb-6">
        <Container className="overflow-hidden">
          <ResponsiveMasonry
            style={{ marginTop: "80px" }}
            columnsCountBreakPoints={{ 300: 1, 650: 2, 900: 3 }}
          >
            <Masonry gutter="100px">
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  style={{ marginTop: "-60px" }}
                  data-aos="zoom-in"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <a className="d-block mb-4">
                      <span className="masonry-image">
                        <Image
                          layout="fill"
                          src={post.masonry ? post.masonry : post.img}
                          alt=""
                          sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 363px"
                        />
                      </span>
                    </a>
                  </Link>
                  <h5 className="mb-2">
                    <Link href={`/blog/${post.slug}`}>
                      <a className="text-dark">{post.name}</a>
                    </Link>
                  </h5>
                  <p className="text-gray-500 text-sm">
                    <Link href={`/${post.category[1]}`}>
                      <a className="text-uppercase text-xs me-2" href="#">
                        {post.category[0]}
                      </a>
                    </Link>
                    {post.date}
                  </p>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
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

export default BlogMasonry
