"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

// Declaring the .env variables here
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;
/**
 * Functional Component Provides the Stream token to the app
 */
export const tokenProvider = async () => {
  // Fetching the current user details from clerk authenticator
  const user = await currentUser();

  //Checking details if they are present
  if (!user) throw new Error("User is not logged in");
  if (!apiKey) throw new Error("No API Key");
  if (!apiSecret) throw new Error("No API Secret");

  // In order the server side we should install node sdk for the Project
  const client = new StreamClient(apiKey, apiSecret);

  // Expiry time for the user - Copied from stream - Token valid for one hour
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  // Check the when the token issued
  const issued = Math.floor(Date.now() / 1000) - 60;

  const token = client.createToken(user.id, exp, issued);

  return token;
};
