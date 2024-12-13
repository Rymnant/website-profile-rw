"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Edit3, Trash2 } from 'lucide-react'
import { EditDialogWithImage } from "./EditDialogWithImage"
import { EditDialogWithoutImage } from "./EditDialogWithoutImage"
import { DeleteDialogWithImage } from "./DeleteDialogWithImage"
import { DeleteDialogWithoutImage } from "./DeleteDialogWithoutImage"

/*eslint-disable*/
type DataTableActionsProps = {
  row: any;
  model: string;
  columns: string[];
  onDataChange: (newData: any[]) => void;
  prevData: any[];
}

export function DataTableActions({ row, model, columns, onDataChange, prevData }: DataTableActionsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const hasImageField = ['gallery', 'news', 'organization', 'umkm'].includes(model.toLowerCase());

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
        <Edit3 className="h-4 w-4" />
      </Button>
      <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
        <Trash2 className="h-4 w-4" />
      </Button>

      {hasImageField ? (
        <>
          <EditDialogWithImage 
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            row={row}
            model={model}
            columns={columns}
            onDataChange={onDataChange}
            prevData={prevData}
          />
          <DeleteDialogWithImage 
            isOpen={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            row={row}
            model={model}
            onDataChange={onDataChange}
            prevData={prevData}
          />
        </>
      ) : (
        <>
          <EditDialogWithoutImage 
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            row={row}
            model={model}
            columns={columns}
            onDataChange={onDataChange}
            prevData={prevData}
          />
          <DeleteDialogWithoutImage 
            isOpen={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            row={row}
            model={model}
            onDataChange={onDataChange}
            prevData={prevData}
          />
        </>
      )}
    </>
  )
}