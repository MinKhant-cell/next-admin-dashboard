"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LuBadgePlus, LuCirclePlus } from "react-icons/lu"
import { StudentsSelect } from "./StudentsSelect"
import { useState } from "react"
import { UpdateCourse } from "../hooks/useCourses"
import { updateCourse } from "@/hooks/useCourses"
import { toast } from "sonner"

export function AssignStudentDialogForm({id, title='', description=''}) {
    const [teacherId, selectTeacherId] = useState("");
    const [studentId, selectStudentId] = useState("");
    const [open, setOpen] = useState(false);

    const assignStudent = async (e) => {
        e.preventDefault();
        const updateData = {
            student_id: studentId
        }
        const {data, message, status, error} = await updateCourse(id,updateData);
        if(!error && status == 200) {
            toast.success(message);
            setOpen(false)
        }else {
          toast.error(message);
        }
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
      <LuCirclePlus /> {title ?? ''}
    </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title ?? ''}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <StudentsSelect onValueChange={selectTeacherId}/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={assignStudent}><LuCirclePlus /> Assign</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
