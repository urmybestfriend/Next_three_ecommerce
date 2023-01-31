export const ENDPOINTS = {
  //authentication - authorization
  login: "auth/login",
  register: "auth/register",
  forgotpassword: "auth/forgot-password",
  resetpassword: "auth/reset-password",
  verify: "auth/verify-email",
  changerole: "users/change-role/",
  revokeRefreshToken: "auth/revoke-refresh-token",

  //products managements
  allproducts: "products",

  //user-management
  allusers: "users",
  approveuser: "users/approve/",
  changeuserrole: "users/change-role/",

  //profile management
  loggedinuserprofile: "users/profile/details",
  updateprofile: "users/profile/update",
  profilechangepassword: "users/profile/change-password",

  // examples
  examples : {
    updown: "examples/updown"
  }
}
