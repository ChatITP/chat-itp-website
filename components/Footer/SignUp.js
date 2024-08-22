"use client";

import subscribe from "../../actions/subscribe";
import { useState } from "react";

export default function SignUp() {
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    setIsLoading(true);
    
    const formData = new FormData(event.target);
    
    try {
      await subscribe(formData);
      setSent(true);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div >
      {sent ? (
        <p className="text-xs text-offWhite">Thank you for subscribing to Chat ITP!</p>
      ) : (
        <div>
          <p className="text-xs text-left font-sans mb-4 text-offWhite">Your Email</p>
          <form onSubmit={handleSubmit} className = "flex gap-4">
            <input
              name="email"
              type="email"
              placeholder="Enter Your Email"
              className="text-xs bg-transparent w-[250px] h-[45px] border-[1px] border-blue pl-2 mb-4 text-left rounded-sm text-offWhite"
              required
            />
            <div className="w-fit">
              <button
                type="submit"
                className="text-xs cursor-pointer w-[96px] h-[45px] px-4 bg-blue rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}