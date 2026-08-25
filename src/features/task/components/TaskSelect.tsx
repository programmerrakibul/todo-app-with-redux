import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRIORITY_BADGE_CONFIG, STATUS_BADGE_CONFIG } from "../constants/task";
import type { TTaskPriority, TTaskStatus } from "../validation/task";
import { TASK_PRIORITY, TASK_STATUS } from "../validation/task";

const statusItems = Object.values(TASK_STATUS).map((value) => ({
  label: STATUS_BADGE_CONFIG[value].label,
  value,
}));

const priorityItems = Object.values(TASK_PRIORITY).map((value) => ({
  label: PRIORITY_BADGE_CONFIG[value].label,
  value,
}));

interface TaskSelectProps {
  label: string;
  value: TTaskStatus | TTaskPriority;
  options: Array<{ label: string; value: string }>;
  onValueChange: (value: string | null) => void;
}

function TaskSelect({ label, value, options, onValueChange }: TaskSelectProps) {
  return (
    <Select items={options} value={value} onValueChange={onValueChange}>
      <SelectTrigger className="min-w-28" aria-label={`Choose ${label}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          {options.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

interface TaskStatusSelectProps {
  value: TTaskStatus;
  onValueChange: (value: TTaskStatus) => void;
}

export function TaskStatusSelect({
  value,
  onValueChange,
}: TaskStatusSelectProps) {
  return (
    <TaskSelect
      label="status"
      value={value}
      options={statusItems}
      onValueChange={(nextValue) => {
        if (nextValue) onValueChange(nextValue as TTaskStatus);
      }}
    />
  );
}

interface TaskPrioritySelectProps {
  value: TTaskPriority;
  onValueChange: (value: TTaskPriority) => void;
}

export function TaskPrioritySelect({
  value,
  onValueChange,
}: TaskPrioritySelectProps) {
  return (
    <TaskSelect
      label="priority"
      value={value}
      options={priorityItems}
      onValueChange={(nextValue) => {
        if (nextValue) onValueChange(nextValue as TTaskPriority);
      }}
    />
  );
}
