import instance from "../axios/axios";

export const createBook = async (params) => {
  try {
    const response = await instance.postForm("/books", params);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllBooks = async () => {
  try {
    const response = await instance({
      method: "GET",
      url: "/books",
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateBook = async (id, params) => {
  try {
    const response = await instance({
      method: "PUT",
      url: `/books/${id}`,
      data: { ...params },
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await instance({
      method: "DELETE",
      url: `/books/${id}`,
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getBookById = async (id) => {
  try {
    const response = await instance({
      method: "GET",
      url: `/books/${id}`,
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
