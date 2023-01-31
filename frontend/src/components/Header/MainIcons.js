import React from "react"
import { CartContext } from "../CartContext"

import SidebarCart from "../SidebarCart"
import ModalLogin from "../ModalLogin"
import SidebarRight from "../SidebarRight"

import Icon from "../Icon"
import toast, { Toaster } from "react-hot-toast"

import { WishlistContext } from "../WishlistContext"
import { MdOutlineLogout } from "react-icons/md"
import { GrUserSettings } from "react-icons/gr"
import { LoggedInUser } from "../../hooks/requests/profileHook"
import Cookies from "universal-cookie"
import { useRouter } from "next/router"
import { SendLogoutRequest } from "../../hooks/requests/authHook"
import { FaUser } from "react-icons/fa"
import { BiShoppingBag } from "react-icons/bi"
const MainIcons = (props) => {
  //initialize next router
  const router = useRouter()

  //initialize cookie
  const cookies = new Cookies()

  //modal states and toggle functions
  const [modal, setModal] = React.useState({})
  const toggleModal = (name) => {
    setModal({ ...modal, [name]: !modal[name] })
  }
  const preventAnchor = (e, func) => {
    e.preventDefault()
    func()
  }

  //logout progress notification
  const SessionTimeOutNotification = () =>
    toast(
      `It seems your session timed out or are disconnected from the server. Please login or check your connection to continue`,
      {
        duration: 7000,
        position: "top-center",
        // Custom Icon
        icon: "🔐",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      }
    )

  //---Get logged in user profile for RBAC---//
  const onError = (error) => {
    cookies.remove("MALT_LOG_USR")
    cookies.remove("REM_MALT_AC_USER")
    cookies.remove("MALT_AC_TOK")
    cookies.remove("MALT_AC_REF")
  }

  const onSuccess = (data) => {
    cookies.set("MALT_LOG_USR", data?.data)
    // console.log("MALT_LOG_USR", data?.data)
  }

  //get user profile
  const { data: user_data } = LoggedInUser(onSuccess, onError)
  const logged_in_user = user_data?.data

  //Logged in user data
  var LOGGED_IN_USER
  LOGGED_IN_USER = cookies.get("MALT_LOG_USR")

  var USR_HAS_ACCESS = cookies.get("MALT_AC_TOK")

  //logout progress notification
  const LogoutProgress = () =>
    toast(`Please wait while we log you out`, {
      position: "top-center",
      // Custom Icon
      icon: "⌛",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
    })

  //logout progress notification
  const LogoutSuccess = () =>
    toast(`Logout successful.`, {
      position: "top-center",
      // Custom Icon
      icon: "✅",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
    })

  //logout progress notification
  const LogoutError = () =>
    toast(`An error occured while logging you out, please try again later`, {
      position: "top-center",
      // Custom Icon
      icon: "❌",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },
    })

  //---Logout currently logged in user---//
  //logout token data to submit
  const logoutData = {
    userId: LOGGED_IN_USER?._id,
  }

  //logout event
  const handleLogout = (e) => {
    e.preventDefault()
    LogoutProgress()
    if (logoutData?.userId !== null) {
      logoutUserFromAllDevices(logoutData)
    } else {
      return null
    }
  }

  //on successful token revoke
  const LogoutonSuccess = (data) => {
    if (data?.status === 200) {
      LogoutSuccess()
      cookies.remove("MALT_LOG_USR")
      cookies.remove("REM_MALT_AC_USER")
      cookies.remove("MALT_AC_TOK")
      cookies.remove("MALT_AC_REF")
      router.push("/")
    }
  }

  //on error while, before and after token revoke
  const LogoutonError = (error) => {
    LogoutError()
    console.log("error", error)
  }

  //API request handler
  const {
    mutate: logoutUserFromAllDevices,
    error,
    isSuccess,
    isError,
    isLoading,
  } = SendLogoutRequest(LogoutonSuccess, LogoutonError)

  const [cartContext] = React.useContext(CartContext)
  const [wishlistContext] = React.useContext(WishlistContext)
  return (
    <React.Fragment>
      <>
        {" "}
        <Toaster reverseOrder={false} />
        <ul className={`list-inline mb-0 ${props.className}`}>
          {/* Hide / show login & registration modal button on user session active */}
          {USR_HAS_ACCESS === undefined ? (
            <li className="list-inline-item me-3">
              <a
                className={`text-${
                  props.light ? "light" : "dark"
                } text-hover-primary`}
                href="#"
                aria-label="open login modal"
                onClick={(e) => preventAnchor(e, () => toggleModal("login"))}
              >
                {/* <span>Login to continue... </span>&nbsp; */}
                <FaUser className="navbar-icon mb-1" size="25" />
              </a>
            </li>
          ) : null}
          {/* Hide / show basket based on logged in user role */}
          {USR_HAS_ACCESS !== undefined && LOGGED_IN_USER?.role === "user" ? (
            <li className="list-inline-item position-relative me-3">
              <a
                className={`text-${
                  props.light ? "light" : "dark"
                } text-hover-primary`}
                href="#"
                aria-label="show cart"
                onClick={(e) =>
                  preventAnchor(e, () => toggleModal("sidebarCart"))
                }
                disabled={isLoading}
              >
                <BiShoppingBag className="navbar-icon mb-1" size="25" />
                <div className="navbar-icon-badge">{cartContext.length}</div>
              </a>
            </li>
          ) : null}
          &nbsp;&nbsp;
          {/* Hide / show user-management navigation if user logged has role === admin */}
          {USR_HAS_ACCESS !== undefined && LOGGED_IN_USER?.role === "admin" ? (
            <li className="list-inline-item me-3">
              <a
                title="User management console"
                className={`text-${
                  props.light ? "light" : "dark"
                } text-hover-primary`}
                href="/user-management"
                aria-label="open login modal"
                disabled={isLoading}
              >
                <GrUserSettings className="navbar-icon mb-1" size="25" />
              </a>
            </li>
          ) : null}
          {USR_HAS_ACCESS !== undefined ? (
            <li className="list-inline-item me-3">
              <a
                title="log out"
                className={`text-${
                  props.light ? "light" : "dark"
                } text-hover-primary border-none outline-none bg-none`}
                href="#"
                aria-label="open login modal"
                onClick={handleLogout}
                disabled={isLoading}
              >
                <MdOutlineLogout className="navbar-icon mb-1" size="25" />
              </a>
            </li>
          ) : null}
          {/* &nbsp; &nbsp; &nbsp; &nbsp; */}
          {/* <li className="list-inline-item me-3 m-0">
            <Link href="/user-management">
              <a
                className={`text-${
                  props.light ? "light" : "dark"
                } text-hover-primary position-relative m-0`}
                aria-label="go to whishlist"
              >
                <VscSettingsGear className="navbar-icon" size="25" />
              </a>
            </Link>
          </li> */}
          {/* {props.sidebarRight && (
          <li className="list-inline-item">
            <a
              className={`text-${
                props.light ? "light" : "dark"
              } text-hover-primary`}
              href="#"
              onClick={(e) =>
                preventAnchor(e, () => toggleModal("sidebarRight"))
              }
              aria-label="open right sidebar"
            >
              <Icon className="navbar-icon" icon="menu-hamburger-1" />
            </a>
          </li>
        )} */}
        </ul>
      </>
      <ModalLogin toggle={() => toggleModal("login")} isOpen={modal.login} />
      <SidebarCart
        toggle={() => toggleModal("sidebarCart")}
        isOpen={modal.sidebarCart}
      />
      <SidebarRight
        toggle={() => toggleModal("sidebarRight")}
        isOpen={modal.sidebarRight}
      />
    </React.Fragment>
  )
}

export default MainIcons
