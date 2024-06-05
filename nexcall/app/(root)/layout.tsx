import { ReactNode } from "react";
import { Metadata } from "next";
// Importing the stream video provider from providers
import StreamVideoProvider from "@/providers/StreamClientProvider";


export const metadata: Metadata = {
  title: "NexCall",
  description: "A Full Stack Video Conferencing app created by Next JS",
  icons: {
    icon: "/icons/logo.svg",
  },
};
const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
