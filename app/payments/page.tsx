"use client"

import { useEffect, useState } from "react"
import FieldInput from "../form"
import { columns , User } from "./columns"
import { DataTable } from "./data-table"

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])

  const handleAddUser = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev])
  }
  
  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  const handleEditUser = (updatedUser: User) => {
    setUsers((prev) => 
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    )
  }

  const getColumns = columns(handleDeleteUser, handleEditUser)
  
  useEffect(()=> {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then((users: any[]) => {
        const mappedUsers: User[] = users.map((user) => ({
          id: user.id,
          username: user.username,
          email:user.email
        }))
        setUsers(mappedUsers)
      })
  })
  return (
    <div>
      <div className="flex items-center justify-center m-4">
        <FieldInput onAddUser={handleAddUser}/>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={getColumns} data={users} />
      </div>
    </div>
  )
}
