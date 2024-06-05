"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamTheme, StreamCall } from "@stream-io/video-react-sdk";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import { useGetCallById } from "@/hooks/useGetCallById";
import Loader from "@/components/Loader";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  // State variable to check the set up is complete
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  // Destructuring the user details using clerk
  const { user, isLoaded } = useUser();

  // Destructuring the hook details from the useGetCallById hook
  const { call, isCallLoading } = useGetCallById(id);

  // Showing the loader if the call is not loaded
  if (!isLoaded || isCallLoading) return <Loader />;
  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {/* Checking if setup is completed navigate to meeting room */}
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
