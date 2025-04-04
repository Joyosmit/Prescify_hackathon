"use client";

import { useState } from "react";

export default function TermsCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="terms"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="w-5 h-5 cursor-pointer"
      />
      <div className="bg-black p-4 rounded-lg">
  <label htmlFor="terms" className="text-white cursor-pointer">
    I agree to the{" "}
    <a href="/terms" className="text-blue-400 underline hover:text-blue-300">
      Terms and Conditions.
    </a>
  </label>
</div>



    </div>
  );
}
