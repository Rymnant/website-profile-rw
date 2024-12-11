import { toast } from "@/hooks/use-toast"
import { Admin, NewsArticle, OrganizationMember, UMKM, Gallery } from "@prisma/client"

export const onSubmitNewsArticle = async (data: NewsArticle, reset: () => void, setIsLoading: (isLoading: boolean) => void) => {
  const formData = new FormData()
  formData.append("title", data.title)
  formData.append("description", data.description)
  formData.append("date", new Date(data.date).toISOString())
  if (data.image && data.image[0]) {
    formData.append("image", data.image[0])
  }

  try {
    const response = await fetch("/api/news", {
      method: "POST",
      body: formData,
    })
    if (response.ok) {
      toast({ title: "News article created successfully" })
      reset()
    } else {
      throw new Error("Failed to create news article")
    }
  } catch (error) {
    toast({ title: "Error", description: (error as Error).message, variant: "destructive" })
  } finally {
    setIsLoading(false)
  }
}

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

  export const onSubmitUMKM = async (data: UMKM, reset: () => void, setIsLoading: (isLoading: boolean) => void) => {
    try {
      const response = await fetch("/api/umkm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        toast({ title: "UMKM created successfully" })
        reset()
      } else {
        throw new Error("Failed to create UMKM")
      }
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }
  
  export const fetchUMKMItems = async () => {
    try {
      const response = await fetch("/api/umkmitem")
      if (response.ok) {
        return await response.json()
      } else {
        throw new Error("Failed to fetch UMKM Items")
      }
    } catch (error) {
      console.error("Failed to fetch UMKM Items", error)
      return []
    }
  }

export const onSubmitAdmin = async (data: Admin, reset: () => void, setIsLoading: (isLoading: boolean) => void) => {
  try {
    const response = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      toast({ title: "Admin created successfully" })
      reset()
    } else {
      throw new Error("Failed to create admin")
    }
  } catch (error) {
    toast({ title: "Error", description: (error as Error).message, variant: "destructive" })
  } finally {
    setIsLoading(false)
  }
}

export const onSubmitGallery = async (data: Gallery, reset: () => void, setIsLoading: (isLoading: boolean) => void) => {
  const formData = new FormData()
  formData.append("title", data.title)
  if (data.image && data.image[0]) {
    formData.append("image", data.image[0])
  }

  try {
    const response = await fetch("/api/gallery", {
      method: "POST",
      body: formData,
    })
    if (response.ok) {
      toast({ title: "Gallery item created successfully" })
      reset()
    } else {
      throw new Error("Failed to create gallery item")
    }
  } catch (error) {
    toast({ title: "Error", description: (error as Error).message, variant: "destructive" })
  } finally {
    setIsLoading(false)
  }
}