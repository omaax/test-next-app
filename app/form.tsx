"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { User } from "./payments/columns"
import { useState } from "react"


interface FieldInputProps {
  onAddUser: (user: User) => void;
}

export function FieldInput({ onAddUser }: FieldInputProps) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [id, setId] = useState("")

  const handleSubmit = () => {
    if (!username || !email) return 

    const newUser: User = {
      id: id, 
      username: username,
      email: email,
    }

    onAddUser(newUser)
    
    setUsername("")
    setEmail("")
    setId("")
  }
  return (
    <FieldSet className="w-full max-w-xs">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" />
          <FieldDescription>
            Choose a username for your account.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field>
          <FieldLabel htmlFor="id">ID</FieldLabel>
          <Input value={id} onChange={(e) => setId(e.target.value)} />
        </Field>
        <Field orientation="horizontal">
            <Button type="submit" onClick={handleSubmit}>Submit</Button>
          </Field>
      </FieldGroup>
    </FieldSet>
  )
}

export default FieldInput