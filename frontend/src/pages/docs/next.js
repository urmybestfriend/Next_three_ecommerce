import React from "react"
import Link from "next/link"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"

import { Container, Row, Col, Breadcrumb, Card } from "react-bootstrap"

import DocsNav from "../../components/Docs/DocsNav"

export async function getStaticProps() {
  return {
    props: {
      title: "Docs Next.js",
    },
  }
}

const Next = () => {
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
                <Breadcrumb.Item active>Next.js</Breadcrumb.Item>
              </Breadcrumb>
              <div className="hero-content">
                <h1 className="hero-heading">Next.js</h1>
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
            <div id="gettingstarted" className="docs-item">
              <h5 className="text-uppercase mb-4">Getting started</h5>

              <div className="docs-desc">
                <p className="lead">
                  This theme uses zero configuration{" "}
                  <a href="https://nextjs.org/">Next.js</a> framework which is
                  based on React, Webpack and Babel. It allows you to make
                  blazing fast web applications with possibility of server side
                  rendering.
                </p>
              </div>
              <div className="mt-5">
                <h6 className="text-uppercase mb-4">Biggest advantages</h6>
                <ul>
                  <li>Pre-Rendering</li>
                  <li>Static Exporting</li>
                  <li>Zero Configuration</li>
                  <li>Fully Extensible</li>
                  <li>Optimized & Ready for Production</li>
                </ul>
                <p>
                  Find out more about Next.js at{" "}
                  <a href="https://nextjs.org/">project website</a>.
                </p>
              </div>

              <hr className="my-5" />

              <div>
                <p className="mb-5">
                  To use this theme, all you need to do is to install Node,
                  theme's dependencies, and you're good to go.
                </p>
                <h6 className="text-uppercase mb-4">1. Install Node</h6>
                <p className="text-muted mb-5">
                  If you don't have Node installed on your machine, head to{" "}
                  <a href="https://nodejs.org/en/download/">
                    its official site
                  </a>{" "}
                  and choose an appropriate installation for your system.
                </p>
                <h6 className="text-uppercase mb-4">
                  2. Install project's dependencies
                </h6>
                <p className="text-muted mb-4">
                  This will install dependencies from theme's{" "}
                  <code>package.json</code> file.
                </p>
                <SyntaxHighlighter
                  language="javascript"
                  style={tomorrow}
                  className="rounded shadow p-4 mb-5"
                >
                  {`$ npm install`}
                </SyntaxHighlighter>
                <h6 className="text-uppercase mb-4">
                  3. Run development enviroment
                </h6>
                <p className="text-muted mb-4">
                  This will run a development task for Next.js. You're all set.{" "}
                </p>
                <SyntaxHighlighter
                  language="javascript"
                  style={tomorrow}
                  className="rounded shadow p-4 mb-5"
                >
                  {`$ npm run dev`}
                </SyntaxHighlighter>
                <h6 className="text-uppercase mb-4">4. Run production build</h6>
                <p className="text-muted mb-4">
                  This task builds optimized application for production usage
                  which you can find in <code>/.next</code> folder at the root
                  of your project
                </p>
                <SyntaxHighlighter
                  language="javascript"
                  style={tomorrow}
                  className="rounded shadow p-4 mb-5"
                >
                  {`$ npm run build`}
                </SyntaxHighlighter>
              </div>
            </div>
            <div id="development" className="docs-item">
              <h5 className="text-uppercase mb-4">Development</h5>
              <div className="docs-desc">
                <p className="lead">
                  Running <code>npm run dev</code> in the theme's folder will
                  start a local server instance on port 3000 to serve and
                  refresh your pages as you edit.
                </p>
              </div>
            </div>
            <div id="productionbuild" className="docs-item">
              <h5 className="text-uppercase mb-4">Production build</h5>
              <div className="docs-desc">
                <p className="lead">
                  Running <code>npm run build</code> in the theme's folder makes{" "}
                  <code>/.next</code> folder with optimized production build.
                  Read more about production build{" "}
                  <a href="https://nextjs.org/docs/getting-started">here</a>.
                </p>
              </div>
            </div>
            <div id="productionbuild" className="docs-item">
              <h5 className="text-uppercase mb-4">Static Export</h5>
              <div className="docs-desc">
                <p className="lead">
                  Running <code>npm run export</code> in the theme's folder
                  makes <code>/out</code> folder with a static export of your
                  website. Read more about Static HTML exports{" "}
                  <a href="https://nextjs.org/docs/advanced-features/static-html-export">
                    here
                  </a>
                  .
                </p>
                <div className="mt-2">
                  <p>
                    To setup your project for <code>static export</code>,
                    following configuration is needed.
                  </p>
                  <Card className="bg-gray-100 border-0">
                    <Card.Body>
                      <h6 className="text-muted text-uppercase fw-normal mb-3">
                        next.config.js
                      </h6>
                      <Card.Text>
                        <SyntaxHighlighter
                          language="javascript"
                          style={tomorrow}
                          className="rounded shadow p-4"
                        >
                          {highlightCode}
                        </SyntaxHighlighter>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
            <div id="deployment" className="docs-item">
              <h5 className="text-uppercase mb-4">Deployment</h5>
              <div className="docs-desc">
                <p className="lead">
                  Easiest way to deploy your project is using{" "}
                  <a href="https://vercel.com/">Vercel platform</a>. More about
                  deploying Next.js app{" "}
                  <a href="https://nextjs.org/docs/deployment">here</a>.
                </p>
              </div>
            </div>
            <div id="data" className="docs-item">
              <h5 className="text-uppercase mb-4">Data</h5>
              <div className="docs-desc">
                <p className="lead">
                  Theme uses static JSON files to feed data to the pages and
                  components. You can fetch your own data from headless CMS or
                  API. You can also simply edit sample JSON files located at{" "}
                  <code>/src/data</code> folder for easy content editing.
                </p>
                <p className="lead">
                  Find out more about data fetching{" "}
                  <a href="https://nextjs.org/docs/basic-features/data-fetching">
                    here
                  </a>
                  .
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Next

const highlightCode = `{
  images: {
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // loader: "imgix", // Uncoment this line
    // path: "", // Uncoment this line
  },
  env: {
    production_type: "server", // Change variable to "static"
  },
  // trailingSlash: true, // Uncoment this line
},`
