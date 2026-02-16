"use client"

import { useEffect, useState } from "react"
import FieldInput from "../form"
import { columns } from "./columns"
import { DataTable } from "./data-table"

interface User {
  id: string
  username: string
  email: string
}

export default function DemoPage() {
  const [data, setData] = useState<User[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
        const users = await res.json()

        const mappedUsers: User[] = users.map((user: any) => ({
          id: user.id.toString(),
          username: user.username,
          email: user.email,
        }))

        setData(mappedUsers)
      } catch (error: any) {
        console.error("Error fetching data:", error.message)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-center m-4">
        <FieldInput />    
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
