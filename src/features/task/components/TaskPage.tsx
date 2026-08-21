import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster, toast } from "@/components/ui/toast";

import { TaskFilterBar, DEFAULT_FILTERS } from "./TaskFilterBar";
import { TaskList } from "./TaskList";
import { TaskForm } from "./TaskForm";

import type { TaskFilters } from "./TaskFilterBar";
import type { ITask } from "../interface/task";
import type { TCreateTask } from "../validation/task";
import { TASK_STATUS, TASK_PRIORITY } from "../validation/task";

// ── Placeholder data ──────────────────────────────────────────────────────────

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

const now = new Date();
const ago = (days: number) =>
  new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

const PLACEHOLDER_TASKS: ITask[] = [
  {
    id: makeId(),
    title: "Design the landing page",
    description:
      "Create wireframes and high-fidelity mockups for the new marketing landing page, including mobile and desktop breakpoints.",
    status: TASK_STATUS.DONE,
    priority: TASK_PRIORITY.HIGH,
    createdAt: ago(10),
    updatedAt: ago(2),
  },
  {
    id: makeId(),
    title: "Set up CI/CD pipeline",
    description:
      "Configure GitHub Actions to run lint, type-check, and tests on every pull request, then auto-deploy to staging on merge.",
    status: TASK_STATUS.IN_PROGRESS,
    priority: TASK_PRIORITY.HIGH,
    createdAt: ago(7),
    updatedAt: ago(1),
  },
  {
    id: makeId(),
    title: "Write unit tests for auth module",
    description:
      "Cover login, registration, token refresh, and logout flows with Jest. Aim for at least 80% coverage.",
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.MEDIUM,
    createdAt: ago(5),
    updatedAt: ago(5),
  },
  {
    id: makeId(),
    title: "Migrate database to PostgreSQL",
    description:
      "Move all existing SQLite data to a hosted PostgreSQL instance. Update ORM config and run migrations.",
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.HIGH,
    createdAt: ago(4),
    updatedAt: ago(4),
  },
  {
    id: makeId(),
    title: "Implement dark mode",
    description:
      "Add a theme toggle that persists the user preference to localStorage and respects the system prefers-color-scheme.",
    status: TASK_STATUS.IN_PROGRESS,
    priority: TASK_PRIORITY.LOW,
    createdAt: ago(3),
    updatedAt: ago(1),
  },
  {
    id: makeId(),
    title: "Update API documentation",
    description:
      "Review all REST endpoints and update the OpenAPI spec. Add examples for request and response payloads.",
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.MEDIUM,
    createdAt: ago(2),
    updatedAt: ago(2),
  },
  {
    id: makeId(),
    title: "Performance audit",
    description:
      "Run Lighthouse against production, identify the top three bottlenecks, and open improvement tickets.",
    status: TASK_STATUS.DONE,
    priority: TASK_PRIORITY.MEDIUM,
    createdAt: ago(8),
    updatedAt: ago(3),
  },
  {
    id: makeId(),
    title: "Add rate limiting to API",
    description:
      "Protect public endpoints with per-IP rate limiting using Redis. Return 429 with Retry-After header.",
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.LOW,
    createdAt: ago(1),
    updatedAt: ago(1),
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function TaskPage() {
  const [tasks, setTasks] = useState<ITask[]>(PLACEHOLDER_TASKS);
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);
  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState<ITask | null>(null);

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleAdd(data: TCreateTask) {
    const newTask: ITask = {
      ...data,
      id: makeId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
    toast.add({ title: "Task added successfully.", type: "success" });
  }

  function handleEdit(data: TCreateTask) {
    if (!editTask) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editTask.id ? { ...t, ...data, updatedAt: new Date() } : t
      )
    );
    toast.add({ title: "Task updated.", type: "success" });
  }

  function handleDelete(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.add({ title: "Task deleted.", type: "info" });
  }

  function openAdd() {
    setEditTask(null);
    setFormOpen(true);
  }

  function openEdit(task: ITask) {
    setEditTask(task);
    setFormOpen(true);
  }

  function handleFormSubmit(data: TCreateTask) {
    if (editTask) {
      handleEdit(data);
    } else {
      handleAdd(data);
    }
  }

  // ── Derived stats ────────────────────────────────────────────────────────────

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === TASK_STATUS.DONE).length;
  const inProgress = tasks.filter(
    (t) => t.status === TASK_STATUS.IN_PROGRESS
  ).length;

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <Toaster>
      <div className="min-h-screen bg-background">
        {/* ── Header ── */}
        <header className="border-b border-border bg-card px-4 py-6 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-1">
                <h1 className="font-heading text-2xl font-semibold tracking-wide">
                  Task Board
                </h1>
                <p className="text-sm text-muted-foreground">
                  {total} task{total !== 1 ? "s" : ""} &middot;{" "}
                  {inProgress} in progress &middot; {done} done
                </p>
              </div>
              <Button onClick={openAdd} size="sm">
                <PlusIcon data-icon="inline-start" />
                Add Task
              </Button>
            </div>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          <div className="flex flex-col gap-6">
            {/* Filter bar */}
            <TaskFilterBar filters={filters} onChange={setFilters} />

            <Separator />

            {/* Task grid */}
            <TaskList
              tasks={tasks}
              filters={filters}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          </div>
        </main>

        {/* ── Form dialog ── */}
        <TaskForm
          open={formOpen}
          onOpenChange={(open) => {
            setFormOpen(open);
            if (!open) setEditTask(null);
          }}
          editTask={editTask}
          onSubmit={handleFormSubmit}
        />
      </div>
    </Toaster>
  );
}
