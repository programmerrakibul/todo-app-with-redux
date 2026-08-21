import z from "zod";

export const TASK_STATUS = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
} as const;

export const TASK_PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export const statusEnum = z.enum(Object.values(TASK_STATUS), {
  error: `Status must be one of ${Object.values(TASK_STATUS)}`,
});
export const priorityEnum = z.enum(Object.values(TASK_PRIORITY), {
  error: `Priority must be one of ${Object.values(TASK_PRIORITY)}`,
});

export const createTaskSchema = z.object({
  title: z
    .string("Title must be a string")
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),

  description: z
    .string("Description must be a string")
    .trim()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),

  status: statusEnum.default(TASK_STATUS.TODO),
  priority: priorityEnum.default(TASK_PRIORITY.LOW),
});

export const updateTaskSchema = createTaskSchema.partial();
export const updateTaskStatusSchema = createTaskSchema.pick({
  status: true,
});
export const updateTaskPrioritySchema = createTaskSchema.pick({
  priority: true,
});

export type TCreateTask = z.infer<typeof createTaskSchema>;
export type TUpdateTask = z.infer<typeof updateTaskSchema>;
export type TTaskStatus = z.infer<typeof statusEnum>;
export type TTaskPriority = z.infer<typeof priorityEnum>;
export type TUpdateTaskStatus = z.infer<typeof updateTaskStatusSchema>;
export type TUpdateTaskPriority = z.infer<typeof updateTaskPrioritySchema>;
