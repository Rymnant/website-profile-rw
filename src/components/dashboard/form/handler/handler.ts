import { toast } from "@/hooks/use-toast"
import { Admin, NewsArticle, OrganizationMember, UMKM, Gallery } from "@prisma/client"

/*eslint-disable*/

// Error handling
function handleError(error: any, action: string) {
  console.error(`An error occurred during ${action}:`, error);
}

// Fetch data
export async function fetchData(model: string) {
  try {
    const response = await fetch(`/api/${model.toLowerCase()}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Failed to fetch ${model} data`);
    }
  } catch (error) {
    handleError(error, `fetch ${model} data`);
  }
}

// Update admin data
export async function updateAdminData(id: string, data: Admin) {
  try {
    const response = await fetch(`/api/admin/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to update data' }));
      console.error(`Failed to update admin data. Status: ${response.status}, Body: ${JSON.stringify(errorData)}`);
      throw new Error(errorData.error || `Failed to update admin data`);
    }

    return await response.json();
  } catch (error) {
    handleError(error, `update admin data`);
  }
}

// Delete admin data
export async function deleteAdminData(id: string) {
  try {
    const response = await fetch(`/api/admin/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to delete data' }));
      console.error(`Failed to delete admin data. Status: ${response.status}, Body: ${JSON.stringify(errorData)}`);
      throw new Error(errorData.error || `Failed to delete admin data`);
    }

    return await response.json();
  } catch (error) {
    handleError(error, `delete admin data`);
  }
}

// Delete gallery data
export async function deleteGalleryData(id: string) {
  try {
    const response = await fetch(`/api/gallery/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to delete data' }));
      throw new Error(errorData.error || `Failed to delete gallery data`);
    }

    const data = await response.json();
    console.log(`Delete response data: ${JSON.stringify(data)}`);
  } catch (error) {
    handleError(error, `delete gallery data`);
  }
}

async function uploadImageToServer(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  return data.url;
}

async function deleteImageFromServer(publicId: string, folder: string): Promise<void> {
  const response = await fetch('/api/upload', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ publicId, folder }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete image');
  }
}

// Generic function to handle image updates
async function handleImageUpdate(id: string, formData: FormData, model: string, folder: string) {
  try {
    const response = await fetch(`/api/${model}/${id}`);
    const item = await response.json();

    let fileUrl = item.image;
    const image = formData.get("image") as File | null;

    if (image && image instanceof File) {
      if (item.image) {
        const publicId = item.image.split('/').pop()?.split('.')[0];
        if (publicId) {
          await deleteImageFromServer(publicId, folder);
        }
      }
      fileUrl = await uploadImageToServer(image, folder);
    }

    formData.set("image", fileUrl);

    const updateResponse = await fetch(`/api/${model}/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json().catch(() => ({ error: 'Failed to update data' }));
      console.error(`Failed to update ${model} data. Status: ${updateResponse.status}, Body: ${JSON.stringify(errorData)}`);
      throw new Error(errorData.error || `Failed to update ${model} data`);
    }

    return await updateResponse.json();
  } catch (error) {
    handleError(error, `update ${model} data`);
  }
}

// Edit gallery data
export async function updateGalleryData(id: string, formData: FormData) {
  return handleImageUpdate(id, formData, 'gallery', 'gallery');
}

// Update news article data
export async function updateNewsArticleData(id: string, formData: FormData) {
  return handleImageUpdate(id, formData, 'news', 'news');
}

// Update organization member data
export async function updateOrganizationMemberData(id: string, formData: FormData) {
  return handleImageUpdate(id, formData, 'organization', 'organization');
}

// Update UMKM data
export async function updateUMKMData(id: string, formData: FormData) {
  return handleImageUpdate(id, formData, 'umkm', 'umkm');
}

// Delete news article data
export async function deleteNewsArticleData(id: string) {
  try {
    const response = await fetch(`/api/news/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to delete news article data. Status: ${response.status}, Body: ${JSON.stringify(errorData)}`);
      throw new Error(errorData.error || `Failed to delete news article data`);
    }

    return await response.json();
  } catch (error) {
    handleError(error, `delete news article data`);
  }
}

