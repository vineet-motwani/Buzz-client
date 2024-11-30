import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
import { SiBuzzfeed } from "react-icons/si";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope } from "react-icons/bs";

const inter = Inter({ subsets: ["latin"] });

interface BuzzSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sideBarMenuItems: BuzzSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: "Message",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
];

export default function Home() {
  return ( 
    <div className={inter.className}>
        <div className="grid grid-cols-12 h-screen w-screen px-56">
          <div className="col-span-3 pt-8 px-4">
            <div className="text-4xl h-fit w-fit hover:bg-gray-600 rounded-full p-3 cursor-pointer transition-all">
              <SiBuzzfeed/>
            </div>
            <div className="mt-4 text-2xl font-semibold">
              <ul>
                {sideBarMenuItems.map(item => (
                  <li className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 w-fit cursor-pointer mt-3" key={item.title}>
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-[#1d9bf0] text-white rounded-full px-5 py-2 mt-5">
                Tweet
              </button>
            </div>
          </div>
          <div className="col-span-6 border-l-[0.25px] border-r-[0.25px] border-gray-400"></div>
          <div className="col-span-3"></div>
        </div>
    </div>
  )
}
