import React from "react"
import UsersTable from "./UsersTable"
import styles from "../../../styles/Usermanagement.module.css"
export default function AllSystemUsers() {
  return (
    <div className={styles.usermanagemenlayout}>
      <UsersTable styles={styles} />
    </div>
  )
}
