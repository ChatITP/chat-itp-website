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
      router.replace("/workspace");
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
    <>
      <div className="mt-[140px] w-[460px] h-[600px] bg-white rounded-3xl">
        <form onSubmit={handleFormSubmit}>
          <div className="mx-[40px] pt-[64px]">
            <p className="text-black uppercase text-xs font-sans mb-2">
              welcome back
            </p>
            <p className="text-black text-2xl font-sans mb-7 font-semibold">
              Log In to your Account
            </p>
            <div id="email-field" className="relative mb-4 w-[380px]">
              <label
                htmlFor="user_email"
                className="absolute left-3 top-[-8px] bg-white px-1 text-xs text-gray font-sans"
              >
                Email
              </label>
              <input
                id="user_email"
                name="user_email"
                type="email"
                className="w-full text-black border border-black rounded-lg py-4 px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="chatitp@nyu.edu"
              />
            </div>

            <div id="password-field" className="relative mb-4">
              <label
                htmlFor="user_password" 
                className="absolute left-3 top-[-8px] bg-white px-1 text-xs text-gray font-sans"
              >
                Password
              </label>
              <input
                id="user_password" 
                name="user_password"
                type="password"
                className="w-full text-black border border-black rounded-lg py-4 px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="***************"
              />
            </div>

            {/* checkbox and forgot password */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  id="checkbox-1"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-50 border-black rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="checkbox-1" 
                  className="ml-2 text-xs font-sans text-black"
                >
                  Remember me
                </label>
              </div>
              <div>
                <p className="text-xs font-sans text-black">Forgot Password?</p>
              </div>
            </div>

            {loginState.isLoading ? (
              <div>...</div>
            ) : (
              <button
                type="submit"
                className="bg-black font-sans w-[380px] h-[56px] rounded-lg text-white uppercase text-xs"
              >
                continue
              </button>
            )}
          </div>
        </form>

        <div className="flex items-center mt-7 mb-8 mx-[40px]">
          <hr className="flex-grow border-t border-chatGray" />
          <span className="mx-4 text-black font-semibold text-xs font-sans">
            Or
          </span>
          <hr className="flex-grow border-t border-chatGray" />
        </div>

        <div className="mt-4 text-xs font-sans w-fit text-black mx-auto">
          New User?{" "}
          <Link href="/register">
            <span className="font-bold underline uppercase">Sign up here</span>
          </Link>
        </div>

        {loginState.error && (
          <div className="mt-4 text-xs font-medium text-red-500 mx-[40px]">
            {loginState.message}
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
