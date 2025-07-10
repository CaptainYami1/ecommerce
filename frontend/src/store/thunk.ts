import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_SERV = "http://localhost:3001";

interface getEmailUserData {
  email: string;
}

export const getEmail = createAsyncThunk(
  "user/getEmail",
  async (userData: getEmailUserData) => {
    try {
      const response = await axios.post(`${URL_SERV}/get-email`, 
        userData,
      );

      return response.data;
    } catch (error) {
      console.log("There was an error getting info!", error);
       return error
    }
  }
);

export const sendInfo = createAsyncThunk(
  "user/sendInfo",
  async (userData: any) => {
    try {
      const response = await axios.post(`${URL_SERV}/users`, userData);
      return response.data;
    } catch (error) {
      console.log("There was an error sending info!", error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${URL_SERV}/login-user`, userData);
      return response.data;
    } catch (error) {
      console.log("There was an error logging in!", error);
      return error;
    }
  }
);
