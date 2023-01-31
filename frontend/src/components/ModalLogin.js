import React from "react"
import { Modal, Nav, Tab, CloseButton } from "react-bootstrap"
import UserLogin from "./auth/Login"
import UserRegistration from "./auth/Signup"
import toast, { Toaster } from "react-hot-toast"
import i18next from "i18next"

const ModalLogin = (props) => {
  function forgotPass() {
    return (
      <Nav.Link href="#" className={`nav-link-sm `} eventKey="forgotpassword">
        Forgot Password
      </Nav.Link>
    )
  }

  //success notification
  const SignUpSuccess = () =>
    toast(
      `  Registration successful. Please check your mail inbox for instructions on verifying your account.
`,
      {
        position: "bottom-right",
        // Custom Icon
        icon: "✅",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      }
    )
  return (
    <>
      <Toaster reverseOrder={false} />
      <Modal show={props.isOpen} onHide={props.toggle}>
        <CloseButton
          className="btn-close-absolute btn-close-lg"
          size="lg"
          onClick={props.toggle}
          type="button"
        />
        <Modal.Body className="p-4">
          <Tab.Container defaultActiveKey="login">
            <Nav className="flex-row">
              <Nav.Link
                href="#"
                className={`nav-link-lg me-4`}
                eventKey="login"
              >
                {i18next.t("login")}
              </Nav.Link>
              <Nav.Link
                href="#"
                className={`nav-link-lg  me-4`}
                eventKey="register"
              >
                {i18next.t("register")}
              </Nav.Link>
            </Nav>
            <hr className="mb-3" />
            <Tab.Content>
              <Tab.Pane className="px-3" eventKey="login">
                <UserLogin closeForm={props.toggle} />
              </Tab.Pane>
              <Tab.Pane className="px-1" eventKey="register">
                <UserRegistration
                  closeForm={props.toggle}
                  SignUpSuccess={SignUpSuccess}
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalLogin
