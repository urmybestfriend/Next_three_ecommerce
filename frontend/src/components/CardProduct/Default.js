import React from "react"
import Link from "next/link"

import { Badge } from "react-bootstrap"

import Stars from "../Stars"
import Icon from "../Icon"

import Image from "../Image"

const CardProductDefault = ({
  product,
  masonry,
  addToCart,
  addToWishlist,
  setQuickView,
}) => {
  return (
    <div
      className={`product product-type-0`}
      data-aos="zoom-in"
      data-aos-delay="0"
    >
      <div className="product-image mb-md-3">
        {product.new && (
          <Badge bg="secondary" className="product-badge">
            Fresh
          </Badge>
        )}
        {product.sale && (
          <Badge bg="primary" className="product-badge">
            Sale
          </Badge>
        )}
        {product.soldout && (
          <Badge bg="dark" className="product-badge">
            Sold out
          </Badge>
        )}
        <Link
          href={
            product.category
              ? `/${product.category[1]}/${product.slug}`
              : product.link
          }
        >
          <a>
            {masonry ? (
              <span className="masonry-image">
                <Image
                  src={product.img.masonry.img}
                  alt={product.img.masonry.alt}
                  layout="fill"
                  sizes="(max-width: 992px) 50vw, (max-width: 1049px) 33vw, 300px"
                />
              </span>
            ) : product.img.category.length > 1 ? (
              <div className="product-swap-image">
                <Image
                  className="img-fluid product-swap-image-front"
                  src={product.img.category[0].img}
                  alt={product.img.category[0].alt}
                  layout="responsive"
                  width={408}
                  height={523}
                />
                <span className="position-absolute overflow-hidden top-0 start-0 end-0 bottom-0">
                  <Image
                    className="img-fluid"
                    src={product.img.category[1].img}
                    alt={product.img.category[1].alt}
                    layout="responsive"
                    width={408}
                    height={523}
                  />
                </span>
              </div>
            ) : (
              <Image
                className="img-fluid"
                src={product.img.category[0].img}
                alt={product.img.category[0].alt}
                layout="responsive"
                width={408}
                height={523}
              />
            )}
          </a>
        </Link>
        <div className="product-hover-overlay">
          <a
            className="text-dark text-sm"
            aria-label="add to cart"
            href="#"
            onClick={(e) => addToCart(e, product)}
          >
            <Icon
              className="text-hover-primary svg-icon-heavy d-sm-none"
              icon="retail-bag-1"
            />
            <span className="d-none d-sm-inline">Add to cart</span>
          </a>
          <div>
            <a
              className="text-dark text-hover-primary me-2"
              href="#"
              onClick={(e) => addToWishlist(e, product)}
              aria-label="add to wishlist"
            >
              <Icon className="svg-icon-heavy" icon="heart-1" />
            </a>
            <a
              className="text-dark text-hover-primary text-decoration-none"
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setQuickView(!quickView)
              }}
              aria-label="open quickview"
            >
              <Icon className="svg-icon-heavy" icon="expand-1" />
            </a>
          </div>
        </div>
      </div>
      <div className="position-relative">
        <h3 className="text-base mb-1">
          <Link
            href={
              product.category
                ? `/${product.category[1]}/${product.slug}`
                : product.link
            }
          >
            <a className="text-dark">{product.name}</a>
          </Link>
        </h3>
        <span className="text-gray-500 text-sm">${product.price}.00</span>
        <Stars stars={product.stars} className="product-stars text-xs" />
      </div>
    </div>
  )
}

export default CardProductDefault
