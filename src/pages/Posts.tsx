import { Key, useEffect, useState } from "react";
import PostComp from "../components/postComp";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { isAuthenticated, isRefresh, postSelector } from "../state/userRecoil";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/common/Spinner";


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
  const navigate = useNavigate();

  const [postList,setPostList] = useState<PostProps[]>([]);
  const { state, contents } = useRecoilValueLoadable(postSelector);

  const [refreshPage, setRefreshPage] = useRecoilState(isRefresh);

  const checkIsAuthenticated = useRecoilValueLoadable(isAuthenticated);
  
  useEffect(() => {
    // Handle authentication check
    if (checkIsAuthenticated.state === 'hasValue' && !checkIsAuthenticated.contents) {
        // User is not authenticated, redirect to home or login
        navigate('/', { replace: true });
    }
}, [checkIsAuthenticated, navigate]);



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

  },[state, contents,refreshPage,setRefreshPage ,])

  return (
    <div className="h-screen flex flex-col items-center  p-4 overflow-x-hidden overflow-y-scroll scrollbar-hide mt-12">
       {postList.length>0 ? 
       postList.map((post:PostProps,indedx:Key | null | undefined)=>(
      post.video_url ? <div key={indedx}>
        <PostComp  id={post.id} type={post.type} videoUrl={post.video_url} description={post.description} createdAt={post.createdAt} updatedAt={post.updatedAt} title={post.title} username={post.username}/>
       </div> :  <div key={indedx}>
       <PostComp  id={post.id} type={post.type} imageUrl={post.image_url} description={post.description} createdAt={post.createdAt} updatedAt={post.updatedAt} title={post.title} username={post.username}/>
       </div>
      )):  <div className="flex items-center justify-center min-h-screen">
      <Spinner />
  </div>
    }
    

      </div>
  )
}
