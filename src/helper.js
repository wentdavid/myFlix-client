const clearAndForceLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location = "/login";
}

export default helper = {
    clearAndForceLogout,
}