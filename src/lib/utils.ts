import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "@/hooks/use-toast"
import type { FormValues } from "@/lib/types"

// Tailwind CSS classnames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.2, ease: "easeInOut" }
};

export const staggerChildren = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

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
    console.error(error);
    throw error;
  }
}

// Delete data
export async function deleteData(model: string, id: string) {
  try {
    const response = await fetch(`/api/${model.toLowerCase()}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error(`Failed to delete ${model} data`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Edit data
export async function editData(model: string, id: string, formData: FormData) {
  try {
    const response = await fetch(`/api/${model.toLowerCase()}/${id}`, {
      method: 'PUT',
      body: formData,
    });
    
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Failed to edit ${model} data`);
      }
      return data;
    } else {
      throw new Error(`Unexpected response type: ${contentType}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Handle form submission
export const handleFormSubmit = (values: FormValues) => {
  toast({
    title: "Form berhasil dikirim",
    description: "Terima kasih telah menghubungi kami.",
  });
  console.log(values);
};