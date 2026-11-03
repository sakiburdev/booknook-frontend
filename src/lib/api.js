import { authClient } from "@/lib/auth-client";

const API_URL = "http://localhost:8000";

const sendRequest = async (path, options = {}) => {

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const responseText = await response.text();

  let data = null;

  try {
    data = responseText ? JSON.parse(responseText) : null;
  } catch {
    data = { message: responseText };
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
};

const sendAuthRequest = async (path, options = {}) => {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    return {
      ok: false,
      status: 401,
      data: { message: "Please login first" },
    };
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${data.token}`,
    },
  });

  const responseText = await response.text();

  let result = null;

  try {
    result = responseText ? JSON.parse(responseText) : null;
  } catch {
    result = { message: responseText };
  }

  return {
    ok: response.ok,
    status: response.status,
    data: result,
  };
};

export const fetchBooks = () => sendRequest("/books");

export const fetchBook = (id) => sendRequest(`/books/${id}`);

export const addBook = async (bookData) => {
  return sendAuthRequest("/books", {
    method: "POST",
    body: JSON.stringify(bookData),
  });
};

export const updateBook = async (id, bookData) => {
  return sendAuthRequest(`/books/${id}`, {
    method: "PATCH",
    body: JSON.stringify(bookData),
  });
};

export const deleteBook = async (id) => {
  return sendAuthRequest(`/books/${id}`, {
    method: "DELETE",
  });
};

export const borrowBook = async (bookId, returnDate) => {
  return sendAuthRequest("/borrows", {
    method: "POST",
    body: JSON.stringify({
      bookId,
      returnDate,
    }),
  });
};

export const fetchMyBorrows = () => sendAuthRequest("/borrows");

export const returnBook = async (borrowId) => {
  return sendAuthRequest(`/borrows/${borrowId}`, {
    method: "DELETE",
  });
};
