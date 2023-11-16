import React from "react";
import { useAppDispatch } from "../store";
import { Button } from "./Button";

interface CheckAutorProps {
  userId: string;
  authorId: string;
  editLabel: string;
  editAction: () => void;
  deleteLabel: string;
  deleteAction: () => void;
}

const CheckAuthor = ({
  userId,
  authorId,
  editLabel,
  editAction,
  deleteLabel,
  deleteAction,
}: CheckAutorProps) => {
  if (userId !== authorId) return null;
  return (
    <div className="flex gap-5 w-96">
      <Button label={editLabel} onAction={editAction} />
      <Button label={deleteLabel} onAction={deleteAction} />
    </div>
    // <div>
    // {/* {userId === authorId && ( */}
    // <div className="flex gap-5 w-96">
    //   <Button label={editLabel} onAction={editAction} />
    //   <Button label={deleteLabel} onAction={deleteAction} />
    // </div>
    // )}
    // </div>
  );
};

export default CheckAuthor;
