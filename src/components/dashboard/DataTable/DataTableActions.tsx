"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Edit3, Trash2 } from 'lucide-react'
import { EditDialog } from "./EditDialog"
import { DeleteDialog } from "./DeleteDialog"

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

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
        <Edit3 className="h-4 w-4" />
      </Button>
      <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)}>
        <Trash2 className="h-4 w-4" />
      </Button>

      <EditDialog 
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        row={row}
        model={model}
        columns={columns}
        onDataChange={onDataChange}
        prevData={prevData}
      />

      <DeleteDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        row={row}
        model={model}
        onDataChange={onDataChange}
        prevData={prevData}
      />
    </>
  )
}