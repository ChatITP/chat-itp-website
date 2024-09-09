"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";
import useAuthRequest from "@/hooks/useAuthRequest";

const CustomDropdown = ({ options, value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`w-full text-white border bg-transparent border-white rounded-lg py-4 px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-purple cursor-pointer ${disabled ? 'opacity-50' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {options.find(opt => opt.value === value)?.label}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-gray border border-white rounded-lg shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 text-white cursor-pointer hover:bg-gray2 rounded-lg"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ReportPage = () => {
    const [formData, setFormData] = useState({
      type: 'bug',
      title: '',
      description: '',
      email: ''
    });
    const [submitState, setSubmitState] = useState({
      isSubmitted: false,
      isSubmitting: false,
      error: false,
      message: "",
    });
  
    const router = useRouter();
    const request = useAuthRequest();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleTypeChange = (value) => {
      setFormData(prevState => ({
        ...prevState,
        type: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitState({
        isSubmitted: false,
        isSubmitting: true,
        error: false,
        message: "Submitting report...",
      });
  
      const reportURL = process.env.NEXT_PUBLIC_API_URL + "/db/reports";
      console.log(reportURL);
  
      try {
        const response = await request(
            "post",
            process.env.NEXT_PUBLIC_API_URL + "/db/reports",
            formData
          );
        setSubmitState({
          isSubmitted: true,
          isSubmitting: false,
          error: false,
          message: "Your report has been submitted successfully. Thank you for your feedback!",
        });
        
        setFormData({
          type: 'bug',
          title: '',
          description: '',
          email: ''
        });
    

      } catch (error) {
        if (error.response && error.response.status) {
          setSubmitState({
            isSubmitted: false,
            isSubmitting: false,
            error: true,
            message: "An unexpected error occurred. Please try again later.",
          });
        } else {
          setSubmitState({
            isSubmitted: false,
            isSubmitting: false,
            error: true,
            message: "An unexpected error occurred. Please try again later.",
          });
        }
      }
    };
  
    const typeOptions = [
      { value: 'bug', label: 'Bug Report' },
      { value: 'feature', label: 'Feature Request' },
    ];
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4">
        <div className="w-full max-w-[460px] bg-white/20 rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[4.5px] border border-white/30 z-20 p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="text-white uppercase text-xs font-sans mb-2">Report an Issue</p>
              <p className="text-white text-xl md:text-2xl font-sans mb-6 font-semibold">
                Bug Report / Feature Request
              </p>
            </div>
  
            <div className="mb-4">
              <p className="text-xs font-sans mb-2 text-white">Type</p>
              <CustomDropdown
                options={typeOptions}
                value={formData.type}
                onChange={handleTypeChange}
                disabled={submitState.isSubmitting}
              />
            </div>
  
            <div className="mb-4">
              <p className="text-xs font-sans mb-2 text-white">Title</p>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={submitState.isSubmitting}
                className="w-full text-white border bg-transparent border-white rounded-lg py-4 px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-purple disabled:opacity-50"
                placeholder="Brief description of the issue"
              />
            </div>
  
            <div className="mb-4">
              <p className="text-xs font-sans mb-2 text-white">Description</p>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                disabled={submitState.isSubmitting}
                className="w-full text-white border bg-transparent border-white rounded-lg py-4 px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-purple disabled:opacity-50"
                placeholder="Detailed description of the bug or feature request"
              />
            </div>
  
            <div className="mb-6">
              <p className="text-xs font-sans mb-2 text-white">Email Address</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={submitState.isSubmitting}
                className="w-full text-white border bg-transparent border-white rounded-lg py-4 px-4 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-purple disabled:opacity-50"
                placeholder="your.email@example.com"
              />
            </div>
  
            <button
              type="submit"
              disabled={submitState.isSubmitting}
              className="bg-white/50 font-sans w-full h-[56px] rounded-lg text-white font-bold uppercase text-xs disabled:opacity-50 transition-opacity duration-200"
            >
              {submitState.isSubmitting ? "Submitting..." : "Submit Report"}
            </button>
          </form>
  
          {(submitState.isSubmitted || submitState.error) && (
            <div className={`mt-4 text-xs font-medium ${submitState.error ? 'text-red-500' : 'text-green-400'}`}>
              {submitState.message}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default ReportPage;