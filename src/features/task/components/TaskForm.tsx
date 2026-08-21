import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";

import { toast } from "@/components/ui/toast";
import { useAppDispatch } from "@/redux/store";
import { PRIORITY_BADGE_CONFIG, STATUS_BADGE_CONFIG } from "../constants/task";
import type { ITask } from "../interface/task";
import { addTask } from "../reducers/task.slice";
import {
  createTaskSchema,
  TASK_PRIORITY,
  TASK_STATUS,
  type TCreateTask,
} from "../validation/task";
import { TaskFormField } from "./TaskFormField";

const statusItems = Object.values(TASK_STATUS).map((value) => ({
  label: STATUS_BADGE_CONFIG[value].label,
  value,
}));

const priorityItems = Object.values(TASK_PRIORITY).map((value) => ({
  label: PRIORITY_BADGE_CONFIG[value].label,
  value,
}));

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When provided the dialog is in edit mode */
  editTask?: ITask | null;
  /** Optional custom trigger rendered by the parent */
  trigger?: React.ReactNode;
}

export function TaskForm({
  open,
  onOpenChange,
  editTask,
  trigger,
}: TaskFormProps) {
  const isEdit = !!editTask;
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TCreateTask>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: TASK_STATUS.TODO,
      priority: TASK_PRIORITY.LOW,
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (editTask) {
      reset({
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
        priority: editTask.priority,
      });
    } else {
      reset({
        title: "",
        description: "",
        status: TASK_STATUS.TODO,
        priority: TASK_PRIORITY.LOW,
      });
    }
  }, [editTask, reset, open]);

  const onSubmit = (data: TCreateTask) => {
    dispatch(addTask(data));
    onOpenChange(false);
    toast.add({
      type: "success",
      description: "Task added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger render={<span />}>{trigger}</DialogTrigger>}

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Task" : "Add Task"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the details of your task."
              : "Fill in the details to create a new task."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-6">
            <TaskFormField
              name="title"
              label="Title"
              control={control}
              type="text"
              placeholder="e.g. Fix the Form Component bug"
            />

            <TaskFormField
              name="description"
              label="Description"
              control={control}
              type="textarea"
              rows={4}
              placeholder="Describe the task.."
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <TaskFormField
                name="status"
                label="Status"
                control={control}
                type="select"
                options={statusItems}
              />

              <TaskFormField
                name="priority"
                label="Priority"
                control={control}
                type="select"
                options={priorityItems}
              />
            </div>
          </FieldGroup>

          <DialogFooter className="mt-8" showCloseButton>
            <Button type="submit" disabled={isSubmitting}>
              {isEdit ? "Save Changes" : "Add Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
