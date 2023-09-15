export interface ButtonProps {
  label: string;
  onAction: () => void;
  disabled?: boolean;
  theme?: "primary" | "secondary" | "tertiary";
  small?: boolean;
}
