import axios from "axios"
import Cookies from "universal-cookie"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { ENDPOINTS } from "../../helpers/endpoints"

//initialize cookies
const cookies = new Cookies()

//get access token
const ACCESS_TOKEN = cookies.get("MALT_AC_TOK")
// console.info(ACCESS_TOKEN)

/*{-------------GETTING ALL USERS INFORMATION----------------}*/
//--> call back function to get all users data
const getAllUsers = () => {
  const url =
    process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.allusers + "?deleted=false"
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  }
  return axios.get(url, { headers: headers })
}

//all users hook
export const AllUsersData = (onSuccess, onError) => {
  return useQuery("allUsers", getAllUsers, {
    onSuccess,
    onError,
  })
}

/*{-------------APPROVING A USER/CUSTOMER ACCOUNT----------------}*/
//--> call back function to update a customer
const ApproveCustomer = (__selected_customer) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL +
    ENDPOINTS.approveuser +
    `${__selected_customer?._id}`
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  }
  return axios.patch(url, {}, { headers: headers })
}

export const ApproveCustomerData = (onSuccess, onError) => {
  const queryClient = useQueryClient()
  return useMutation(ApproveCustomer, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allUsers")
    },
    onError,
  })
}

/*{-------------GETTING SPECIFIC USER / CUSTOMER INFORMATION----------------}*/
//--> call back function to get a user's information
const getUser = (userId) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.allusers + `/${userId}`
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  }
  return axios.get(url, { headers: headers })
}

//getting a customer hook
export const UserInformationData = (onSuccess, onError, userId) => {
  return useQuery(["user", userId], () => getUser(userId), {
    onSuccess,
    onError,
  })
}

/*{-------------CREATING A USER----------------}*/
//-----> call back function to create users
const CreateUser = (userdata) => {
  const headers = {
    "Content-Type": "application/json",
  }
  const url = process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.register
  return axios.post(url, userdata, { headers: headers })
}

//sign up hook
export const CreateUserData = (onSuccess, onError) => {
  const queryClient = useQueryClient()
  return useMutation(CreateUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allUsers")
    },
    onError,
  })
}

/*{-------------UPDATING  A USER----------------}*/
//-----> call back function to update user
const UpdateUser = (newuserdata) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  }
  const url =
    process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.allusers + `/${newuserdata?.id}`
  delete newuserdata?.id
  return axios.patch(url, newuserdata, { headers: headers })
}

//update user hook
export const UpdateUserData = (onSuccess, onError) => {
  return useMutation(UpdateUser, {
    onSuccess,
    onError,
  })
}

/*{-------------UPDATING  A USER ROLE----------------}*/
//-----> call back function to update user role
const UpdateRole = (roledata) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  }
  const url =
    process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.changerole + `${roledata?.id}`
  delete roledata?.id
  return axios.patch(url, roledata, { headers: headers })
}

//update role hook
export const UpdateRoleData = (onSuccess, onError) => {
  return useMutation(UpdateRole, {
    onSuccess,
    onError,
  })
}

/*{-------------DELETING A USER----------------}*/
//--> call back function to delete a customer
const deleteCustomer = (__id) => {
  const url = process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.allusers + `/${__id}`
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  }
  return axios.delete(url, { headers: headers })
}

export const DeleteCustomerData = (onSuccess, onError) => {
  const queryClient = useQueryClient()
  return useMutation(deleteCustomer, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("allUsers")
    },
    onError,
  })
}
