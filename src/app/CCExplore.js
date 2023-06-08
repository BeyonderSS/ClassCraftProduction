import Image from "next/image";
import Link from "next/link";
import React from "react";

const CCExplore = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between  py-10 px-5">
      <div className="md:w-1/2 mb-10 md:mb-0">
        <Image
          src="/people-flying-animate.svg"
          alt="People flying"
          width={500}
          height={500}
        />
      </div>
      <div className="md:w-1/2 text-gray-300">
        <h1 className="text-5xl font-bold mb-5">
          Dive in and explore the new possibilities with revamped education
          system with ClassCraft.
        </h1>
        <p className="text-xl mb-5">
          An online Educational Platform for Every type of institute. Login Now.
        </p>
        <Link href="/Login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CCExplore;
