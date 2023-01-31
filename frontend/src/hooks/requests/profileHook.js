import axios from "axios"

import Cookies from "universal-cookie"
import { useMutation, useQuery } from "react-query"
import { ENDPOINTS } from "../../helpers/endpoints"

//initialize cookies
const cookies = new Cookies()

//get access token
const ACCESS_TOKEN = cookies.get("MALT_AC_TOK")
// console.info(ACCESS_TOKEN)

/*{-------------GETTING LOGGED IN USER INFORMATION----------------}*/
//--> call back function to get  users data
const getUser = () => {
  const url = process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.loggedinuserprofile
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  }
  return axios.get(url, { headers: headers })
}

//all users hook
export const LoggedInUser = (onSuccess, onError) => {
  return useQuery("loggedIn", getUser, {
    onSuccess,
    onError,
  })
}

/*{-------------UPDATING  A USER's PASSWORD----------------}*/
//-----> call back function to update user password
const UpdatePassword = (passwordupdate) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  }
  const url = process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.profilechangepassword
  return axios.patch(url, passwordupdate, { headers: headers })
}

//update password hook
export const UpdatePasswordData = (onSuccess, onError) => {
  return useMutation(UpdatePassword, {
    onSuccess,
    onError,
  })
}
