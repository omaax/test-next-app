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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"


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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create account</DialogTitle>
          <DialogDescription>
            Fill in your details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Choose a username for your account.
            </p>
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="id" className="text-sm font-medium">
              ID
            </label>
            <Input
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FieldInput