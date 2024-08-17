"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const [registerState, setRegisterState] = useState({
    isLoading: false,
    error: false,
    message: "",
  });

  const router = useRouter();
  const handleFormSubmit = async (e) => {
    setRegisterState({
      isLoading: true,
      error: false,
      message: "Registering...",
    });

    e.preventDefault();
    const formData = new FormData(e.target);
    const loginInfo = {
      name: formData.get("user_name"),
      email: formData.get("user_email"),
      password: formData.get("user_password"),
      confirmPassword: formData.get("user_password_confirm"),
      earlyAccessCode: formData.get("user_code"),
    };
    if (!loginInfo.name) {
      setRegisterState({
        isLoading: false,
        error: true,
        message: "Please enter your name.",
      });
      return;
    }
    if (!loginInfo.email) {
      setRegisterState({
        isLoading: false,
        error: true,
        message: "Please enter your email.",
      });
      return;
    }
    if (!loginInfo.password) {
      setRegisterState({
        isLoading: false,
        error: true,
        message: "Please enter a password.",
      });
      return;
    }
    if (!loginInfo.confirmPassword) {
      setRegisterState({
        isLoading: false,
        error: true,
        message: "Please confirm your password.",
      });
      return;
    }
    if (!loginInfo.earlyAccessCode) {
      setRegisterState({
        isLoading: false,
        error: true,
        message: "Please enter your early access code.",
      });
      return;
    }
    if (loginInfo.password !== loginInfo.confirmPassword) {
      setRegisterState({
        isLoading: false,
        error: true,
        message: "Passwords do not match.",
      });
      return;
    }

    registerUser(loginInfo);
  };

  async function registerUser(loginInfo) {
    try {
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/user/register",
        loginInfo,
        {
          withCredentials: true,
        }
      );
      router.replace("/login");
    } catch (error) {
      if (error.response && error.response.status) {
        if (error.response.status === 403) {
          setRegisterState({
            isLoading: false,
            error: true,
            message: "Invalid early access code.",
          });
        } else if (error.response.status === 409) {
          setRegisterState({
            isLoading: false,
            error: true,
            message: "This email has already been registered.",
          });
        }
      } else {
        setRegisterState({
          isLoading: false,
          error: true,
          message: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  }

  return (
    <>
      <div className="mt-[20px] w-[460px] h-[650px] bg-white rounded-3xl">
        <div>
          <form onSubmit={handleFormSubmit} className="mt-8  text-black">
            <div className="mx-[40px]">
              <p className="text-black uppercase text-xs font-sans mb-2">
                let&apos; get you started
              </p>
              <p className="text-black text-2xl font-sans mb-7 font-semibold">
                Create an Account
              </p>
              <div id="name-field" className="relative mb-4 w-[380px]">
                <label
                  htmlFor="user_name"
                  className="absolute left-3 top-[-8px] bg-white px-1 text-xs text-gray font-sans"
                >
                  Your Name
                </label>
                <input
                  name="user_name"
                  type="text"
                  className="w-full text-black border border-black rounded-lg py-4 px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="chatit"
                />
              </div>
              <div id="email-field" className="relative mb-4 w-[380px]">
                <label
                  htmlFor="user_email"
                  className="absolute left-3 top-[-8px] bg-white px-1 text-xs text-gray font-sans"
                >
                  Email
                </label>
                <input
                  name="user_email"
                  type="email"
                  className="w-full text-black border border-black rounded-lg py-4 px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="chatitp@nyu.edu"
                />
              </div>
              <div id="password-field" className="relative mb-4 w-[380px]">
                <label
                  htmlFor="user_password"
                  className="absolute left-3 top-[-8px] bg-white px-1 text-xs text-gray font-sans"
                >
                  Password
                </label>
                <input
                  name="user_password"
                  type="password"
                  className="w-full text-black border border-black rounded-lg py-4 px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="***************"
                />
              </div>
              <div
                id="password-confirm-field"
                className="relative mb-4 w-[380px]"
              >
                <label
                  htmlFor="user_password_confirm"
                  className="absolute left-3 top-[-8px] bg-white px-1 text-xs text-gray font-sans"
                >
                  Confirm Password
                </label>
                <input
                  name="user_password_confirm"
                  type="password"
                  className="w-full text-black border border-black rounded-lg py-4 px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="***************"
                />
              </div>
              <div id="user-code-field" className="relative mb-4 w-[380px]">
                <label
                  htmlFor="user_code"
                  className="absolute left-3 top-[-8px] bg-white px-1 text-xs text-gray font-sans"
                >
                  Early Access Code
                </label>
                <input
                  name="user_code"
                  type="text"
                  autoComplete="off"
                  className="w-full text-black border border-black rounded-lg py-4 px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="***************"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-black font-sans w-[380px] h-[56px] rounded-lg text-white uppercase mx-[40px] text-xs"
            >
              Get Started
            </button>
          </form>
          <div className="flex items-center mt-7 mb-6 mx-[40px]">
            <hr className="flex-grow border-t border-chatGray" />
            <span className="mx-4 text-black font-semibold text-xs font-sans">
              Or
            </span>
            <hr className="flex-grow border-t border-chatGray" />
          </div>
         
            <div className="text-xs font-sans w-fit text-black mx-auto">
              Already have an account?  <Link href="/login"><span className = "underline font-bold uppercase">Login here</span></Link>
            </div>
          
          {registerState.error && (
            <div className="text-red">{registerState.message}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
