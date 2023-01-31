import React from "react"

import { Col, Collapse, Form } from "react-bootstrap"

import brands from "../data/brands.json"
import tags from "../data/tags.json"
import colors from "../data/colors.json"
import sizes from "../data/sizes.json"
import PriceSlider from "./PriceSlider"

const Filters = ({ top }) => {
  // Filter inputs state where all inputs all stored.
  const [filterInputs, setFilterInputs] = React.useState({
    // Remove or customize on PROD - Some brands are preselected by "checked" property. Using reduce they're set default in state.
    "clothes-brand": brands.reduce(
      (a, item) => (item.checked && a.push(item.value), a),
      []
    ),

    // Remove or customize on PROD - Set first size as default
    size: sizes[0].value,

    // Remove or customize on PROD - Set first tag as default
    tag: [tags[0].value],
  })

  // Collapse state
  const [collapse, setCollapse] = React.useState({})
  const toggleCollapse = (name) => {
    setCollapse({ ...collapse, [name]: !collapse[name] })
  }

  // On input change func
  const onInputChange = (e) => {
    const type = e.target.type // Input type
    const value = e.target.id // Input value
    const name = e.target.name // Input name

    type === "radio" // If input type radio
      ? setFilterInputs({ ...filterInputs, [name]: value })
      : // If not input type radio
      filterInputs[name] // If input group exists
      ? filterInputs[name].some((item) => item === value) // If item exists in array > remove
        ? setFilterInputs({
            ...filterInputs,
            [name]: filterInputs[name].filter((x) => x !== value),
          })
        : setFilterInputs({
            ...filterInputs,
            [name]: [...filterInputs[name], value],
          }) // If item doesn't exists in array > add it to input group
      : setFilterInputs({ ...filterInputs, [name]: [value] }) // If input group doesn't exists > create input group and add value
  }

  // Checkbox filter component
  const CheckboxesFilter = ({ data }) => (
    <Form className={top ? "" : "mt-4 mt-lg-0"}>
      {data.map((item) => (
        <div key={item.value} className="mb-1">
          <Form.Check
            type="checkbox"
            name={item.name}
            id={item.value}
            label={
              <React.Fragment>
                {item.label} <small>({item.productcount})</small>
              </React.Fragment>
            }
            checked={
              filterInputs[item.name]
                ? filterInputs[item.name].includes(item.value)
                : ""
            }
            onChange={(e) => onInputChange(e)}
          />
        </div>
      ))}
    </Form>
  )

  // Colors filter component
  const ColorsFilter = () => (
    <ul
      className={`list-inline mb-0 colours-wrapper ${
        top ? "" : "mt-4 mt-lg-0"
      }`}
    >
      {colors.map((color) => (
        <li key={color.value} className="list-inline-item">
          <Form.Label
            className={`btn-colour ${
              filterInputs["colour"] &&
              filterInputs["colour"].some((item) => item === color.value)
                ? "active"
                : ""
            }`}
            htmlFor={color.value}
            style={{ backgroundColor: color.color }}
          />
          <Form.Check
            className="input-invisible"
            type="checkbox"
            name="colour"
            id={color.value}
            checked={
              filterInputs["colour"]
                ? filterInputs["colour"].includes(color.value)
                : ""
            }
            onChange={(e) => onInputChange(e)}
          />
        </li>
      ))}
    </ul>
  )

  // Sizes filter component
  const SizeFilter = () => (
    <Form className={top ? "" : "mt-4 mt-lg-0"}>
      {sizes.map((size) => (
        <div key={size.value} className="mb-1">
          <Form.Check
            type="radio"
            name="size"
            id={size.value}
            label={size.name}
            checked={
              filterInputs["size"] ? filterInputs["size"] === size.value : ""
            }
            onChange={(e) => onInputChange(e)}
          />
        </div>
      ))}
    </Form>
  )

  // Filters for sidebar
  const sidebarFilters = [
    {
      component: <PriceSlider top={top} />,
      title: "Filter by price",
      subtitle: "Price",
    },
    {
      component: <CheckboxesFilter data={brands} />,
      title: "Filter by brand",
      subtitle: "Brand",
    },
    {
      component: <SizeFilter />,
      title: "Filter by size",
      subtitle: "Size",
    },
    {
      component: <ColorsFilter />,
      title: "Filter by colour",
      subtitle: "Colour",
    },
  ]

  // Filters above product
  const topFilters = [
    {
      component: <CheckboxesFilter data={brands} />,
      title: "Filter by brand",
      subtitle: "Brand",
    },
    {
      component: <SizeFilter />,
      title: "Filter by size",
      subtitle: "Size",
    },
    [
      {
        component: <PriceSlider top={top} />,
        title: "Filter by price",
        subtitle: "Price",
      },
      {
        component: <ColorsFilter />,
        title: "Filter by colour",
        subtitle: "Colour",
      },
    ],
    {
      component: <CheckboxesFilter data={tags} />,
      title: "Filter by tag",
      subtitle: "Tags",
    },
  ]

  // If top prop true, set filters above products else to sidebar
  const filtersBlocks = top ? topFilters : sidebarFilters

  return filtersBlocks.map((filter, index) =>
    top ? ( // If top filters position
      <Col key={index} sm="6" xl="3" className="mb-3">
        {Array.isArray(filter) ? ( // If multiple filters in same column
          filter.map((item) => (
            <React.Fragment key={item.subtitle}>
              <h6 className="text-dark">{item.subtitle}</h6>

              {/* FILTER */}
              {item.component}
              {/* END FILTER */}
            </React.Fragment>
          ))
        ) : (
          <React.Fragment>
            <h6 className="text-dark">{filter.subtitle}</h6>

            {/* FILTER */}
            {filter.component}
            {/* END FILTER */}
          </React.Fragment>
        )}
      </Col>
    ) : (
      <div key={index} className="sidebar-block px-3 px-lg-0">
        {/* COLLAPSE TOGGLE */}
        <a
          className="d-lg-none block-toggler"
          data-toggle="collapse"
          aria-expanded={collapse[filter.subtitle]}
          onClick={() => toggleCollapse(filter.subtitle)}
        >
          {filter.title}
          <span className="block-toggler-icon" />
        </a>
        {/* END COLLAPSE TOGGLE */}

        {/* COLLAPSE */}
        <Collapse in={collapse[filter.subtitle]} className="expand-lg">
          <div>
            <h5 className="sidebar-heading d-none d-lg-block">
              {filter.subtitle}
            </h5>

            {/* FILTER */}
            {filter.component}
            {/* END FILTER */}
          </div>
        </Collapse>
        {/* END COLLAPSE */}
      </div>
    )
  )
}

export default Filters
