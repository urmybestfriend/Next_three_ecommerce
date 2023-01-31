// ----------{Reg ex validation for password fields}------------///
// Passwords must contain at least one capital letter, one lower, a number and a symbol.
export var passwordValidate = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
)
