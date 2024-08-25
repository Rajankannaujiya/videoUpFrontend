

import { useParams } from "react-router-dom"
import FullPostComp from "../components/FullPostComp"
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { isRefresh, singleVideoSelector } from "../state/userRecoil";
import { useEffect, useState } from "react";



function FullPost() {

  interface FullPostCompProps{
    id:string;
    type?:string;
    title:string;
    video_url?:string;
    image_url?:string;
    description:string;
    publishedDate:string;
    updatedDate:string;
    username:string
}

  const {id} = useParams();  

  const [refreshPage, setRefreshPage] = useRecoilState(isRefresh);

if (refreshPage) {
  // Refresh the page or re-render the component
  window.location.reload();
  // or
  setRefreshPage(false); // reset the state
}


  const [video,setVideo]= useState<FullPostCompProps[] | []>([])

  const {state, contents} = useRecoilValueLoadable(singleVideoSelector(id ?? ""))
  
  useEffect(()=>{
 
    if (state === "hasValue") {
      console.log("this is the content")
      setVideo(contents);
    }


  },[state,contents])

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex justify-center lg:w-[80%] ">
      {video.length===1 ? (
        video.map((onePost: FullPostCompProps) => (
          <div key={onePost.id}>
            <FullPostComp title={onePost.title} description={onePost.description}
            video_url={onePost.video_url} username={onePost.username} updatedDate={onePost.updatedDate} publishedDate={onePost.publishedDate}   />
          </div>
        ))
      ) : (
        <p className="flex justify-center items-center font-bold font-sarif">No videos available</p>
      )}
      </div>
    </div>
  )
}

export default FullPost