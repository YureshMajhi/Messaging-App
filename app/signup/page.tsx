"use client";

import { useActionState, useState } from "react";
import { signup, verifyOtp } from "../lib/actions/auth";

export default function SignUp() {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <>
      <form action={action}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Name" />
          {state?.errors?.name && <p className="text-red-500">{state.errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" />
          {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" placeholder="Password" />
          {state?.errors?.password && (
            <div>
              <p className="text-red-500">Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li className="text-red-500" key={error}>
                    - {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button type="submit">Sign Up</button>
      </form>

      <form
        action={async (formData: FormData) => {
          const otpValue = formData.get("otp");
          if (!otpValue) return;

          const otp = Number(otpValue);
          const id = state?.message; // or email

          if (!id) return;

          const result = await verifyOtp({ otp, id });
          console.log(result);
        }}
      >
        <input type="number" name="otp" placeholder="OTP" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
