"use server";

import { redirect } from "next/navigation";
import clientPromise from "../database/mongodb";
import { FormState, AuthFormSchema } from "../definitions";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "../session";
import { ObjectId } from "mongodb";
import { sendOtpEmail } from "../mail/sendVerificationEmail";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = AuthFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const date = new Date().toISOString().split("T")[0];

  const client = await clientPromise;
  const db = client.db("authDB");

  const existing = await db.collection("users").findOne({ email });
  if (existing) {
    throw new Error("USER_ALREADY_EXISTS");
  }

  await db.collection("users").insertOne({
    email,
    password: hashedPassword,
    name,
    createdAt: date,
  });

  redirect("/login");
}

const signinFormSchema = AuthFormSchema.omit({ name: true });

export async function signin(state: FormState, formData: FormData) {
  const validatedFields = signinFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;

  const client = await clientPromise;
  const db = client.db("authDB");

  const user = await db.collection("users").findOne({ email });
  if (!user) {
    throw new Error("USER_DOESNOT_EXIST");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("INVALID_PASSWORD");
  }

  const id: ObjectId = new ObjectId();
  const idString: string = id.toString();

  await createSession(idString);
  sendOtpEmail(email, "1234");

  redirect("/");
}

export async function signout() {
  await deleteSession();
  redirect("/login");
}
