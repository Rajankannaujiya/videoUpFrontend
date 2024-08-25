import { useRecoilState, useRecoilValueLoadable} from "recoil";
import PostComp from "../components/postComp";
import { useEffect, useState } from "react";
import { isRefresh, videosSelector } from "../state/userRecoil";
import { Key } from "react";



function Videos() {
  interface PostProps {
    id: string;
    video_url: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    username:string
  }

  const [videoList, setVideoList] = useState<PostProps[]>([]);

  const { state, contents } = useRecoilValueLoadable(videosSelector);

  const [refreshPage, setRefreshPage] = useRecoilState(isRefresh);

  if (refreshPage) {
    // Refresh the page or re-render the component
    window.location.reload();
    // or
    setRefreshPage(false); // reset the state
  }
  

  useEffect(() => {
    
    if (state === "hasValue") {
      setVideoList(contents);
    }

  }, [state, contents]);

  return (
    <div className="h-screen flex flex-col items-center p-4 overflow-x-hidden overflow-y-scroll scrollbar-hide mt-12">
      {videoList.length > 0 ? (
        videoList.map((video: PostProps, index: Key | null | undefined) => (
          <div key={index}>
            <PostComp
              id={video.id}
              type="video"
              videoUrl={video.video_url}
              title={video.title}
              description={video.description}
              createdAt={video.created_at}
              updatedAt={video.updated_at}
              username={video.username}
            />
          </div>
        ))
      ) : (
        <p className="flex justify-center items-center font-bold font-sarif">No videos available</p>
      )}
    </div>
  );
}

export default Videos;