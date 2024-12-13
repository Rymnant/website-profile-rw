"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { updateAdminData, updateUMKMItemData } from "@/components/dashboard/form/handler/handler"

/*eslint-disable*/
type EditDialogWithoutImageProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  row: any;
  model: string;
  columns: string[];
  onDataChange: (newData: any[]) => void;
  prevData: any[];
}

const updateMethods: { [key: string]: Function } = {
  admin: updateAdminData,
  umkmitem: updateUMKMItemData,
};

export function EditDialogWithoutImage({ isOpen, onOpenChange, row = {}, model, columns, onDataChange, prevData }: EditDialogWithoutImageProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(true);
    try {
      const formData = new FormData(e.currentTarget);
      const data: any = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      const updateMethod = updateMethods[model.toLowerCase()];
      if (updateMethod && row.id) {
        const result = await updateMethod(row.id, data);
        if (prevData) {
          const updatedData = prevData.map((item: any) => item.id === row.id ? result : item);
          onDataChange(updatedData);
        }
        onOpenChange(false);
      }
    } catch (error) {
      console.error(`Error editing ${model}:`, error);
    } finally {
      setIsEditing(false);
    }
  };

  const renderInputField = (column: string, value: any) => {
    if (typeof value === 'boolean') {
      return (
        <Switch
          id={column}
          name={column}
          defaultChecked={value}
        />
      )
    }

    if (typeof value === 'object' && value !== null) {
      if (value instanceof Date) {
        return (
          <Input
            id={column}
            name={column}
            type="datetime-local"
            defaultValue={value.toISOString().slice(0, 16)}
          />
        )
      }
      return (
        <Textarea
          id={column}
          name={column}
          defaultValue={JSON.stringify(value, null, 2)}
        />
      )
    }

    if (typeof value === 'string' && value.length > 100) {
      return (
        <Textarea
          id={column}
          name={column}
          defaultValue={value}
        />
      )
    }

    return (
      <Input
        id={column}
        name={column}
        defaultValue={value?.toString() || ''}
      />
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {model}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleEdit}>
          {columns.map((column) => (
            <div key={column} className="grid gap-4 py-4">
              <Label htmlFor={column}>{column}</Label>
              {renderInputField(column, row[column])}
            </div>
          ))}
          <Button type="submit" disabled={isEditing}>
            {isEditing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            {isEditing ? 'Saving...' : 'Save changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
