
import {  useRecoilState, useRecoilValueLoadable } from "recoil"
import MyPostComp from "../components/MyPostComp"
import { isAuthenticated, isRefresh, myPostSelector } from "../state/userRecoil"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/common/Spinner";

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

const [refreshPage, setRefreshPage] = useRecoilState(isRefresh);
  const [myPostList, setMyPostList] = useState<MyPost [] | []>([]);

  const { state, contents } = useRecoilValueLoadable(myPostSelector);


  const navigate = useNavigate();
  const checkIsAuthenticated = useRecoilValueLoadable(isAuthenticated);

  useEffect(() => {
    // Handle authentication check
    if (checkIsAuthenticated.state === 'hasValue' && !checkIsAuthenticated.contents) {
        // User is not authenticated, redirect to home or login
        navigate('/', { replace: true });
    }
}, [checkIsAuthenticated, navigate]);



  useEffect(()=>{
    if (state === "hasValue") {
      console.log(contents)
      setMyPostList(contents)
    }

    if (refreshPage) {
      window.location.reload();
      // Logic to re-render the component or refresh data
      console.log("Refreshing...");
      setRefreshPage(false); // Reset the state to avoid endless loop
    }

  }, [state, contents,refreshPage,setRefreshPage]);


  

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
        <div className="flex items-center justify-center min-h-screen">
        <Spinner />
    </div>
      )}
    </div>
    </div>
  )
}

export default MyPosts