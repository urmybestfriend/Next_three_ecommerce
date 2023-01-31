import React from "react"
import ReactPaginate from "react-paginate"
import { FaCaretLeft, FaCaretRight } from "react-icons/fa"

export default function TablePagination({ styles, pageCount, changePage }) {
  return (
    <ReactPaginate
      previousLabel={<FaCaretLeft size="30" className="" />}
      nextLabel={<FaCaretRight size="30" className="" />}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={(event) => changePage(event)}
      containerClassName={"pagination pagination__section"}
      subContainerClassName={"pages pagination"}
      activeClassName={`page_number ${styles.pageNumberActive}`}
      disabledClassName={"page_number inactive_page_number"}
    />
  )
}
