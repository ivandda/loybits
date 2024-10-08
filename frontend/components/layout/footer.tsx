import { BuyMeACoffee } from "../shared/icons";

export default function Footer() {
  return (
    <div className="absolute w-full py-5 text-center">
      <p className="text-gray-100">
        A project by{" "}
        <a
          className="font-semibold text-gray-50 underline-offset-4 transition-colors hover:underline"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rocio Ferreiro & Ivan Dominguez de Alzaga
        </a>
      </p>
    </div>
  );
}
