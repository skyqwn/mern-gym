import { cls } from "../libs/util";
import { ButtonProps } from "../types/globalTypes";

export const Button = ({
  label,
  onAction,
  disabled,
  theme = "primary",
  small,
}: ButtonProps) => {
  return (
    <button
      onClick={onAction}
      className={cls(
        "rounded font-bold",
        small ? "p-3" : "p-5",
        theme === "primary"
          ? " bg-teal-500 text-white hover:bg-teal-400 transition"
          : theme === "secondary"
          ? "border-2 border-teal-500 text-teal-500 hover:bg-neutral-100 transition"
          : "text-neutral-600 hover:bg-neutral-100 transition"
      )}
    >
      {label}
    </button>
  );
};
