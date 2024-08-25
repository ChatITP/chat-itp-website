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
      <div className="relative w-[320px] h-[550px] md:w-[460px] md:h-[600px] bg-white/20 rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[4.5px] border border-white/30 z-20">
        <form onSubmit={handleFormSubmit}>
          <div className="mx-[25px] md:mx-[40px] pt-[56px] md:pt-[64px]">
            <p className="text-white uppercase text-xs font-sans md:mb-2">
              welcome back
            </p>
            <p className="text-white text-xl md:text-2xl font-sans mb-6 md:mb-7 font-semibold">
              Log In to your Account
            </p>
            <div id="email-field" className="relative mb-4">
              <p className="text-xs font-sans mb-2">Email</p>
              {/* <label
                htmlFor="user_email"
                className="absolute left-3 top-[-8px] bg-white px-1 text-xs text-offWhite font-sans"
              >
                Email
              </label> */}
              <input
                id="user_email"
                name="user_email"
                type="email"
                className="w-full text-white border bg-transparent border-white rounded-lg py-4 px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-purple"
                placeholder="chatitp@nyu.edu"
              />
            </div>

            <div id="password-field" className="relative mb-4">
              <p className="text-xs font-sans mb-2">Password</p>

              {/* <label
                htmlFor="user_password"
                className="absolute left-3 top-[-8px] bg-white px-1 text-xs text-black font-sans"
              >
                Password
              </label> */}
              <input
                id="user_password"
                name="user_password"
                type="password"
                className="w-full text-white border bg-transparent border-white rounded-lg py-4 px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-purple"
                placeholder="***************"
              />
            </div>

            {/* checkbox and forgot password */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  id="checkbox-1"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-transparent border-white rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="checkbox-1"
                  className="ml-2 text-xs font-sans text-white"
                >
                  Remember me
                </label>
              </div>
              <div>
                <p className="text-xs font-sans text-white">Forgot Password?</p>
              </div>
            </div>

            {loginState.isLoading ? (
              <div>...</div>
            ) : (
              <button
                type="submit"
                className="bg-white/50 font-sans w-[268px] md:w-[380px] h-[56px] rounded-lg text-white font-bold uppercase text-xs"
              >
                continue
              </button>
            )}
          </div>
        </form>

        <div className="flex items-center mt-7 mb-8 mx-[25px] md:mx-[40px]">
          <hr className="flex-grow border-t border-white" />
          <span className="mx-4 text-white font-semibold text-xs font-sans">
            Or
          </span>
          <hr className="flex-grow border-t border-white" />
        </div>

        <div className="mt-4 text-xs font-sans w-fit text-white mx-auto">
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
