"use server";

import { redirect } from "next/navigation";
import clientPromise from "../database/mongodb";
import { FormState, AuthFormSchema, OtpFormSchema } from "../definitions";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "../session";
import { ObjectId } from "mongodb";
import { sendOtpEmail } from "../mail/sendVerificationEmail";
import { randomInt } from "crypto";

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

  if (existing && existing.isVerified) {
    return { error: "USER_ALREADY_EXISTS" };
  }

  const otp = randomInt(100000, 999999);
  const otpExpiry = Date.now() + 1000 * 60 * 5;

  if (existing && !existing.isVerified) {
    await db
      .collection("users")
      .findOneAndUpdate({ email }, { $set: { otp, otpExpiry } });
    sendOtpEmail(email, otp);
    return { message: "OK", email };
  }

  await db.collection("users").insertOne({
    email,
    password: hashedPassword,
    name,
    createdAt: date,
    otp,
    otpExpiry,
    isVerified: false,
  });

  sendOtpEmail(email, otp);
  return { message: "OK", email };
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

  try {
    const { email, password } = validatedFields.data;

    const client = await clientPromise;
    const db = client.db("authDB");

    const user = await db.collection("users").findOne({ email });
    if (!user || !user.isVerified) {
      return { error: "USER_DOESNOT_EXIST" };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return { error: "INVALID_PASSWORD" };
    }

    await createSession(user._id.toString());

    redirect("/");
  } catch (error) {
    console.error(error);
    return { error: "SOMETHING_WENT_WRONG" };
  }
}

export async function signout() {
  try {
    await deleteSession();
    redirect("/login");
  } catch (error) {
    console.error(error);
    return { error: "SOMETHING_WENT_WRONG" };
  }
}

export async function verifyOtp(state: FormState, formData: FormData) {
  const validatedFields = OtpFormSchema.safeParse({
    email: formData.get("email"),
    otp: formData.get("otp"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const { email, otp } = validatedFields.data;

    const client = await clientPromise;
    const db = client.db("authDB");

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return { error: "USER_DOESNOT_EXIST" };
    }

    const currentTime = Date.now();

    if (currentTime > user.otpExpiry) {
      return { error: "OTP_EXPIRED" };
    }

    if (Number(otp) === user.otp) {
      await db
        .collection("users")
        .findOneAndUpdate(
          { email },
          { $unset: { otp: "", otpExpiry: "" }, $set: { isVerified: true } }
        );

      redirect("/login");
    }
  } catch (error) {
    console.error(error);
    return { error: "SOMETHING_WENT_WRONG" };
  }
}
