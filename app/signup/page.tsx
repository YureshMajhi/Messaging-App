"use client";

import { useActionState, useEffect, useState } from "react";
import { signup, verifyOtp } from "../lib/actions/auth";

export default function SignUp() {
  const [formState, formAction, pending] = useActionState(signup, undefined);
  const [otpState, otpAction] = useActionState(verifyOtp, undefined);

  return (
    <>
      <form action={formAction}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Name" />
          {formState?.errors?.name && (
            <p className="text-red-500">{formState.errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" />
          {formState?.errors?.email && (
            <p className="text-red-500">{formState.errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" placeholder="Password" />
          {formState?.errors?.password && (
            <div>
              <p className="text-red-500">Password must:</p>
              <ul>
                {formState.errors.password.map((error) => (
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

      {formState?.email && formState.message === "OK" && (
        <form action={otpAction}>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={() => {}}
            />
            {otpState?.errors?.email && (
              <p className="text-red-500">{otpState.errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d{6}"
              id="email"
              placeholder="Enter OTP"
              name="otp"
            />
            {otpState?.errors?.otp &&
              otpState?.errors?.otp.map((otp, i) => (
                <p key={i} className="text-red-500">
                  {otp}
                </p>
              ))}
          </div>

          <button type="submit">Continue</button>
        </form>
      )}
    </>
  );
}
