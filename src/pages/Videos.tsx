import { useRecoilState, useRecoilValueLoadable} from "recoil";
import PostComp from "../components/postComp";
import { useEffect, useState } from "react";
import { isAuthenticated, isRefresh, videosSelector } from "../state/userRecoil";
import { Key } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/common/Spinner";



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
      setVideoList(contents);
    }

    if (refreshPage) {
      // Refresh the page or re-render the component
      window.location.reload();
      // or
      setRefreshPage(false); // reset the state
    }

  }, [state, contents,refreshPage,setRefreshPage]);

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
        <div className="flex items-center justify-center min-h-screen">
    <Spinner />
</div>
      )}
    </div>
  );
}

export default Videos;