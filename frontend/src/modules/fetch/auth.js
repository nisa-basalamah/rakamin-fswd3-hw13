import instance from "../axios/axios";

export const register = async (params) => {
  try {
    const { username, email, password } = params;
    const response = await instance({
      method: "POST",
      url: "/register",
      data: {
        name: username,
        email,
        password,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (params) => {
  try {
    const { email, password } = params;
    const response = await instance({
      method: "POST",
      url: "/login",
      data: {
        email,
        password,
      },
    });

    const { token } = response.data;
    localStorage.setItem("accessToken", token);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
