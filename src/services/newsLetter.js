import { Routes } from "../constants";
import axios from "axios";

export const newsLetter = async (email) => {
    return await axios
      .post(Routes.newsLetter, { email: email })
      .then((res) => {
        return {
             status:res.data.status,
             message:res.data.message
            };
      })
      .catch((err) => {
        return {
            status:err.response.data.status,
            message:err.response.data.message
           };
      });
  };
 