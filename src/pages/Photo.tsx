// import PostComp from "../components/postComp"

import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { isAuthenticated, isRefresh, photoSelector } from "../state/userRecoil";
import { Key, useEffect, useState } from "react";
import PostComp from "../components/postComp";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/common/Spinner";



function Photo() {



  interface PostProps {
    id: string;
    image_url: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    username:string;
  }


  const [refreshPage, setRefreshPage] = useRecoilState(isRefresh);




  const [photoList, setPhotoList] = useState<PostProps[]>([]);

  const { state, contents } = useRecoilValueLoadable(photoSelector);



  const navigate = useNavigate();
  const checkIsAuthenticated = useRecoilValueLoadable(isAuthenticated);

  useEffect(() => {
    // Handle authentication check
    if (checkIsAuthenticated.state === 'hasValue' && !checkIsAuthenticated.contents) {
        // User is not authenticated, redirect to home or login
        navigate('/', { replace: true });
    }
}, [checkIsAuthenticated, navigate]);


  useEffect(() => {
    
    if (state === "hasValue") {
      setPhotoList(contents);
    }

    if (refreshPage) {
      // Refresh the page or re-render the component
      window.location.reload();
      // or
      setRefreshPage(false); // reset the state
    }

  }, [state, contents,refreshPage,setRefreshPage]);


  return (
    <div className="h-screen flex flex-col items-center  p-4 overflow-x-hidden overflow-y-scroll scrollbar-hide mt-12">
 

 {photoList.length > 0 ? (
        photoList.map((image: PostProps, index: Key | null | undefined) => (
          <div key={index}>
            <PostComp
              id={image.id}
              type="image"
              imageUrl={image.image_url}
              title={image.title}
              description={image.description}
              createdAt={image.created_at}
              updatedAt={image.updated_at}
              username={image.username}
            />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center min-h-screen">
    <Spinner />
</div>
      )}

   </div>
  )
}

export default Photo