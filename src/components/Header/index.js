import React, { useEffect } from "react"
import Router from "next/router"
import Link from "next/link"
import { Nav, Navbar, NavLink } from "react-bootstrap"

import menu from "../../data/menu.json"

import Icon from "../Icon"
import ActiveLink from "../ActiveLink"
import MainIcons from "./MainIcons"

import initialProducts from "../../data/products-clothes.json" // Remove on production

import { CartContext } from "../CartContext"

import { addCartItem } from "../../hooks/UseCart"
import { WishlistContext } from "../WishlistContext"
import { addWishlistItem } from "../../hooks/UseWishlist"
import TopBar from "./TopBar"
import SearchBlock from "./SearchBlock"
import DropdownMenuItem from "./DropdownMenuItem"
import UseWindowSize from "../../hooks/UseWindowSize"

const Header = ({ header }) => {
  const [collapse, setCollapse] = React.useState(false)
  const size = UseWindowSize() // Viewport size hook
  const [parentName, setParentName] = React.useState(false)
  const [cartItems, dispatch] = React.useContext(CartContext) // Cart context
  const [wishlistItems, wishlistDispatch] = React.useContext(WishlistContext) // Wishlist context

  const highlightDropdownParent = () => {
    // Highlight dropdown parent based on page load
    menu.map((item) => {
      item.links &&
        item.links.map((link) => {
          link.link === Router.route && setParentName(item.name)
        })
      item.groups &&
        item.groups.map(
          (group) =>
            group.links &&
            group.links.map(
              (link) => link.link === Router.route && setParentName(item.name)
            )
        )
      item.icons &&
        item.icons.map((link) => {
          link.link === Router.route && setParentName(item.name)
        })

      item.columns &&
        item.columns.map((column) =>
          column.lists.map((list) =>
            list.links.map((link) => {
              if (link.link === Router.route) {
                link.parent
                  ? setParentName(link.parent)
                  : setParentName(item.name)
              }
            })
          )
        )
    })
  }

  useEffect(() => {
    highlightDropdownParent()

    if (localStorage.getItem("cart")) {
      // If localStorage exists set cart items to cart context
      JSON.parse(localStorage.getItem("cart")).map((product) =>
        dispatch({ type: "add", payload: product })
      )
    }
    // Remove on production START -->
    else {
      // Set first six product items to cart on demo
      initialProducts.slice(0, 6).map((product) => {
        addCartItem(product, 1)
        dispatch({ type: "add", payload: product, quantity: 1 })
      })
    }
    // <-- END remove

    if (localStorage.getItem("wishlist")) {
      // If localStorage exists set wishlist items to wishlist context
      JSON.parse(localStorage.getItem("wishlist")).map((product) =>
        wishlistDispatch({ type: "add", payload: product })
      )
    }
    // Remove on production START -->
    else {
      // Set 6th, 7th & 8th product item to cart on demo
      initialProducts.slice(5, 8).map((product) => {
        addWishlistItem(product)
        wishlistDispatch({ type: "add", payload: product })
      })
    }
    // <-- END remove
  }, [])

  const onLinkClick = (parent) => {
    size.width < 991 && setCollapse(!collapse) // If viewport below 991px toggle collapse block
    setParentName(parent) // Set parent name for item parent higlight
  }
  return (
    <header
      className={`header ${header && header.absolute ? "header-absolute" : ""}`}
    >
      {/* TOP BAR */}
      <TopBar header={header} />
      {/* END TOP BAR */}

      {/* NAV BAR */}
      <Navbar
        expand="lg"
        style={{ zIndex: "11" }}
        bg={
          header && header.transparentNavbar
            ? collapse
              ? "white"
              : "transparent"
            : "white"
        }
        expanded={collapse}
        className={`border-0 ${
          header && header.transparentNavbar ? "shadow-0" : ""
        } px-lg-5 ${collapse ? "was-transparent was-navbar-light" : ""}`}
      >
        {/* LOGO */}
        <Link href="/" passHref>
          <Navbar.Brand>Varkala</Navbar.Brand>
        </Link>
        {/* END LOGO */}

        {/* TOP USER MOBILE ICONS */}
        <MainIcons className="d-block d-lg-none" />
        {/* TOP USER MOBILE ICONS */}

        {/* NAV MOBILE TOGGLER  */}
        <Navbar.Toggle
          className="navbar-toggler-right text-hover-primary"
          onClick={() => setCollapse(!collapse)}
          aria-label="Toggle navigation"
        >
          <Icon icon="menu-hamburger-1" className="navbar-icon" />
        </Navbar.Toggle>
        {/* END NAV MOBILE TOGGLER */}

        {/* MENU */}
        <Navbar.Collapse>
          <Nav className="mt-3 mt-lg-0" navbar>
            {menu.map((item, index) => {
              // Mapping through menu items

              return item.link ? ( // If item has property link than simple link
                <Nav.Item key={index}>
                  <ActiveLink
                    activeClassName="active"
                    href={item.link}
                    passHref
                  >
                    <NavLink>{item.name}</NavLink>
                  </ActiveLink>
                </Nav.Item>
              ) : (
                // If item doesn't have link property than dropdown
                <DropdownMenuItem
                  onLinkClick={onLinkClick}
                  item={item}
                  key={item.name}
                  parentName={parentName}
                  viewportWidth={size.width}
                />
              )
            })}
          </Nav>

          {/* SEARCH BLOCK */}
          <SearchBlock />
          {/* END SEARCH BLOCK */}

          {/* TOP USER ICONS */}
          <MainIcons className="d-none d-lg-block" sidebarRight />
          {/* END TOP USER ICONS */}
        </Navbar.Collapse>
        {/* END MENU */}
      </Navbar>
      {/* END NAV BAR */}
    </header>
  )
}

export default Header
