import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";
import { Field, FieldLabel, FieldError as FieldErrorMsg } from "@/components/ui/field";

interface TaskFormFieldProps {
  label: string;
  error?: FieldError;
  children: ReactNode;
}

/**
 * Thin wrapper: applies data-invalid when there is an error,
 * renders the label, the control (via children), and the error message.
 */
export function TaskFormField({ label, error, children }: TaskFormFieldProps) {
  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel>{label}</FieldLabel>
      {children}
      <FieldErrorMsg>{error?.message}</FieldErrorMsg>
    </Field>
  );
}
