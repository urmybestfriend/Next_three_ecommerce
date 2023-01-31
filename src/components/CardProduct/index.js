import React from "react"

import { CartContext } from "../CartContext"
import { addCartItem } from "../../hooks/UseCart"
import { addWishlistItem } from "../../hooks/UseWishlist"
import { WishlistContext } from "../WishlistContext"
import ModalQuickView from "../ModalQuickView"
import CardProductDefault from "./Default"
import CardProduct1 from "./1"
import CardProduct2 from "./2"
import CardProduct3 from "./3"
import CardProduct4 from "./4"
import CardProduct5 from "./5"
import CardProduct6 from "./6"
import CardProduct7 from "./7"

const CardProduct = ({ product, masonry, cardType }) => {
  const [cartItems, dispatch] = React.useContext(CartContext)
  const [wishlistItems, wishlistDispatch] = React.useContext(WishlistContext)
  const [quickView, setQuickView] = React.useState(false)
  const addToCart = (e, product) => {
    e.preventDefault()
    addCartItem(product, "1")
    dispatch({ type: "add", payload: product, quantity: "1" })
  }
  const addToWishlist = (e, product) => {
    e.preventDefault()
    addWishlistItem(product)
    wishlistDispatch({ type: "add", payload: product })
  }
  const params = {
    setQuickView: setQuickView,
    product: product,
    addToCart: addToCart,
    addToWishlist: addToWishlist,
    quickView: quickView,
    masonry: masonry,
  }
  return (
    <React.Fragment>
      {!cardType && <CardProductDefault {...params} />}
      {cardType === 1 && <CardProduct1 {...params} />}
      {cardType === 2 && <CardProduct2 {...params} />}
      {cardType === 3 && <CardProduct3 {...params} />}
      {cardType === 4 && <CardProduct4 {...params} />}
      {cardType === 5 && <CardProduct5 {...params} />}
      {cardType === 6 && <CardProduct6 {...params} />}
      {cardType === 7 && <CardProduct7 {...params} />}
      <ModalQuickView
        isOpen={quickView}
        toggle={() => setQuickView()}
        product={product}
      />
    </React.Fragment>
  )
}

export default CardProduct
