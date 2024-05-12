"use client";

import subscribe from "../../actions/subscribe";
import { useState } from "react";

export default function SignUp() {
  const [sent, setSent] = useState(false);

  async function handleSubmit(formData) {
    await subscribe(formData);
    setSent(true);
  }

  return (
    <div className="m-auto w-fit max-w-[280px]">
      {sent ? (
        <p className="text-lg">Thank you for subscribing to Chat ITP!</p>
      ) : (
        <div>
          <p className="text-lg text-center">Learn more about Chat ITP:</p>
          <form action={handleSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="text-lg bg-transparent border-b-[1px] border-white p-[2px] mr-4 mb-4 text-center w-full"
            />
            <div className="w-fit m-auto">
              <button
                type="submit"
                className="cursor-pointer border-2 py-[2px] px-4 border-white text-lg"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