// Delete organization member data
export async function deleteOrganizationMemberData(id: string) {
  try {
    const response = await fetch(`/api/organization/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to delete organization member data. Status: ${response.status}, Body: ${JSON.stringify(errorData)}`);
      throw new Error(errorData.error || `Failed to delete organization member data`);
    }

    return await response.json();
  } catch (error) {
    handleError(error, `delete organization member data`);
  }
}

// Delete UMKM data
export async function deleteUMKMData(id: string) {
  try {
    const response = await fetch(`/api/umkm/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to delete UMKM data. Status: ${response.status}, Body: ${JSON.stringify(errorData)}`);
      throw new Error(errorData.error || `Failed to delete UMKM data`);
    }

    return await response.json();
  } catch (error) {
    handleError(error, `delete UMKM data`);
  }
}

// Update UMKM item data
export async function updateUMKMItemData(id: string, data: UMKM) {
  try {
    const response = await fetch(`/api/umkmitem/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to update UMKM item data. Status: ${response.status}, Body: ${JSON.stringify(errorData)}`);
      throw new Error(errorData.error || `Failed to update UMKM item data`);
    }

    return await response.json();
  } catch (error) {
    handleError(error, `update UMKM item data`);
  }
}

// Delete UMKM item data
export async function deleteUMKMItemData(id: string) {
  try {
    const response = await fetch(`/api/umkmitem/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to delete UMKM item data. Status: ${response.status}, Body: ${JSON.stringify(errorData)}`);
      throw new Error(errorData.error || `Failed to delete UMKM item data`);
    }

    return await response.json();
  } catch (error) {
    handleError(error, `delete UMKM item data`);
  }
}

// Generic function to submit form data
async function submitFormData(url: string, method: string, formData: FormData | string, reset: () => void, setIsLoading: (isLoading: boolean) => void, contentType: string = "application/json") {
  try {
    const response = await fetch(url, {
      method,
      headers: contentType === "application/json" ? { "Content-Type": contentType } : undefined,
      body: formData,
    });
    if (response.ok) {
      toast({ title: `${url.split('/').pop()} created successfully` });
      reset();
    } else {
      throw new Error(`Failed to create ${url.split('/').pop()}`);
    }
  } catch (error) {
    toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
  } finally {
    setIsLoading(false);
  }
}

export const onSubmitNewsArticle = async (data: NewsArticle, reset: () => void, setIsLoading: (isLoading: boolean) => void) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("date", new Date(data.date).toISOString());
  if (data.image && data.image[0]) {
    formData.append("image", data.image[0]);
  }
  await submitFormData("/api/news", "POST", formData, reset, setIsLoading, "multipart/form-data");
}

export async function onSubmitOrganization(data: OrganizationMember, reset: () => void, setIsLoading: (isLoading: boolean) => void) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("position", data.position);
  if (data.image && data.image[0]) {
    formData.append("image", data.image[0]);
  }
  await submitFormData("/api/organization", "POST", formData, reset, setIsLoading, "multipart/form-data");
}

export const onSubmitUMKM = async (data: UMKM, reset: () => void, setIsLoading: (isLoading: boolean) => void) => {
  await submitFormData("/api/umkm", "POST", JSON.stringify(data), reset, setIsLoading);
}

export const fetchUMKMItems = async () => {
  try {
    const response = await fetch("/api/umkmitem");
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch UMKM Items");
    }
  } catch (error) {
    console.error("Failed to fetch UMKM Items", error);
    return [];
  }
}

export const onSubmitAdmin = async (data: Admin, reset: () => void, setIsLoading: (isLoading: boolean) => void) => {
  await submitFormData("/api/admin", "POST", JSON.stringify(data), reset, setIsLoading);
}

export const onSubmitGallery = async (data: Gallery, reset: () => void, setIsLoading: (isLoading: boolean) => void) => {
  const formData = new FormData();
  formData.append("title", data.title);
  if (data.image && data.image[0]) {
    formData.append("image", data.image[0]);
  }
  await submitFormData("/api/gallery", "POST", formData, reset, setIsLoading, "multipart/form-data");
}