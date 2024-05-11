"use client";

import { useState } from "react";

const initValues = { name: "", email: "", subject: "", message: "" };

const initState = { isLoading: false, error: "", values: initValues };

export default function Form() {
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});

  const { values, isLoading, error } = state;

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    const emailData = {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
    };

    try {
      const response = await fetch("/app/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });
      

      if (response.ok) {
        setState(initState);
        setTouched({});
        console.log("Email sent successfully!");
      } else {
        throw new Error("Failed to send email.");
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  return (
    <div
      id="form"
      className="p-14 pt-48 min-h-screen sm:p-24 sm:pt-48 max-w-[1024px] m-auto"
    >
      <h1 className="text-center font-bold text-4xl pb-12 sm:text-left">
        Contact
      </h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {/* Name input field */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={onBlur}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={onBlur}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            required
          />
        </div>

        {/* <div className="mb-4">
          <label htmlFor="subject" className="block mb-1 text-sm font-medium text-slate-700">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={values.subject}
            onChange={handleChange}
            onBlur={onBlur}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block mb-1 text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={onBlur}
            rows={4}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-black shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            required
          ></textarea>
        </div> */}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-sky-500 text-white font-semibold rounded-md shadow-md hover:bg-sky-600 focus:outline-none focus:bg-sky-600"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Submit"}
        </button>

        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}
      </form>

    </div>
  );
}

