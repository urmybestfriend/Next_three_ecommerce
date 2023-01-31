import axios from "axios"
import Cookies from "universal-cookie"
import { useMutation, useQuery } from "react-query"
import { ENDPOINTS } from "../../helpers/endpoints"

//initialize cookies
const cookies = new Cookies()

//get access token
const ACCESS_TOKEN = cookies.get("MALT_AC_TOK")
console.info(ACCESS_TOKEN)

/*{-------------GETTING ALL PRODUCTS INFORMATION----------------}*/
//--> call back function to get all products data
const getAllProducts = () => {
  const url = process.env.NEXT_PUBLIC_API_URL + ENDPOINTS.allproducts
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  }
  return axios.get(url, { headers: headers })
}

//all products hook
export const AllProductsData = (onSuccess, onError) => {
  return useQuery("allCustomers", getAllProducts, {
    onSuccess,
    onError,
  })
}
