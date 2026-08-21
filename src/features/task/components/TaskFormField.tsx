import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Controller,
  type Control,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
  type UseFormStateReturn,
} from "react-hook-form";

const FieldType = {
  TEXT: "text",
  EMAIL: "email",
  TEXTAREA: "textarea",
  SELECT: "select",
  CUSTOM: "custom",
} as const;

type FieldOption = Record<"value" | "label", string>;

type BaseFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
};

type TextFieldProps<TFieldValues extends FieldValues = FieldValues> =
  BaseFieldProps<TFieldValues> & {
    type: typeof FieldType.TEXT | typeof FieldType.EMAIL;
    placeholder: string;
  };

type TextareaFieldProps<TFieldValues extends FieldValues = FieldValues> =
  BaseFieldProps<TFieldValues> & {
    type: typeof FieldType.TEXTAREA;
    rows: number;
    placeholder: string;
  };

type SelectFieldProps<TFieldValues extends FieldValues = FieldValues> =
  BaseFieldProps<TFieldValues> & {
    type: typeof FieldType.SELECT;
    options: FieldOption[];
  };

type CustomFieldProps<TFieldValues extends FieldValues = FieldValues> =
  BaseFieldProps<TFieldValues> & {
    type: typeof FieldType.CUSTOM;
    render: ({
      field,
      fieldState,
      formState,
    }: {
      field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
      fieldState: ControllerFieldState;
      formState: UseFormStateReturn<TFieldValues>;
    }) => React.ReactElement;
  };

type TaskFormFieldProps<TFieldValues extends FieldValues = FieldValues> =
  | TextFieldProps<TFieldValues>
  | TextareaFieldProps<TFieldValues>
  | SelectFieldProps<TFieldValues>
  | CustomFieldProps<TFieldValues>;

export const TaskFormField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  control,
  ...props
}: TaskFormFieldProps<TFieldValues>) => {
  const type = props.type;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>

          {type === FieldType.EMAIL || type === FieldType.TEXT ? (
            <Input
              id={name}
              type={type}
              {...field}
              placeholder={props.placeholder}
              aria-invalid={fieldState.invalid || undefined}
            />
          ) : type === FieldType.TEXTAREA ? (
            <Textarea
              id={name}
              {...field}
              rows={props.rows}
              placeholder={props.placeholder}
              aria-invalid={fieldState.invalid || undefined}
            />
          ) : type === FieldType.SELECT ? (
            <Select
              items={props.options}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={fieldState.invalid || undefined}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  {props.options.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : type === FieldType.CUSTOM ? (
            props.render({
              field,
              fieldState,
              formState,
            })
          ) : null}

          <FieldError
            errors={fieldState.error ? [fieldState.error] : undefined}
          />
        </Field>
      )}
    />
  );
};
