
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Admin } from "@prisma/client"
import { onSubmitAdmin } from "@/components/dashboard/form/handler/handler"

export function AdminForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<Admin>()

  const onSubmit = async (data: Admin) => {
    setIsLoading(true)
    await onSubmitAdmin(data, reset, setIsLoading)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
      <Input {...register("name")} placeholder="Name" required />
      <Input {...register("email")} placeholder="Email" required />
      <Input {...register("password")} type="password" placeholder="Password" required />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Admin"}
      </Button>
    </form>
  )
}