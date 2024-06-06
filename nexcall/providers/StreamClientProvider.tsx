"use client";
import { ReactNode, useState, useEffect } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  //State to declare the video client
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  // Getting the logged in user details from clerk Authentication using useUser hook from clerk
  const { user, isLoaded } = useUser();
  // Useeffect hook to initialize the user
  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream API Key missing");

    // Configuring the user details using Clerk here
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.fullName || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });
    setVideoClient(client);
  }, [user, isLoaded]);

  // If no video client is present, show a loader
  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
