import { MOVIE_API_URL } from "./config";
import axios from "axios";

const verifyPassword = async (password) => {
    return axios
      .post(
        `${MOVIE_API_URL}/verify-password`,
        { username: JSON.parse(localStorage.getItem("user")).Username, password },
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
        console.log("Error while verifying password", error);
        alert("Error while verifying password, try again or contact admin");
        return null;
      });
};

const getUser = async (username) => {
  return axios
    .get(
      `${MOVIE_API_URL}/users/${username}`,
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
      console.log("Error while getting user", error);
      alert("Error while getting user, try again or contact admin");
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
      console.log("Error while deleting user", error);
      alert("Error while deleting user, try again or contact admin");
      return null;
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
      console.log("Error while updating user", error);
      alert("Error while updating user, try again or contact admin");
      return null;
    });
};

const signUpUser = async ({ Username, Password, Email, Birthday }) => {
  return axios
    .post(
      `${MOVIE_API_URL}/users`,
      { Username, Password, Email, Birthday },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error while signing up user", error);
      alert("Error while signing up user, try again or contact admin");
      return null;
    });
};



const getAllMovies = async () => {
  return axios
    .get(
      `${MOVIE_API_URL}/movies/`,
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
      console.log("Error while getting movies", error);
      alert("Error while getting movies, try again or contact admin");
      return null;
    });
};

export default api = {
    verifyPassword,
    getUser,
    deleteUser,
    updateUser,
    signUpUser,
    getAllMovies,
}
