import { JSX } from "react";

export interface BaseFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: JSX.Element;
}
