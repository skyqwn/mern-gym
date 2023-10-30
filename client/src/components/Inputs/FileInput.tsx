import React, { Dispatch, SetStateAction, useRef } from "react";
import { Control, FieldErrors, useController } from "react-hook-form";
import { cls } from "../../libs/util";

interface FileInputProps {
  name: string;
  label: string;
  required?: string;
  errors: FieldErrors;
  control: Control;
  disabled?: boolean;
  small?: boolean;
}

const FileInput = ({
  name,
  label,
  required,
  errors,
  control,
  disabled,
  small,
}: FileInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { field } = useController({ control, name, rules: { required } });
  console.log(typeof field.value);
  console.log(field.value);
  return (
    <div className="relative w-full">
      {/* {field.value && (
        <div>
          {field.value.map((file: any, i: any) => (
            <div key={i}>
              {file.name}{" "}
              <span
                onClick={() => {
                  const filterFiles = field.value.filter(
                    (file: any, index: any) => {
                      return index !== i;
                    }
                  );
                  field.onChange(filterFiles);
                  console.log(filterFiles);
                }}
              >
                ❌
              </span>
            </div>
          ))}
        </div>
      )} */}
      <input
        multiple
        ref={ref}
        disabled={disabled}
        type="file"
        // value={field.value}
        name={field.name}
        onChange={(e) => {
          if (e.target.files) {
            const array = [...field.value];
            // if (field.value.length > 0) {
            //   for (let i = 0; i < field.value.length; i++) {
            //     array.push(field.value[i]);
            //   }
            // }
            // setFiles([...files, ...e.target.files])
            if (e.target.files.length > 0) {
              for (let i = 0; i < e.target.files.length; i++) {
                array.push(e.target.files[i]);
              }
              field.onChange(array);
            } else {
              field.onChange(field.value);
            }
          }
        }}
        className={cls(
          "w-full outline-none px-4 pt-6 pb-2 border-2 focus:border-neutral-700 rounded peer transition disabled:cursor-not-allowed disabled:opacity-70",
          small ? "px-4 pt-4 pb-2" : "px-4 pt-7 pb-3"
        )}
      />
      <div
        onClick={() => ref.current?.focus()}
        className={cls(
          "absolute origin-[0] font-bold left-4 text-xs scale-100 text-neutral-400 peer-placeholder-shown:scale-100 peer-focus:text-neutral-700 peer-focus:scale-105 cursor-text transition peer-disabled:cursor-not-allowed",
          small ? "top-1" : "top-2 "
        )}
      >
        {label}
      </div>
    </div>
  );
};

export default FileInput;
