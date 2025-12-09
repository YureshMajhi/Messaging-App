import z from "zod";

export const AuthFormSchema = z.object({
  name: z.string().min(2, { error: "Name must be atleast 2 characters long." }).trim(),
  email: z.email({ error: "Please enter a valid email" }).trim(),
  password: z
    .string()
    .min(8, { error: "Be atleast 8 characters long." })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character.",
    })
    .trim(),
});

export const OtpFormSchema = z.object({
  email: z.email({ error: "Something went wrong. Please try signing up again." }),
  otp: z
    .string()
    .regex(/^\d+$/, { error: "Invalid OTP" })
    .length(6, { error: "OTP must be atleast 6 characters long" }),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      email?: string;
    }
  | undefined;

export type OtpState =
  | {
      errors?: {
        otp?: string[];
        email?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  userId: string;
  userName: string;
  expiresAt: Date;
};

export type User = {
  _id: string;
  name: string;
  email: string;
};

export type UserTable = {
  users: User[];
};

export type FriendList = string[] | { error: string };
