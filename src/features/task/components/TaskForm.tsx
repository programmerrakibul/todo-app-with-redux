import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { TaskFormField } from "./TaskFormField";
import {
  createTaskSchema,
  TASK_PRIORITY,
  TASK_STATUS,
  type TCreateTask,
} from "../validation/task";
import { STATUS_BADGE_CONFIG, PRIORITY_BADGE_CONFIG } from "../constants/task";
import type { ITask } from "../interface/task";

// ── Select items for Base UI (requires `items` prop on root) ──────────────────

const statusItems = Object.values(TASK_STATUS).map((value) => ({
  label: STATUS_BADGE_CONFIG[value].label,
  value,
}));

const priorityItems = Object.values(TASK_PRIORITY).map((value) => ({
  label: PRIORITY_BADGE_CONFIG[value].label,
  value,
}));

// ─────────────────────────────────────────────────────────────────────────────

interface TaskFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When provided the dialog is in edit mode */
  editTask?: ITask | null;
  onSubmit: (data: TCreateTask) => void;
  /** Optional custom trigger rendered by the parent */
  trigger?: React.ReactNode;
}

export function TaskForm({
  open,
  onOpenChange,
  editTask,
  onSubmit,
  trigger,
}: TaskFormProps) {
  const isEdit = !!editTask;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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

  function handleFormSubmit(data: TCreateTask) {
    onSubmit(data);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger render={<span />}>{trigger}</DialogTrigger>
      )}

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Task" : "Add Task"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the details of your task."
              : "Fill in the details to create a new task."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <FieldGroup className="gap-6">

            {/* Title */}
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <TaskFormField label="Title" error={fieldState.error}>
                  <Input
                    {...field}
                    placeholder="Task title"
                    aria-invalid={fieldState.invalid || undefined}
                  />
                </TaskFormField>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <TaskFormField label="Description" error={fieldState.error}>
                  <Textarea
                    {...field}
                    placeholder="Describe the task…"
                    aria-invalid={fieldState.invalid || undefined}
                    className="min-h-24"
                  />
                </TaskFormField>
              )}
            />

            {/* Status + Priority side by side on wider screens */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              {/* Status */}
              <Controller
                name="status"
                control={control}
                render={({ field, fieldState }) => (
                  <TaskFormField label="Status" error={fieldState.error}>
                    <Select
                      items={statusItems}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={fieldState.invalid || undefined}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {statusItems.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TaskFormField>
                )}
              />

              {/* Priority */}
              <Controller
                name="priority"
                control={control}
                render={({ field, fieldState }) => (
                  <TaskFormField label="Priority" error={fieldState.error}>
                    <Select
                      items={priorityItems}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={fieldState.invalid || undefined}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {priorityItems.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TaskFormField>
                )}
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
