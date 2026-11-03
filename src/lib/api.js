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

export const fetchBook = (id) => sendRequest(`/books/${id}`);

export const borrowBook = async (bookId, returnDate) => {
  return sendAuthRequest("/borrows", {
    method: "POST",
    body: JSON.stringify({
      bookId,
      returnDate,
    }),
  });
};
