"use client";

import React from "react";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loginState, setLoginState] = useState({
    isLoggedIn: false,
    isLoading: false,
    error: false,
    message: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (loginState.isLoggedIn) {
      router.replace("/");
    }
  }, [loginState.isLoggedIn, router]);

  async function login(email, password) {
    setLoginState({
      isLoggedIn: false,
      isLoading: true,
      error: false,
      message: "Logging in...",
    });

    const loginURL = process.env.NEXT_PUBLIC_API_URL + "/user/login";
    const loginInfo = {
      email: email,
      password: password,
    };

    try {
      await axios.post(loginURL, loginInfo);
      setLoginState({
        isLoggedIn: true,
        isLoading: false,
        error: false,
        message: "",
      });
    } catch (error) {
      if (error.response && error.response.status) {
        if (error.response.status === 401) {
          setLoginState({
            isLoggedIn: false,
            isLoading: false,
            error: true,
            message: "Invalid email or password. Please try again.",
          });
        } else {
          setLoginState({
            isLoggedIn: false,
            isLoading: false,
            error: true,
            message: "An unexpected error occurred. Please try again later.",
          });
        }
      } else {
        setLoginState({
          isLoggedIn: false,
          isLoading: false,
          error: true,
          message: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("user_email");
    const password = formData.get("user_password");
    // Check if email and password are empty
    if (!email) {
      setLoginState({
        isLoggedIn: false,
        isLoading: false,
        error: true,
        message: "Please enter your email.",
      });
      return;
    }
    if (!password) {
      setLoginState({
        isLoggedIn: false,
        isLoading: false,
        error: true,
        message: "Please enter your password.",
      });
      return;
    }
    // Call the login function
    login(email, password);
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="mt-12 max-w-96">
        <div className="pb-4">
          <label htmlFor="user_email" className="block text-sm font-medium">
            Email
          </label>
          <input name="user_email" type="email" className="text-black" />
        </div>
        <div className="pb-6">
          <label htmlFor="user_password" className="block text-sm font-medium">
            Password
          </label>
          <input name="user_password" type="password" className="text-black" />
        </div>

        {loginState.isLoading ? <div>...</div> : <button type="submit">Login</button>}
      </form>
      <Link href="/register">
        <div className="mt-4 text-sm font-medium w-fit underline">Register</div>
      </Link>
      {loginState.error && (
        <div className="mt-4 text-sm font-medium text-red">{loginState.message}</div>
      )}
    </div>
  );
};

export default Login;
