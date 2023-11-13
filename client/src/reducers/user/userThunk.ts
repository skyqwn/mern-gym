import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/apiconfig";
import { FieldValues } from "react-hook-form";

export const editUser = createAsyncThunk(
  "User/editUser",
  async (data: FieldValues) => {
    const res = await instance.put(`/api/user/${data.userId}`, data);
    console.log(res.data);
    return res.data;
  }
);
