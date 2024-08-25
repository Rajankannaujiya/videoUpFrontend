// import PostComp from "../components/postComp"

import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { isRefresh, photoSelector } from "../state/userRecoil";
import { Key, useEffect, useState } from "react";
import PostComp from "../components/postComp";



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

if (refreshPage) {
  // Refresh the page or re-render the component
  window.location.reload();
  // or
  setRefreshPage(false); // reset the state
}


  const [photoList, setPhotoList] = useState<PostProps[]>([]);

  const { state, contents } = useRecoilValueLoadable(photoSelector);

  useEffect(() => {
    
    if (state === "hasValue") {
      setPhotoList(contents);
    }

  }, [state, contents]);


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
        <p className="flex justify-center items-center font-bold font-sarif">No videos available</p>
      )}

   </div>
  )
}

export default Photo