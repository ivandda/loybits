import Card from "@/components/home/card";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";

export default async function UserMain() {

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1 className="animate-fade-up bg-gradient-to-br from-white to-stone-400 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
          Loybits Rewards
        </h1>
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {rewards.map(({ title, description, demo, cost, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            cost={cost}
            demo={
              title === "Beautiful, reusable components" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
            large={large}
          />
        ))}
      </div>
    </>
  );
}

const rewards = [
  {
    title: "25% Discount",
    description:
      "This is a 25% discount at a small business in Belgrano",
    cost: 10000,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Discount" src="/discount.png" width={180} height={180} />
      </div>
    ),
  },
  {
    title: "10k pesos Giftcard",
    description:
      "This is a giftcard 10k in a small business in Palermo",
    cost: 10000,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Giftcard" src="/gift.webp" width={180} height={180} />
      </div>
    ),
  },
  {
    title: "2 course Meal",
    description:
      "This is a a dinner at a beatiful dinner in Puerto Madero",
    cost: 50000,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="gastronomy" src="/gastronomy.webp" width={180} height={180} />
      </div>
    ),
  },
  {
    title: "Malbec Wine",
    description:
      "Take one of our nicest wines coming to our Bodega.",
    cost: 20000,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="beverage" src="/beverage.png" width={180} height={180} />
      </div>
    ),
  },
  {
    title: "Weekend trip",
    description:
      "Take a 2 day trip to our hotel in the small town of Jofre",
    cost: 400000,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="trip" src="/trip.webp" width={180} height={180} />
      </div>
    ),
  },
];
