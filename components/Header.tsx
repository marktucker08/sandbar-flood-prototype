import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="flex flex-wrap gap-5 justify-between py-1.5 pr-20 w-full text-lg text-black bg-white max-md:pr-5 max-md:max-w-full">
      <Image
        src="/SandBar.png"
        className="object-contain shrink-0 max-w-full aspect-[2.56] w-[182px]"
        alt="Logo"
        width={182}
        height={71}
      />
      <nav className="flex flex-wrap gap-10 my-auto max-md:max-w-full">
        <ul className="flex gap-8 self-start whitespace-nowrap">
          <li>
            <a href="#quotes">Quotes</a>
          </li>
          <li>
            <a href="#clients">Clients</a>
          </li>
          <li>
            <a href="#policies">Policies</a>
          </li>
        </ul>
        <div>
          <a href="/sign-in">Login</a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
