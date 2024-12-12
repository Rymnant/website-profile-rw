"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Admin } from "@prisma/client"
import { onSubmitAdmin } from "@/components/dashboard/form/handler/handler"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function AdminForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<Admin>()

  const onSubmit = async (data: Admin) => {
    setIsLoading(true)
    await onSubmitAdmin(data, reset, setIsLoading)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Admin</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} placeholder="Name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} type="email" placeholder="Email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" {...register("password")} type="password" placeholder="Password" required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Admin"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

