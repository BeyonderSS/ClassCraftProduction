"use client";
import Head from "next/head";
import Image from "next/image";
import CCHeader from "./CCNavbar";
import CCHero from "./CCHero";
import CCFeature from "./CCFeature";
import CCAboutCC from "./CCAboutCC";
import CCTeam from "./CCTeam";
import CCFAQ from "./CCFAQ";

import CCExplore from "./CCExplore";
import Footer from "./Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const {data:session}= useSession()
  const router =useRouter()
  if(session){
    router.replace('/dashboard')
  }
  return (
    <div className="bg-gradient-to-tr from-blue-400 to-purple-900">
      <Head>
        <title>ClassCraft Platform</title>
      </Head>
      <CCHeader />
      <CCHero /> {/* Done */}
      <div className="antialiased bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"></div>
      <CCFeature /> {/* Done */}
      {/* <CCBanner /> Done */}
      <CCAboutCC /> {/* Done */}
      {/* <CCPricing />  */}
      <CCTeam /> {/* Done */}
      <CCExplore />
      <CCFAQ /> {/* Done */}
      {/* <div className="min-h-screen  bg-gradient-to-br from-[#4d62e8] to-[#b2cde4]  flex-col  items-center">
            </div> */}
      <Footer />
    </div>
  );
}
