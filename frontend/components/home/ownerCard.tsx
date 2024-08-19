import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default function OwnerCard({
  title,
  description,
  demo,
  cost
}: {
  title: string;
  description: string;
  demo: ReactNode;
  cost: number;
}) {
  return (
    <div
      className={`relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md px-4`}
    >
      <div className="flex h-[12rem] items-center justify-center">{demo}</div>
      <div className="mx-auto max-w-lg text-center">
        <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent [text-wrap:balance] md:text-3xl md:font-normal">
          {title}
        </h2>
        <div className="prose-sm mt-3 leading-normal text-gray-500 [text-wrap:balance] md:prose">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a
                  target="_blank"
                  {...props}
                  className="font-medium text-gray-800 underline transition-colors"
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  {...props}
                  // @ts-ignore (to fix "Received `true` for a non-boolean attribute `inline`." warning)
                  inline="true"
                  className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800"
                />
              ),
            }}
          >
            {description}
          </ReactMarkdown>
        </div>
        <div className={"flex justify-between p-4"}>
          <div className={"flex items-center"}>
            <p className={'text-black text-lg'}>{cost} </p>
            <Image className={"h-[30px] p-1"}
              src="/coin_logo.png"
              alt="Logo"
              width="30"
              height="30"
            />
          </div>
          <div>

          </div>

          {/*<button*/}
          {/*  className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:border-transparent hover:bg-pink-600"*/}
          {/*  onClick={onClaim}*/}
          {/*  rel="noopener noreferrer"*/}
          {/*>*/}
          {/*  <p> Claim </p>*/}
          {/*</button>*/}
        </div>
      </div>
    </div>
  );
}
