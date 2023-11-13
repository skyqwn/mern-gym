import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/apiconfig";
import { FieldValues } from "react-hook-form";

export const editUser = createAsyncThunk(
  "User/editUser",
  async (data: FieldValues) => {
    console.log(data);
    if (data.id) {
      const fd = new FormData();
      fd.append("id", data.id);
      fd.append("nickname", data.nickname);
      fd.append("file", data.file[0]);
      fd.append("previewImage", data.previewImage);
      console.log(Array.from(fd));
      const res = await instance.put(`/api/user/${data.id}`, fd);
      return res.data;
    }
  }
);

export default { editUser };
