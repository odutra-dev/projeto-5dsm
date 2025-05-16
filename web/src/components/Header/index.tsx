import React from "react";
import Link from "next/link";
import Image from "next/image";

type HeaderProps = {
  icon: string;
  title: string;
  icon2?: string;
  link: string;
  link2?: string;
};

export default function Header(props: HeaderProps) {
  return (
    <header className="bg-primary h-32">
      <div className="flex justify-between items-center px-6 md:px-12 h-full">
        <Link
          href={props.link}
          className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center"
        >
          <Image
            className="w-6 h-6"
            src={"/" + props.icon + ".svg"}
            alt="Carrinho de compras"
            width={24}
            height={24}
          />
        </Link>
        <h1 className="text-3xl font-bold text-secondary">{props.title}</h1>
        {props.link2 ? (
          <Link
            href={props.link2}
            className="cursor-pointer w-12 h-12 rounded-full bg-primary-foreground border-1 border-primary-text flex justify-center items-center"
          >
            <Image
              className=""
              src={"/" + props.icon2 + ".svg"}
              alt="Carrinho de compras"
              width={24}
              height={24}
            />
          </Link>
        ) : (
          <div className="w-12 h-12"></div>
        )}
      </div>
    </header>
  );
}
