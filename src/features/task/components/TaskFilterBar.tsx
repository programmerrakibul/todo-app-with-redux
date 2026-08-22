import { SearchIcon, XIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// ── Types ─────────────────────────────────────────────────────────────────────

export type SortOrder = "newest" | "oldest";

export interface TaskFilters {
  search: string;
  status: TTaskStatus | "";
  priority: TTaskPriority | "";
  sort: SortOrder;
}

export const DEFAULT_FILTERS: TaskFilters = {
  search: "",
  status: "",
  priority: "",
  sort: "newest",
};

interface TaskFilterBarProps {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
}

// ── Select items (Base UI requires `items` prop) ──────────────────────────────

const statusItems = [
  { label: "All statuses", value: "" },
  ...Object.values(TASK_STATUS).map((v) => ({
    label: STATUS_BADGE_CONFIG[v].label,
    value: v,
  })),
];

const priorityItems = [
  { label: "All priorities", value: "" },
  ...Object.values(TASK_PRIORITY).map((v) => ({
    label: PRIORITY_BADGE_CONFIG[v].label,
    value: v,
  })),
];

const sortItems = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function TaskFilterBar({ filters, onChange }: TaskFilterBarProps) {
  // Local search state for debounce — keeps input snappy
  const [searchInput, setSearchInput] = useState(filters.search);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep local state in sync when filters are reset externally
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchInput(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange({ ...filters, search: value });
      }, 350);
    },
    [filters, onChange],
  );

  const handleStatusChange = useCallback(
    (value: string | null) => {
      onChange({ ...filters, status: (value ?? "") as TTaskStatus | "" });
    },
    [filters, onChange],
  );

  const handlePriorityChange = useCallback(
    (value: string | null) => {
      onChange({ ...filters, priority: (value ?? "") as TTaskPriority | "" });
    },
    [filters, onChange],
  );

  const handleSortChange = useCallback(
    (value: string | null) => {
      onChange({ ...filters, sort: (value ?? "newest") as SortOrder });
    },
    [filters, onChange],
  );

  const isFiltered =
    filters.search !== "" ||
    filters.status !== "" ||
    filters.priority !== "" ||
    filters.sort !== "newest";

  const handleClear = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchInput("");
    onChange(DEFAULT_FILTERS);
  }, [onChange]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <SearchIcon className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        <Input
          placeholder="Search tasks…"
          value={searchInput}
          onChange={handleSearchChange}
          className="pl-5"
          aria-label="Search tasks"
          type="search"
        />
      </div>

      {/* Status filter */}
      <Select
        items={statusItems}
        value={filters.status}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-full sm:w-40" aria-label="Filter by status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {statusItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Priority filter */}
      <Select
        items={priorityItems}
        value={filters.priority}
        onValueChange={handlePriorityChange}
      >
        <SelectTrigger
          className="w-full sm:w-40"
          aria-label="Filter by priority"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {priorityItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select
        items={sortItems}
        value={filters.sort}
        onValueChange={handleSortChange}
      >
        <SelectTrigger className="w-full sm:w-36" aria-label="Sort by date">
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {sortItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Clear filters */}
      {isFiltered && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleClear}
          aria-label="Clear all filters"
          title="Clear filters"
        >
          <XIcon />
        </Button>
      )}
    </div>
  );
}
