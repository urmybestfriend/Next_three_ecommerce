import React, { useState } from "react"

import Filters from "./Filters"
import Icon from "./Icon"
import SortBy from "./SortBy"
import { Row, Button, Collapse } from "react-bootstrap"

const CategoryTopBar = ({ filter }) => {
  const [collapse, setCollapse] = useState(false)
  return (
    <header className="product-grid-header">
      <div className="me-3 mb-3">
        Showing <strong>1-12 </strong>of <strong>158 </strong>products
      </div>
      <div className="me-3 mb-3">
        <span className="me-2">Show</span>
        <a className="product-grid-header-show active" href="#">
          12
        </a>
        <a className="product-grid-header-show " href="#">
          24
        </a>
        <a className="product-grid-header-show " href="#">
          All
        </a>
      </div>
      {filter && (
        <div className="me-3 mb-3">
          <Button
            variant="link"
            className="text-dark ps-0 dropdown-toggle text-decoration-none"
            data-toggle="collapse"
            aria-expanded={collapse}
            onClick={() => setCollapse(!collapse)}
          >
            Filter
          </Button>
        </div>
      )}

      <div className="mb-3 d-flex align-items-center">
        <span className="d-inline-block me-2">Sort by</span>
        <SortBy />
      </div>
      {filter && (
        <Collapse in={collapse} className="w-100">
          <div className="py-4 mb-5">
            <Row>
              <Filters top />
            </Row>
            <Button
              variant="link"
              className="d-flex align-items-center ps-0 ms-n3"
            >
              <Icon icon="close-1" className="w-3rem h-3rem me-n1" />
              Clear all filters
            </Button>
          </div>
        </Collapse>
      )}
    </header>
  )
}

export default CategoryTopBar
