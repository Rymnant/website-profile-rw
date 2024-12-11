import { toast } from "@/hooks/use-toast"
import { NewsArticle } from "@prisma/client"

export const onSubmitNewsArticle = async (data: NewsArticle, reset: () => void, setIsLoading: (isLoading: boolean) => void, token: string) => {
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
      headers: {
        'Authorization': `Bearer ${token}`
      },
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