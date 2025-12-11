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
import { TeachersSelect } from "./TeachersSelect"
import { useState } from "react"
import { UpdateCourse } from "../hooks/useCourses"
import { updateCourse } from "@/hooks/useCourses"
import { toast } from "sonner"

export function AssignTeacherDialogForm({id, title='', description=''}) {
    const [teacherId, selectTeacherId] = useState("");
const [open, setOpen] = useState(false);

    const assignTeacher = async (e) => {
        e.preventDefault();
        const updateData = {
            employee_id: teacherId
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
            <DialogTitle>Assign Teacher</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <TeachersSelect onValueChange={selectTeacherId}/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={assignTeacher}><LuCirclePlus /> Assign</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
