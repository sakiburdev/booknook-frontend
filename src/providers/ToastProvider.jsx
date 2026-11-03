"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastProvider({ children }) {
  return (
    <>
      {children}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        closeOnClick
        pauseOnHover={false}
      />
    </>
  );
}
