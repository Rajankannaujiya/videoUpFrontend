

import { useNavigate, useParams } from "react-router-dom"
import FullPostComp from "../components/FullPostComp"
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { isAuthenticated, isRefresh, singleVideoSelector } from "../state/userRecoil";
import { useEffect, useState } from "react";
import Spinner from "../components/common/Spinner";



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


  const navigate = useNavigate();
  const checkIsAuthenticated = useRecoilValueLoadable(isAuthenticated);

  useEffect(() => {
    // Handle authentication check
    if (checkIsAuthenticated.state === 'hasValue' && !checkIsAuthenticated.contents) {
        // User is not authenticated, redirect to home or login
        navigate('/', { replace: true });
    }
}, [checkIsAuthenticated, navigate]);


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
        <div className="flex items-center justify-center min-h-screen">
    <Spinner />
</div>
      )}
      </div>
    </div>
  )
}

export default FullPost