import { FaCheckCircle } from "react-icons/fa"
import { GiCancel, GiGears } from "react-icons/gi"
import { BsGearFill } from "react-icons/bs"

import { MdVerified } from "react-icons/md"
import { TbUserCheck } from "react-icons/tb"
import { HiOutlineUserAdd } from "react-icons/hi"
import { MdDelete, MdOutlineRemoveRedEye } from "react-icons/md"
import React, { useState } from "react"
import { AllUsersData } from "../../hooks/requests/usermanagementHook"
import TablePagination from "./Paagination"

//Modal imports
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import ApproveSelectedUser from "./modals/ApproveUser"
import { APILoader } from "../globals/Loaders"
import { Nodata } from "../globals/Nodata"
import DeleteCustomer from "./modals/DeleteCustomer"
import AddCustomer from "./modals/AddCustomer"
import UpdateCustomer from "./modals/UpdateCustomer"
import i18next from "i18next"

export default function UsersTable({ styles }) {
  //component states
  const [showAddition, setShowAddition] = useState(false)
  const [showApprove, setApprove] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  //pagination states
  var itemsPerPage = 10
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + itemsPerPage

  //add user event trigger
  const showAddUser = () => {
    setShowAddition(!showAddition)
  }

  //approve user event trigger
  const showApproveUser = (__customer) => {
    setApprove(!showApprove)
    localStorage.setItem("__malt_customer", JSON.stringify(__customer))
  }

  //update user event trigger
  const showUpdateUser = (__customer) => {
    setShowUpdate(!showUpdate)
    localStorage.setItem("__customer", JSON.stringify(__customer))
  }

  //delete user event trigger
  const showDeleteUser = (__customer) => {
    setShowDelete(!showDelete)
    localStorage.setItem("__malt_customer", JSON.stringify(__customer))
  }

  const PreviewUser = (__customer) => {
    localStorage.setItem("__previewcustomer", JSON.stringify(__customer))
    window.open(`/customer-account?${__customer?._id}`, "_blank")
  }

  //all modal event triggers
  const modalEvents = {
    showAddUser,
    showUpdateUser,
    showDeleteUser,
  }

  const onError = (error) => {
    console.log("error", error)
  }

  const onSuccess = (userdata) => {
    // console.log("sucesss :", userdata);
  }

  //get users request handler
  const {
    data: all_users_data,
    isLoading,
    error,
    isSuccess,
  } = AllUsersData(onSuccess, onError)
  // console.log("userdata", userdata);

  const all_system_users = all_users_data?.data
  // console.log("-->", all_system_users)

  // Pagination
  const currentUsers = all_system_users?.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(all_system_users?.length / itemsPerPage)

  //page numbers click event handler
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % all_system_users?.length
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    )
    setItemOffset(newOffset)
  }

  return (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.topSection}>
          <h5 className="col">{i18next.t("all_users")}</h5>
          <button
            className={styles.addButton}
            type="button"
            onClick={showAddUser}
          >
            <HiOutlineUserAdd size="20" className="" />
            &nbsp; {i18next.t("add_users")}
          </button>
        </div>
        {isLoading ? (
          <APILoader />
        ) : isSuccess &&
          (all_system_users?.length === 0 || all_system_users === []) ? (
          <Nodata />
        ) : isSuccess && all_system_users?.length > 0 ? (
          <>
            <table
              className={`table table-borderless table-hover ${styles.user__mgmt__desktop}`}
            >
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">{i18next.t("country")}</th>
                  <th scope="col">{i18next.t("address")}</th>
                  <th scope="col" className="text-center">
                    {i18next.t("verified")}&nbsp;
                    <MdVerified size="20" className="me-2" />
                  </th>
                  <th scope="col" className="text-center">
                    {i18next.t("approved")} &nbsp;
                    <TbUserCheck size="20" className="me-2" />
                  </th>
                  <th scope="col" className="text-center">
                    {i18next.t("actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers?.map((item, index) => (
                  <tr key={index + 1} href={`/customer-account?${item?._id}`}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {item?.firstName}&nbsp;{item?.lastName}
                    </td>
                    <td>{item?.email}</td>
                    <td>{item?.country}</td>
                    <td>
                      {item?.zip
                        ? `${
                            (
                              item?.zip +
                              "," +
                              item?.city +
                              ", " +
                              item?.country
                            ).length > 20
                              ? (
                                  item?.zip +
                                  ", " +
                                  item?.city +
                                  ", " +
                                  item?.country
                                ).slice(0, 20) + "..."
                              : `${
                                  item?.zip +
                                  ", " +
                                  item?.city +
                                  ", " +
                                  item?.country
                                }`
                          }`
                        : (item?.city + ", " + item?.country).length > 20
                        ? `${
                            (item?.city + ", " + item?.country).slice(0, 20) +
                            "..."
                          }`
                        : `${item?.city + ", " + item?.country}`}
                    </td>
                    <td className="text-center">
                      {item?.isVerified ? (
                        <FaCheckCircle className="success" size="20" />
                      ) : (
                        <FaCheckCircle className="danger" size="20" />
                      )}
                    </td>
                    <td className="text-center">
                      {item?.isApproved ? (
                        <FaCheckCircle className="success" size="20" />
                      ) : (
                        <FaCheckCircle className="danger" size="20" />
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => showApproveUser(item)}
                        className={styles.actionBtn}
                        disabled={
                          item?.isApproved === true ||
                          item?.isVerified === false
                        }
                      >
                        <TbUserCheck size="20" className="m-0 me-0" />
                      </button>
                      &nbsp;&nbsp;
                      <a
                        href="#"
                        onClick={() => PreviewUser(item)}
                        className={styles.actionBtn}
                      >
                        <MdOutlineRemoveRedEye
                          size="20"
                          className="m-0 me-0 text-dark"
                        />
                      </a>
                      &nbsp;&nbsp;
                      <button
                        className={styles.actionBtn}
                        onClick={() => showDeleteUser(item)}
                      >
                        <MdDelete size="20" className="m-0 me-0 text-danger" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/*Mobile 280 - 420 px table */}
            <table
              className={`table table-borderless table-hover ${styles.user__mgmt__mobile}`}
            >
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  {/* <th scope="col">Email</th> */}

                  <th scope="col" className="text-center">
                    <span className={styles.columnHeading}>
                      {" "}
                      {i18next.t("verified")}
                    </span>
                    <MdVerified size="20" />
                  </th>
                  <th scope="col" className="text-center">
                    <span className={styles.columnHeading}>
                      {i18next.t("approved")}
                    </span>{" "}
                    &nbsp;
                    <TbUserCheck size="20" />
                  </th>
                  <th scope="col" className="text-center">
                    <BsGearFill size="20" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers?.map((item, index) => (
                  <tr key={index + 1} href={`/customer-account?${item?._id}`}>
                    <td scope="row">{index + 1}</td>
                    <td>
                      {item?.firstName}&nbsp;{item?.lastName}
                    </td>
                    {/* <td>{item?.email}</td> */}

                    <td className="text-center">
                      {item?.isVerified ? (
                        <FaCheckCircle className="success" size="20" />
                      ) : (
                        <FaCheckCircle className="danger" size="20" />
                      )}
                    </td>
                    <td className="text-center">
                      {item?.isApproved ? (
                        <FaCheckCircle className="success" size="20" />
                      ) : (
                        <FaCheckCircle className="danger" size="20" />
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        className={styles.actionBtn}
                        onClick={() => showDeleteUser(item)}
                      >
                        <MdDelete size="20" className="text-danger" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <Nodata />
        )}
        {isSuccess && all_system_users?.length > 0 ? (
          <div className={styles.tableFooter}>
            <span>
              Showing {currentUsers?.length} out of {all_system_users?.length}{" "}
              items.
            </span>
            <TablePagination
              styles={styles}
              pageCount={pageCount}
              changePage={handlePageClick}
              currentUsers={currentUsers}
            />
            {/* <span className={styles.pageNumberActive}>1</span> */}
          </div>
        ) : null}
        {showApprove && (
          <>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={showApprove}
              // onClose={showApproveUser}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={showApprove}>
                <Box sx={style}>
                  <ApproveSelectedUser
                    styles={styles}
                    closeForm={showApproveUser}
                  />
                </Box>
              </Fade>
            </Modal>
          </>
        )}
        {showDelete && (
          <>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={showDelete}
              // onClose={showDeleteUser}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={showDelete}>
                <Box sx={style}>
                  <DeleteCustomer styles={styles} closeForm={showDeleteUser} />
                </Box>
              </Fade>
            </Modal>
          </>
        )}
        {showAddition && (
          <>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={showAddition}
              // onClose={showAddUser}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={showAddition}>
                <Box sx={style}>
                  <AddCustomer styles={styles} closeForm={showAddUser} />
                </Box>
              </Fade>
            </Modal>
          </>
        )}
        {showUpdate && (
          <>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={showUpdate}
              // onClose={showUpdateUser}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={showUpdate}>
                <Box sx={style}>
                  <UpdateCustomer styles={styles} closeForm={showUpdateUser} />
                </Box>
              </Fade>
            </Modal>
          </>
        )}
      </div>
    </>
  )
}

//Modal styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "none",
  p: 4,
}
