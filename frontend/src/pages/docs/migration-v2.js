import React from "react"
import Link from "next/link"

import { Container, Row, Col, Breadcrumb } from "react-bootstrap"

import DocsNav from "../../components/Docs/DocsNav"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism"
export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Docs migration to v2",
    },
  }
}

const DocsMigration = (props) => {
  return (
    <React.Fragment>
      <section className="hero py-5 py-lg-7">
        <Container className="position-relative">
          <Breadcrumb listProps={{ className: "ps-0 justify-content-center" }}>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/docs/docs-introduction" passHref>
              <Breadcrumb.Item>Documentation</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Migration to v2</Breadcrumb.Item>
          </Breadcrumb>

          <h1 className="hero-heading">Migration to v2</h1>
        </Container>
      </section>
      <section className="py-6">
        <Container fluid>
          <Row className="px-xl-5">
            <Col lg="2">
              <DocsNav />
            </Col>
            <Col lg="10" className="docs-content">
              <div className="docs-item">
                <h5 className="text-uppercase mb-4">
                  ReactStrap vs React-Bootstrap
                </h5>
                <div className="docs-desc"></div>
                <div className="mt-5">
                  <p>
                    For version 2 of the Directory React theme, we've decided to
                    switch to the{" "}
                    <a href="https://react-bootstrap.github.io/">
                      React-Bootstrap
                    </a>{" "}
                    plugin, instead of the{" "}
                    <a href="https://reactstrap.github.io/">ReactStrap</a>. All
                    components are rewritten accordingly.
                  </p>
                  <p>
                    Main reasons are faster development, broader community, and
                    most importantly, faster{" "}
                    <a href="https://getbootstrap.com/docs/5.0/getting-started/introduction/">
                      Bootstrap 5
                    </a>{" "}
                    implementation. Also, in some cases, simplicity compared
                    ReactStrap.
                  </p>
                  <p>
                    A lot of components have the same or similar syntax. Please
                    follow{" "}
                    <a href="https://react-bootstrap.github.io/getting-started/introduction">
                      React-Bootstrap documentation
                    </a>{" "}
                    for more information.
                  </p>
                </div>
              </div>
              <div className="docs-item">
                <h5 className="text-uppercase mb-4">Migration</h5>
                <div className="docs-desc"></div>
                <div className="mt-5">
                  <p>
                    If you would like to migrate from v1 to v2, please follow
                    the documentations for{" "}
                    <a href="https://react-bootstrap.github.io/migrating/">
                      React-Bootstrap migration
                    </a>{" "}
                    and{" "}
                    <a href="https://getbootstrap.com/docs/5.0/migration/">
                      Bootstrap 5 migration
                    </a>
                    .
                  </p>
                  <p>
                    To show the changes needed to upgrade Directory [React] from
                    v1 to v2, please look at a few examples below.
                  </p>
                </div>
              </div>
              <div className="docs-item">
                <h5 className="text-uppercase mb-4">
                  Examples of syntax differences
                </h5>
                <div className="mt-5">
                  <h6 className="mb-4">1. Navbar</h6>
                  <Row>
                    <Col xxl="6">
                      <p>
                        <b>ReactStrap</b>
                      </p>
                      <p className="text-muted text-sm">
                        Used in Directory [React] v1.{" "}
                        <a href="https://reactstrap.github.io/components/navbar/">
                          See docs
                        </a>
                      </p>
                      <SyntaxHighlighter
                        language="javascript"
                        style={tomorrow}
                        className="rounded shadow p-4 mb-5"
                      >
                        {navbarReactstrap}
                      </SyntaxHighlighter>
                    </Col>
                    <Col xxl="6">
                      <p className="mt-5 mt-xxl-0">
                        <b>React Bootstrap</b>
                      </p>
                      <p className="text-muted text-sm">
                        Used in Directory [React] v2.{" "}
                        <a href="https://react-bootstrap.github.io/components/navbar/">
                          See docs
                        </a>
                      </p>
                      <SyntaxHighlighter
                        language="javascript"
                        style={tomorrow}
                        className="rounded shadow p-4 mb-5"
                      >
                        {navbarReactBootstrap}
                      </SyntaxHighlighter>
                    </Col>
                  </Row>
                </div>
                <hr />
                <div className="mt-5">
                  <h6 className="text-uppercase mb-4">2. Dropdown</h6>
                  <Row>
                    <Col xxl="6">
                      <p>
                        <b>ReactStrap</b>
                      </p>
                      <p className="text-muted text-sm">
                        Used in Directory [React] v1.{" "}
                        <a href="https://reactstrap.github.io/components/dropdowns/">
                          See docs
                        </a>
                      </p>
                      <SyntaxHighlighter
                        language="javascript"
                        style={tomorrow}
                        className="rounded shadow p-4 mb-5"
                      >
                        {dropdownReactstrap}
                      </SyntaxHighlighter>
                    </Col>
                    <Col xxl="6">
                      <p className="mt-5 mt-xxl-0">
                        <b>React Bootstrap</b>
                      </p>

                      <p className="text-muted text-sm">
                        Used in Directory [React] v2.{" "}
                        <a href="https://react-bootstrap.github.io/components/dropdowns/">
                          See docs
                        </a>
                      </p>
                      <SyntaxHighlighter
                        language="javascript"
                        style={tomorrow}
                        className="rounded shadow p-4 mb-5"
                      >
                        {dropdownReactBootstrap}
                      </SyntaxHighlighter>
                    </Col>
                  </Row>
                </div>
                <hr />
                <div className="mt-5">
                  <h6 className="text-uppercase mb-4">3. Button</h6>
                  <Row>
                    <Col xxl="6">
                      <p>
                        <b>ReactStrap</b>
                      </p>
                      <p className="text-muted text-sm">
                        Used in Directory [React] v1.{" "}
                        <a href="https://reactstrap.github.io/components/buttons/">
                          See docs
                        </a>
                      </p>
                      <SyntaxHighlighter
                        language="javascript"
                        style={tomorrow}
                        className="rounded shadow p-4 mb-5"
                      >
                        {buttonReactstrap}
                      </SyntaxHighlighter>
                    </Col>
                    <Col xxl="6">
                      <p className="mt-5 mt-xxl-0">
                        <b>React Bootstrap</b> -{" "}
                      </p>
                      <p className="text-muted text-sm">
                        Used in Directory [React] v2.{" "}
                        <a href="https://react-bootstrap.github.io/components/buttons/">
                          See docs
                        </a>
                      </p>
                      <SyntaxHighlighter
                        language="javascript"
                        style={tomorrow}
                        className="rounded shadow p-4 mb-5"
                      >
                        {buttonReactBootstrap}
                      </SyntaxHighlighter>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default DocsMigration

const navbarReactstrap = `
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
  );
}

export default Example;
`
const navbarReactBootstrap = `import React from 'react';
import {
  Navbar,
  Nav,
  NavDropdown
} from 'react-bootstrap';

const Example = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Example;`

const dropdownReactstrap = `import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Example = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Dropdown
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem>Some Action</DropdownItem>
        <DropdownItem text>Dropdown Item Text</DropdownItem>
        <DropdownItem disabled>Action (disabled)</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Foo Action</DropdownItem>
        <DropdownItem>Bar Action</DropdownItem>
        <DropdownItem>Quo Action</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Example;
`
const dropdownReactBootstrap = `import React from 'react';
import {
  Dropdown
} from 'react-bootstrap';

const Example = (props) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Example;`

const buttonReactstrap = `import React from 'react';
import { Button } from 'reactstrap';

const Example = (props) => {
  return (
    <Button color="primary">primary</Button>
  );
}

export default Example;
`
const buttonReactBootstrap = `import React from 'react';
import {
  Button
} from 'react-bootstrap';

const Example = (props) => {
  return (
    <Button variant="primary">Primary</Button>{
  );
}

export default Example;`
