import { AnimatePresence, motion } from "framer-motion";
import { modalContainerVariants, modalItemVariants } from "../../libs/framer";
import { Button } from "../Button";
import { AiOutlineClose } from "react-icons/ai";

interface ConfirmProps {
  isOpen: boolean;
  onAction: () => void;
  onClose: () => void;
  label: string;
  actionLabel: string;
  secondActionLabel?: string;
  secondAction?: () => void;
  disabled?: boolean;
}

const Confirm = ({
  isOpen,
  onAction,
  onClose,
  label,
  actionLabel,
  secondActionLabel,
  secondAction,
  disabled,
}: ConfirmProps) => {
  return (
    <>
      <AnimatePresence>
        {isOpen ? ( // modal continaer
          <motion.div
            variants={modalContainerVariants}
            initial={modalContainerVariants.start}
            animate={modalContainerVariants.end}
            exit={modalContainerVariants.exit}
            className="absolute top-0 left-0 w-screen h-screen z-10 bg-black/50 flex items-center justify-center overflow-hidden"
          >
            {/* modal body */}
            <motion.div
              variants={modalItemVariants}
              initial={modalItemVariants.start}
              animate={modalItemVariants.end}
              exit={modalItemVariants.exit}
              className=" sm:h-60 w-2/3 sm:w-2/3 lg:w-1/2 bg-white rounded flex flex-col"
            >
              {/* modal head */}
              <div className="relative h-16 font-bold text-xl flex items-center justify-center">
                <div className="text-center">{label}</div>
                <div
                  className="absolute  h-full w-16 right-0 flex items-center justify-center hover:opacity-50"
                  onClick={onClose}
                >
                  <AiOutlineClose size={24} />
                </div>
              </div>

              {/* modal footer */}
              <div className="px-6 py-4 flex gap-6 ">
                {secondActionLabel && secondAction && (
                  <Button
                    label={secondActionLabel}
                    onAction={secondAction}
                    theme="secondary"
                    small
                    disabled={disabled}
                  />
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onAction={onAction}
                  small
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {/* {isOpen && (
        <div>
          <div>{label}</div>
          <div className="flex items-center justify-center">
            <Button label={actionLabel} onAction={onAction} />
            <Button label={secondActionLabel} onAction={onClose} />
          </div>
        </div>
      )} */}
    </>
  );
};

export default Confirm;
