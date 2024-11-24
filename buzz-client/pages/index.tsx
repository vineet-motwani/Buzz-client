import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
import { SiBuzzfeed } from "react-icons/si";
import { BiHomeCircle } from "react-icons/bi";

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
];

export default function Home() {
  return ( 
    <div>
        <div className="grid grid-cols-12 h-screen w-screen px-56">
          <div className="col-span-3 pt-8 px-4">
            <div className="text-4xl h-fit w-fit hover:bg-gray-600 rounded-full p-2 cursor-pointer transition-all">
              <SiBuzzfeed/>
            </div>
            <div className="mt-4 text-2xl font-bold">
              <ul>
                {sideBarMenuItems.map(item => (
                  <li className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-lg px-2 py-4" key={item.title}>
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-6 border-l-[0.25px] border-r-[0.25px] border-gray-400"></div>
          <div className="col-span-3"></div>
        </div>
    </div>
  )
}
