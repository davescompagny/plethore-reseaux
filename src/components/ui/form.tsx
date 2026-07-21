import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  htmlFor,
  error,
  children,
  hint,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-bold text-ink">
        {label}
      </label>
      {children}
      {hint && !error ? <p className="text-xs text-muted">{hint}</p> : null}
      {error ? (
        <p role="alert" className="text-xs font-semibold text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlBase =
  "focus-ring w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 disabled:opacity-50";

export function TextInput({
  className,
  invalid,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      className={cn(controlBase, invalid ? "border-red-400" : "border-line", className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

export function Textarea({
  className,
  invalid,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      className={cn(controlBase, "min-h-28 resize-y", invalid ? "border-red-400" : "border-line", className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

export function Select({
  className,
  invalid,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <select
      className={cn(controlBase, invalid ? "border-red-400" : "border-line", className)}
      aria-invalid={invalid || undefined}
      {...props}
    >
      {children}
    </select>
  );
}

export function CheckboxField({
  id,
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { id: string; label: ReactNode; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5 text-sm text-ink">
        <input
          id={id}
          type="checkbox"
          className="focus-ring mt-0.5 size-4 shrink-0 accent-green"
          {...props}
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p role="alert" className="mt-1 text-xs font-semibold text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function RadioCard({
  name,
  value,
  checked,
  onChange,
  title,
  description,
  icon,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <label
      className={cn(
        "focus-within:ring-3 flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors duration-150",
        checked ? "border-green bg-green-soft" : "border-line bg-surface hover:border-bronze",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {icon}
      <span>
        <span className="block font-bold text-ink">{title}</span>
        {description ? <span className="block text-sm text-muted">{description}</span> : null}
      </span>
    </label>
  );
}

export function CheckboxCard({
  checked,
  onChange,
  title,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-lg border p-3.5 text-sm font-semibold transition-colors duration-150",
        checked ? "border-green bg-green-soft text-green" : "border-line bg-surface text-ink hover:border-bronze",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      {title}
    </label>
  );
}
