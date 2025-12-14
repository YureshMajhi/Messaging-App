import z from "zod";

export const AuthFormSchema = z
  .object({
    username: z
      .string()
      .min(2, { error: "Username must be atleast 2 characters long." })
      .trim(),
    email: z.email({ error: "Please enter a valid email" }).trim(),
    password: z
      .string()
      .min(8, { error: "Password must be atleast 8 characters long." })
      .regex(/[a-zA-Z]/, { error: "Password must contain at least one letter." })
      .regex(/[0-9]/, { error: "Password contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        error: "Password must contain at least one special character.",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords donot match.",
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
  username: string;
  email: string;
};

export type UserWithoutEmail = Omit<User, "email">;

export type UserTable = {
  users: User[];
};

export type FriendList = UserWithoutEmail[] | { error: string };

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
  };
  content: string;
  imageUrl?: string;
  likes: number;
  comments: Array<{
    id: string;
    author: { name: string; avatar: string | null };
    content: string;
    time: string;
  }>;
  liked: boolean;
  createdAt: string;
}

export interface FriendRequest {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
    mutualFriends: number;
  };
}
