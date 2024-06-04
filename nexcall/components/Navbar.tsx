import React from "react";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href={"/"} className="flex items-center gap-1">
        <Image
          src={"/icons/logo.svg"}
          width={32}
          height={32}
          alt="NexCall Logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Next Call
        </p>
      </Link>

      {/**Clerk User Management */}
      <div className="flex-between gap-5">
        {/* Rendering the Clerk Signed Buttons here */}
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* Mobile Nav bar for Small devices */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
