"use client"

import { useEffect, useState } from "react"
import FieldInput from "../form"
import { columns , User } from "./columns"
import { DataTable } from "./data-table"
import PagePagination from "../pagination"

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
  }, [])
  return (
    <div>
      <div className="relative container mx-auto py-10">
        <div className="absolute right-5 top-28 z-10">
          <FieldInput onAddUser={handleAddUser}/>
        </div>
        <DataTable columns={getColumns} data={users} />
      </div>
    </div>
  )
}
