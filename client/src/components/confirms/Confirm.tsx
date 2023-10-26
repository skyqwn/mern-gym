import { modalContainerVariants, modalItemVariants } from "../../libs/framer";
import { Button } from "../Button";

interface ConfirmProps {
  isOpen: boolean;
  onAction: () => void;
  onClose: () => void;
  label: string;
  actionLabel: string;
  secondActionLabel: string;
}

const Confirm = ({
  isOpen,
  onAction,
  onClose,
  label,
  actionLabel,
  secondActionLabel,
}: ConfirmProps) => {
  return (
    <>
      {isOpen && (
        <div>
          <div>{label}</div>
          <div className="flex items-center justify-center">
            <Button label={actionLabel} onAction={onAction} />
            <Button label={secondActionLabel} onAction={onClose} />
          </div>
        </div>
      )}
    </>
  );
};

export default Confirm;
