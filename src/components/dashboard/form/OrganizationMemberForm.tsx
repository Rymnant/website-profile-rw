"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OrganizationMember } from "@prisma/client"
import { onSubmitOrganization } from "@/components/dashboard/form/handler/handler"

export function OrganizationMemberForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<OrganizationMember>()

  const onSubmit = async (data: OrganizationMember) => {
    setIsLoading(true)
    await onSubmitOrganization(data, reset, setIsLoading)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
      <Input {...register("name")} placeholder="Name" required />
      <Input {...register("position")} placeholder="Position" required />
      <Input type="file" {...register("image")} placeholder="Image" />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Organization Member"}
      </Button>
    </form>
  )
}

