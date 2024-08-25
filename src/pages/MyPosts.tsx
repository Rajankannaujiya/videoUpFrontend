
import {  useRecoilState, useRecoilValueLoadable } from "recoil"
import MyPostComp from "../components/MyPostComp"
import { isRefresh, myPostSelector } from "../state/userRecoil"
import { useEffect, useState } from "react";

function MyPosts() {

  interface MyPost{
    id:string;
    type:string
    title:string;
    video_url?:string;
    image_url?:string;
    description:string;
    createdAt:string;
    updatedAt:string;
}


  const [myPostList, setMyPostList] = useState<MyPost [] | []>([]);

  const { state, contents } = useRecoilValueLoadable(myPostSelector);


  useEffect(()=>{
    if (state === "hasValue") {
      setMyPostList(contents);
    }

  }, [state, contents]);

  const [refreshPage, setRefreshPage] = useRecoilState(isRefresh);

  if (refreshPage) {
    // Refresh the page or re-render the component
    window.location.reload();
    console.log("I got refresh")
    // or
    setRefreshPage(false); // reset the state
  }
  

  return (
    <div className="mt-20 mb-4 flex justify-center">
      <div className="grid grid-cols-1 m-2 p-2 sm:grid-cols-2">
    {/* Card 1 */}
    {myPostList && myPostList.length > 0 ? (
        myPostList.map((mypost: MyPost) => (
          <div key={mypost.id}>
            <MyPostComp
              id={mypost.id}
              type={mypost.type}
              videoUrl={mypost.video_url}
              imageUrl={mypost.image_url}
              title={mypost.title}
              description={mypost.description}
  
            />
          </div>
        ))
      ) : (
        <p className="flex justify-center items-center font-bold font-sarif">No videos available</p>
      )}
    </div>
    </div>
  )
}

export default MyPosts