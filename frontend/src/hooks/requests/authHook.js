import axios from "axios"
import { useMutation } from "react-query"
import { ENDPOINTS } from "../../helpers/endpoints"

/*{-------------LOGIN IN USER----------------}*/
//----> call back function to login user
const LoginUser = (logindata) => {
  const headers = {
    "Content-Type": "application/json",
  }
  const url = process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.login
  return axios.post(url, logindata, { headers: headers })
}

//login hook
export const SendLoginCredentials = (onSuccess, onError) => {
  return useMutation(LoginUser, {
    onSuccess,
    onError,
  })
}

/*{-------------REGISTERING A USER----------------}*/
//-----> call back function to register users
const SignupUser = (registrationdata) => {
  const headers = {
    "Content-Type": "application/json",
  }
  const url = process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.register
  return axios.post(url, registrationdata, { headers: headers })
}

//sign up hook
export const SignupUserData = (onSuccess, onError) => {
  return useMutation(SignupUser, {
    onSuccess,
    onError,
  })
}

/*{-------------Revoke refresh token // logging out----------------}*/
//----> call back function to logout user
const LogoutUser = (userid) => {
  const headers = {
    "Content-Type": "application/json",
  }
  const url = process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.revokeRefreshToken
  return axios.post(url, userid, { headers: headers })
}

//login hook
export const SendLogoutRequest = (onSuccess, onError) => {
  return useMutation(LogoutUser, {
    onSuccess,
    onError,
  })
}

/*{-------------FORGOT PASSWORD----------------}*/
//-----> call back function to reset password users
const ForgotPassword = (forgotpasswordata) => {
  const headers = {
    "Content-Type": "application/json",
  }
  const url = process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.forgotpassword
  return axios.post(url, forgotpasswordata, { headers: headers })
}

//forgot password hook
export const ForgotPasswordDataSubmit = (onSuccess, onError) => {
  return useMutation(ForgotPassword, {
    onSuccess,
    onError,
  })
}

/*{-------------RESET PASSWORD----------------}*/
//-----> call back function to reset  user password
const ChangePassword = (resetPassWordData) => {
  const headers = {
    "Content-Type": "application/json",
  }
  const url = process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.resetpassword
  return axios.patch(url, resetPassWordData, { headers: headers })
}

//password reset hook
export const ChangePasswordDataSubmit = (onSuccess, onError) => {
  return useMutation(ChangePassword, {
    onSuccess,
    onError,
  })
}

/*{-------------VERIFY USER ACCOUNT----------------}*/
//-----> call back function to verify user
const VerifyAccount = (Token) => {
  const headers = {
    "Content-Type": "application/json",
  }
  const url = process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.verify + `?${Token}`
  return axios.get(url, { headers: headers })
}

//account verification hook
export const VerifyUserAccountSubmit = (onSuccess, onError) => {
  return useMutation(VerifyAccount, {
    onSuccess,
    onError,
  })
}
