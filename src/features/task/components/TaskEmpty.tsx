import { ClipboardListIcon } from "lucide-react";

interface TaskEmptyProps {
  message?: string;
}

export function TaskEmpty({
  message = "No tasks found. Add one to get started.",
}: TaskEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <ClipboardListIcon className="size-8 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">No tasks yet</p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
