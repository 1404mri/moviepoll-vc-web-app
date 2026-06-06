import "server-only";

import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getRequiredEnv } from "@/lib/env";

const cookieName = "movie_poll_voter";
const maxAge = 60 * 60 * 24 * 365;

function sign(value: string) {
  return createHmac("sha256", getRequiredEnv("COOKIE_SECRET")).update(value).digest("base64url");
}

function serialize(value: string) {
  return `${value}.${sign(value)}`;
}

function verify(serialized: string | undefined) {
  if (!serialized) {
    return null;
  }

  const separatorIndex = serialized.lastIndexOf(".");
  if (separatorIndex === -1) {
    return null;
  }

  const value = serialized.slice(0, separatorIndex);
  const signature = serialized.slice(separatorIndex + 1);
  const expectedSignature = sign(value);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  return value;
}

export async function getOrCreateVoterId() {
  const cookieStore = await cookies();
  const existingVoterId = verify(cookieStore.get(cookieName)?.value);

  if (existingVoterId) {
    return existingVoterId;
  }

  const voterId = randomUUID();
  cookieStore.set(cookieName, serialize(voterId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge,
    path: "/"
  });

  return voterId;
}

export async function getVoterId() {
  const cookieStore = await cookies();
  return verify(cookieStore.get(cookieName)?.value);
}
