import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { Col, Container, Dropdown, Row } from "react-bootstrap"
import Icon from "../Icon"

const TopBar = ({ header }) => {
  const changeLanguage = (value) => {
    localStorage.setItem("lang", value)
    window.location.reload()
  }

  //get selected user data
  var __selected_lang, __langStorageItem

  if (typeof window !== "undefined") {
    __langStorageItem = window.localStorage.getItem("lang")
    __langStorageItem !== "undefined"
      ? (__selected_lang = __langStorageItem)
      : null
  } else {
    __selected_lang = "en"
  }

  return (
    <div
      className={`top-bar text-sm ${
        header && header.transparentBar ? "bg-transparent" : ""
      }`}
    >
      <Container className="px-lg-5 py-3" fluid>
        <Row className="align-items-center">
          {/* SOCIAL & PHONE BLOCK */}
          <Col md="4" className="d-none d-md-block">
            <ul className="list-inline mb-0">
              <li className="list-inline-item me-2">
                <a
                  className="text-reset text-hover-primary"
                  href="#"
                  aria-label="Go to Facebook"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </li>
              <li className="list-inline-item me-4">
                <a
                  className="text-reset text-hover-primary"
                  href="#"
                  aria-label="Go to Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="list-inline-item me-2">
                <Icon icon="calls-1" className="me-2" />
                020-800-456-747
              </li>
            </ul>
          </Col>
          {/* END SOCIAL & PHONE BLOCK */}

          {/* ANNOUNCEMENT */}
          <Col md="4" sm="6" className="text-start text-md-center">
            <p className="mb-0">{/* Free in-store delivery */}</p>
          </Col>
          {/* END ANNOUNCEMENT */}

          <Col md="4" sm="6" className="d-none d-sm-flex justify-content-end">
            {/* LANGUAGE SWITCHER */}
            <Dropdown className="border-end px-3">
              <select
                className="topbar-link dropdown-toggle outline-none border-none"
                as="a"
                href="#"
                id="langsDropdown"
                onChange={(e) => changeLanguage(e.target.value)}
                value={__selected_lang}
              >
                <option value="en">English&nbsp;{"(EN)"}</option>
                <option value="de">Deutch&nbsp;{"(DE)"}</option>
              </select>
              {/* <Dropdown.Menu align="end" aria-labelledby="langsDropdown">
                <Dropdown.Item href="#" value="">
                  German
                </Dropdown.Item>
                <Dropdown.Item href="#">French</Dropdown.Item>
              </Dropdown.Menu> */}
            </Dropdown>
            {/* END LANGUAGE SWITCHER */}

            {/* CURRENCY SWITCHER */}
            <Dropdown className="ps-3 ms-0">
              <select
                className="topbar-link dropdown-toggle outline-none border-none"
                as="a"
                href="#"
                id="langsDropdown"
              >
                <option value="en">EUR</option>
                {/* <option value="de">GBP</option> */}
              </select>
              {/* <Dropdown.Toggle
                className="topbar-link dropdown-toggle"
                as="a"
                href="#"
                id="currencyDropdown"
              >
                USD
              </Dropdown.Toggle> */}
              {/* <Dropdown.Menu align="end" aria-labelledby="currencyDropdown">
                <Dropdown.Item href="#">EUR</Dropdown.Item>
                <Dropdown.Item href="#"> GBP</Dropdown.Item>
              </Dropdown.Menu> */}
            </Dropdown>
            {/* END CURRENCY SWITCHER */}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TopBar
