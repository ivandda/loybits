import { Twitter } from "@/components/shared/icons";
import Image from "next/image";

export default async function Home() {

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <a
          href="https://x.com/LoybitsToken/status/1824927734461555129"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <Twitter className="h-5 w-5 text-[#1d9bf0]" />
          <p className="text-sm font-semibold text-[#1d9bf0]">
            Introducing Loybits
          </p>
        </a>
        <h1
          className="animate-fade-up bg-gradient-to-br from-white to-stone-100 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Revolutionizing Customer Loyalty
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-200 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Loybits is a blockchain-based platform built on Polkadot, leveraging the power of this next-generation blockchain to create a transparent, secure, and efficient loyalty ecosystem.
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <a
            className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:border-gray-500"
            href={"/user_view"}
            rel="noopener noreferrer"
          >
            <Image
              src="/user.webp"
              alt="Logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            />
            <p>View Project as User</p>
          </a>
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            href={"/acquirer_view"}
            rel="noopener noreferrer"
          >
            <Image
              src="/business.webp"
              alt="Logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            />
            <p>
              View Project as Business Owner
            </p>
          </a>
        </div>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <a
            className="group flex items-center justify-center space-x-2 rounded-full border border-pink-500 bg-pink-600 px-5 py-2 text-sm text-white transition-colors hover:border-pink-900"
            href={"/AI"}
            rel="noopener noreferrer"
          >
            <Image
              src="/MrLoy.PNG"
              alt="Logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            />
            <p>Chat with Mr Loy</p>
          </a>
        </div>
      </div>
    </>
  );
}
