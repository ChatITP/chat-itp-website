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
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/user/register", loginInfo, {
        withCredentials: true,
      });
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
    <div>
      <form onSubmit={handleFormSubmit} className="mt-12 max-w-96 text-black">
        <div className="pb-6">
          <label htmlFor="user_name" className="block text-sm font-medium text-white">
            Name
          </label>
          <input name="user_name" type="text" />
        </div>
        <div className="pb-6">
          <label htmlFor="user_email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input name="user_email" type="email" />
        </div>
        <div className="pb-6">
          <label htmlFor="user_password" className="block text-sm font-medium text-white">
            Password
          </label>
          <input name="user_password" type="password" />
        </div>
        <div className="pb-6">
          <label htmlFor="user_password_confirm" className="block text-sm font-medium text-white">
            Confirm Password
          </label>
          <input name="user_password_confirm" type="password" />
        </div>
        <div className="pb-6">
          <label htmlFor="user_code" className="block text-sm font-medium text-white">
            Early Access Code
          </label>
          <input name="user_code" type="text" autoComplete="off" />
        </div>

        <button type="submit" className="text-white">
          Register
        </button>
      </form>
      <Link href="/login">
        <div className="mt-4 text-sm font-medium w-fit underline">
          Already have an account? Login
        </div>
      </Link>
      {registerState.error && <div className="text-red">{registerState.message}</div>}
    </div>
  );
};

export default Register;
