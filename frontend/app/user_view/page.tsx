import RewardList from "@/components/web3/rewards";

export default async function UserMain() {

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1 className="animate-fade-up bg-gradient-to-br from-white to-stone-400 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
          Loybits Rewards
        </h1>
      </div>
      <RewardList/>
    </>
  );
}
