import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "@/hooks/use-toast"
import type { FormValues } from "@/lib/types"

/*eslint-disable*/

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

// Handle form submission
export const handleFormSubmit = (values: FormValues) => {
  toast({
    title: "Form berhasil dikirim",
    description: "Terima kasih telah menghubungi kami.",
  });
  console.log(values);
};