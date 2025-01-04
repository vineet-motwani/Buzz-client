import React from 'react';
import Image from 'next/image';
import { BiMessageRounded, BiUpload } from 'react-icons/bi';
import { FaRetweet } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';

const FeedCard:React.FC = () => {
    return <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-800 transition-all cursor-pointer">
        <div className="grid grid-cols-12 gap-3">
            <div className="col-span-1">
                <Image src="https://avatars.githubusercontent.com/u/95994219?v=4" alt="user-img" height={50} width={50} className="rounded-full"/>
            </div>
            <div className="col-span-11">
                <h5>Vineet Motwani</h5>
                <p>React Developer next application 
                   Lorem ipsum dolor sit amet consectetur 
                   adipisicing elit. Repellendus mollitia 
                   culpa aspernatur, vitae deleniti 
                   ipsum minima nam excepturi 
                   voluptates distinctio, et 
                   dolorem tempore suscipit dolor 
                   libero sit soluta quidem. Hic?
                </p>
                <div className="flex justify-between mt-3 text-xl items-center w-[80%]">
                    <div>
                        <BiMessageRounded/>
                    </div>
                    <div>
                        <FaRetweet/>
                    </div>
                    <div>
                        <AiOutlineHeart/>
                    </div>
                    <div>
                        <BiUpload/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default FeedCard;