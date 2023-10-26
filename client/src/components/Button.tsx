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
        "rounded font-bold w-full disabled:cursor-not-allowed disabled:opacity-70 transition",
        small ? "p-3" : "p-5",
        theme === "primary"
          ? " bg-teal-500 text-white hover:bg-teal-400 "
          : theme === "secondary"
          ? "border-2 border-teal-500 text-teal-500 hover:bg-neutral-100 "
          : "text-neutral-600 hover:bg-neutral-100 "
      )}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
