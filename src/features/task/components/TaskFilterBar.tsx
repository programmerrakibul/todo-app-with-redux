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

import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { PRIORITY_BADGE_CONFIG, STATUS_BADGE_CONFIG } from "../constants/task";
import type { ITaskFilter } from "../interface/task";
import { clearFilter, updateFilter } from "../reducers/task-filter.slice";
import { selectAllFilters } from "../selectors/task";
import { TASK_PRIORITY, TASK_STATUS } from "../validation/task";

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

export function TaskFilterBar() {
  // Local search state for debounce — keeps input snappy
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const filters = useSelector(selectAllFilters);
  const [searchInput, setSearchInput] = useState(filters.search);
  const dispatch = useAppDispatch();

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
        dispatch(
          updateFilter({
            type: "search",
            value,
          }),
        );
      }, 350);
    },
    [],
  );

  const handleStatusChange = useCallback((value: ITaskFilter["status"]) => {
    dispatch(
      updateFilter({
        type: "status",
        value,
      }),
    );
  }, []);

  const handlePriorityChange = useCallback((value: ITaskFilter["priority"]) => {
    dispatch(
      updateFilter({
        type: "priority",
        value,
      }),
    );
  }, []);

  const handleSortChange = useCallback((value: ITaskFilter["sort"]) => {
    dispatch(
      updateFilter({
        type: "sort",
        value,
      }),
    );
  }, []);

  const isFiltered =
    filters.search !== "" ||
    filters.status !== "ALL" ||
    filters.priority !== "ALL" ||
    filters.sort !== "newest";

  const handleClear = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchInput("");
    dispatch(clearFilter());
  }, []);

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
        onValueChange={(nextValue) =>
          nextValue && handleStatusChange(nextValue)
        }
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
        onValueChange={(nextValue) =>
          nextValue && handlePriorityChange(nextValue)
        }
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
        onValueChange={(nextValue) => nextValue && handleSortChange(nextValue)}
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
