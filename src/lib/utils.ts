import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "@/hooks/use-toast"

// Tailwind CSS classnames
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleFormSubmit = (values: any) => {
  toast({
    title: "Form berhasil dikirim",
    description: "Terima kasih telah menghubungi kami.",
  });
  console.log(values);
};