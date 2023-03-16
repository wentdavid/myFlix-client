const clearAndForceLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location = "/login";
}

const helper = {
  clearAndForceLogout,
};

export default helper;
