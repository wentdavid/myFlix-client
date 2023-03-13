import { MOVIE_API_URL } from "./config";
import axios from "axios";

const verifyPassword = async (username, password) => {
    return axios
      .post(
        `${MOVIE_API_URL}/verify-password`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("In the response")
        return response.data;
      })
      .catch((error) => {
        console.log("Error while verifying password", error);
        return null;
      });
};

const deleteUser = async (username) => {
  return axios
    .delete(
      `${MOVIE_API_URL}/users/${
        JSON.parse(localStorage.getItem("user")).Username
      }`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

const updateUser = async ({ Username, Password, Email, Birthday }) => {
  return axios
    .put(
      `${MOVIE_API_URL}/users/${
        JSON.parse(localStorage.getItem("user")).Username
      }`,
      { Username, Password, Email, Birthday },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export {
    verifyPassword,
    deleteUser,
    updateUser,
}
