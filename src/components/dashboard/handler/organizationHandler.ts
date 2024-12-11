
import { toast } from "@/hooks/use-toast"
import { OrganizationMember } from "@prisma/client"

export async function onSubmitOrganization(
  data: OrganizationMember,
  reset: () => void,
  setIsLoading: (isLoading: boolean) => void
) {
  const formData = new FormData()
  formData.append("name", data.name)
  formData.append("position", data.position)
  if (data.image && data.image[0]) {
    formData.append("image", data.image[0])
  }

  try {
    const response = await fetch("/api/organization", {
      method: "POST",
      body: formData,
    })
    if (response.ok) {
      toast({ title: "Organization member created successfully" })
      reset()
    } else {
      throw new Error("Failed to create organization member")
    }
  } catch (error) {
    toast({ title: "Error", description: (error as Error).message, variant: "destructive" })
  } finally {
    setIsLoading(false)
  }
}