"use client"

import { useState } from "react"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Loader2 } from 'lucide-react'
import { deleteGalleryData, deleteNewsArticleData, deleteOrganizationMemberData, deleteUMKMData } from "@/components/dashboard/form/handler/handler"

/*eslint-disable*/
type DeleteDialogWithImageProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  row: any;
  model: string;
  onDataChange: (newData: any[]) => void;
  prevData: any[];
}

const deleteMethods: { [key: string]: Function } = {
  gallery: deleteGalleryData,
  news: deleteNewsArticleData,
  organization: deleteOrganizationMemberData,
  umkm: deleteUMKMData,
};

export function DeleteDialogWithImage({ isOpen, onOpenChange, row, model, onDataChange, prevData }: DeleteDialogWithImageProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const deleteMethod = deleteMethods[model.toLowerCase()];
      if (deleteMethod) {
        await deleteMethod(row.id);
        const updatedData = prevData?.filter(item => item.id !== row.id);
        onDataChange(updatedData)
        onOpenChange(false);
        onDataChange(updatedData); // Refresh table content
      }
    } catch (error) {
      console.error("Error in handleDelete:", error);
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the {model} data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
