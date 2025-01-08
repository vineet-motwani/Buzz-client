import Image from "next/image";
import React, { useCallback } from "react";
import { SiBuzzfeed } from "react-icons/si";
import { BiHash, BiHomeCircle, BiImage, BiImageAlt, BiMoney, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope } from "react-icons/bs";
import FeedCard from "@/components/FeedCard";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { debugPort } from "process";
import { useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import axios from "axios";

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

  const { user } = useCurrentUser();
  const { tweets = []} = useGetAllTweets();

  const queryClient = useQueryClient();

  const [content, setContent] = React.useState<string>("");

  // const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
  //   return async (event: Event) => {
  //     event.preventDefault();
  //     const file: File | null | undefined = input.files?.item(0);
  //     if (!file) return;

  //     const { getSignedURLForTweet } = await graphqlClient.request(
  //       getSignedURLForTweetQuery,
  //       {
  //         imageName: file.name,
  //         imageType: file.type,
  //       }
  //     );

  //     if (getSignedURLForTweet) {
  //       toast.loading("Uploading...", { id: "2" });
  //       await axios.put(getSignedURLForTweet, file, {
  //         headers: {
  //           "Content-Type": file.type,
  //         },
  //       });
  //       toast.success("Upload Completed", { id: "2" });
  //       const url = new URL(getSignedURLForTweet);
  //       const myFilePath = `${url.origin}${url.pathname}`;
  //       setImageURL(myFilePath);
  //     }
  //   };
  // }, []);

  const handleSelectImage = useCallback(()=>{
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    // const handlerFn = handleInputChangeFile(input);

    // input.addEventListener("change", handlerFn);

    input.click();
  }, []);

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse)=>{
      const googleToken = cred.credential
      
      if(!googleToken)
        return toast.error("Google token not found");
      
      const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery, {token: googleToken});
      toast.success(`Verified Success`);
      // console.log(verifyGoogleToken);

      if(verifyGoogleToken)
        window.localStorage.setItem("__buzz_token", verifyGoogleToken);
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    }, 
    [queryClient]
  );
  
  return ( 
    <div>
        <div className="grid grid-cols-12 h-screen w-screen px-40">
          <div className="col-span-3 pt-1 ml-10 relative">
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
            {user && (
              <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
                {user && user.profileImageURL && <Image src={user?.profileImageURL} width={50} height={50} className="rounded-full" alt="user-image"/>}
                <h3 className="text-xl">{user.firstName} {user.lastName}</h3>
              </div>
            )}
          </div>
          <div className="col-span-6 border-l-[0.25px] border-r-[0.25px] border-gray-600">
            
            <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-800 transition-all cursor-pointer">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                  {user?.profileImageURL && (
                    <Image 
                        src={user?.profileImageURL} alt="user-image" height={50} width={50} className="rounded-full"
                    />
                  )}
                </div>
                <div className="col-span-11">
                  <textarea className="w-full bg-transparent text-xl px-3 border-b border-slate-700" placeholder="Buzz about what's happening..." rows={3}></textarea>
                  <div className="mt-2 flex justify-between items-center w-[95%]">
                    <BiImageAlt onClick={handleSelectImage} className="text-xl" />
                    <button className="bg-[#1d9bf0] font-semibold rounded-full px-4 py-2 mt-1 text-sm">
                      Buzz
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {
              tweets?.map((tweet) => tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet}/> : null)
            }   
          </div>
          <div className="col-span-3 p-5">
            {!user && <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-2xl">New to Buzz?</h1>
              <GoogleLogin onSuccess={ handleLoginWithGoogle }/>
            </div>}
          </div>
        </div>
    </div>
  )
}
