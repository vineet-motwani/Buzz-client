import Image from "next/image";
import React from "react";
import { SiBuzzfeed } from "react-icons/si";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope } from "react-icons/bs";
import FeedCard from "@/components/FeedCard";
import { SlOptions } from "react-icons/sl";


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
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
  {
    title: "More",
    icon: <SlOptions />,
  }
];

export default function Home() {
  return ( 
    <div>
        <div className="grid grid-cols-12 h-screen w-screen px-40">
          <div className="col-span-3 pt-1 ml-10">
            <div className="text-4xl h-fit w-fit hover:bg-gray-600 rounded-full p-3 cursor-pointer transition-all">
              <SiBuzzfeed/>
            </div>
            <div className="mt-4 text-xl pr-3">
              <ul>
                {sideBarMenuItems.map(item => (
                  <li className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 w-fit cursor-pointer mt-3" key={item.title}>
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 px-3">  
                <button className="bg-[#1d9bf0] font-semibold text-white rounded-full px-5 py-2 mt-1 w-full text-lg">
                  Buzz
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-6 border-l-[0.25px] border-r-[0.25px] border-gray-600">
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>
            <FeedCard/>          
          </div>
          <div className="col-span-3">
            
          </div>
        </div>
    </div>
  )
}
