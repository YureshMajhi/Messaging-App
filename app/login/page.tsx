"use client";

import { useActionState } from "react";
import { signin } from "../lib/actions/auth";
import Link from "next/link";

export default function Login() {
  const [state, action, pending] = useActionState(signin, undefined);

  return (
    <>
      <form action={action}>
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
        <button type="submit">Login</button>
        {state?.error && <p className="text-red-500">{state.error}</p>}
      </form>

      <div>
        <p>Don't have an account?</p>
        <button>
          <Link href={"/signup"}>Sign Up</Link>
        </button>
      </div>
    </>
  );
}
