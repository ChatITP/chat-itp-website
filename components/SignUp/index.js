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
    <div>
      {sent ? (
        <p>Thank you for subscribing to Chat ITP!</p>
      ) : (
        <>
          <h1>Learn more about Chat ITP</h1>
          <form action={handleSubmit}>
            <input name="email" type="email" placeholder="Email" />
            <button type="submit cursor-pointer">Subscribe</button>
          </form>
        </>
      )}
    </div>
  );
}
