import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { TaskFilterBar } from "./TaskFilterBar";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

import type { ITask } from "../interface/task";
import { TASK_STATUS } from "../validation/task";

export function TaskPage() {
  const tasks: ITask[] = [];
  const [formOpen, setFormOpen] = useState(false);

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === TASK_STATUS.DONE).length;
  const inProgress = tasks.filter(
    (t) => t.status === TASK_STATUS.IN_PROGRESS,
  ).length;

  return (
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
                {total} task{total !== 1 ? "s" : ""} &middot; {inProgress} in
                progress &middot; {done} done
              </p>
            </div>
            <Button onClick={() => setFormOpen(true)} size="sm">
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
          <TaskFilterBar />

          <Separator />

          {/* Task grid */}
          <TaskList />
        </div>
      </main>

      {/* ── Form dialog ── */}
      <TaskForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
        }}
        editTask={null}
      />
    </div>
  );
}
