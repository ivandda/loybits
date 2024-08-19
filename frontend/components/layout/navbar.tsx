"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import {usePathname} from "next/navigation";
import {ConnectButton} from "@/components/web3/connect-button";

export default function NavBar() {
  const pathname = usePathname()
  const scrolled = useScroll(50);

  return pathname === '/' ?
    <>
      <div
        className={`fixed top-0 w-full flex justify-center bg-white/0 z-30 transition-all`}
      >
        <div className="mx-5 flex h-36 max-w-screen-xl items-center justify-between w-full text-white">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/coin_logo.png"
              alt="Logo"
              width="80"
              height="80"
              className="mr-2 rounded-sm"
            />
            <p className={"text-6xl"}>Loybits</p>
          </Link>
        </div>
      </div>
    </> :
    <>
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-violet-900/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full text-white">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/coin_logo.png"
              alt="Logo"
              width="40"
              height="40"
              className="mr-2 rounded-sm"
            />
            <p className={"text-2xl"}>Loybits</p>
          </Link>
          <div>
            <ConnectButton/>
          </div>
        </div>
      </div>
    </>;
}
