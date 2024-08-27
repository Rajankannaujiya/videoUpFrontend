import { Key, useEffect, useState } from "react";
import PostComp from "../components/postComp";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { isRefresh, postSelector } from "../state/userRecoil";


interface PostProps{
  id:string;
  type:string;
  title:string;
  video_url?:string;
  image_url?:string;
  description:string;
  createdAt:string;
  updatedAt:string;
  username:string;
}


export default function Posts() {

  const [postList,setPostList] = useState<PostProps[]>([]);
  const { state, contents } = useRecoilValueLoadable(postSelector);

  const [refreshPage, setRefreshPage] = useRecoilState(isRefresh);



  useEffect(()=>{

    if(state == "hasValue"){
      setPostList(contents)
    }
    if (refreshPage) {
      window.location.reload();
      // Logic to re-render the component or refresh data
      console.log("Refreshing...");
      setRefreshPage(false); // Reset the state to avoid endless loop
    }

  },[state, contents,refreshPage,setRefreshPage])

  return (
    <div className="h-screen flex flex-col items-center  p-4 overflow-x-hidden overflow-y-scroll scrollbar-hide mt-12">
       {postList.length>0 ? 
       postList.map((post:PostProps,indedx:Key | null | undefined)=>(
      post.video_url ? <div key={indedx}>
        <PostComp  id={post.id} type={post.type} videoUrl={post.video_url} description={post.description} createdAt={post.createdAt} updatedAt={post.updatedAt} title={post.title} username={post.username}/>
       </div> :  <div key={indedx}>
       <PostComp  id={post.id} type={post.type} imageUrl={post.image_url} description={post.description} createdAt={post.createdAt} updatedAt={post.updatedAt} title={post.title} username={post.username}/>
       </div>
      )):<p>No post found</p>}
    

      </div>
  )
}
