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
    <div className="m-auto w-fit max-w-[280px]">
      {sent ? (
        <p className="text-lg">Thank you for subscribing to Chat ITP!</p>
      ) : (
        <div>
          <p className="text-lg text-center">Learn more about Chat ITP:</p>
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="text-lg bg-transparent border-b-[1px] border-white p-[2px] mr-4 mb-4 text-center w-full"
              required
            />
            <div className="w-fit m-auto">
              <button
                type="submit"
                className="cursor-pointer border-2 py-[2px] px-4 border-white text-lg"
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
