
import { useRecoilValue } from "recoil";
import PostComp from "../components/postComp";
import { videosSelector } from "../state/userRecoil";
import { Key } from "react";






function Videos() {

  interface PostProps {
    id: string;
    video_url: string;
    title: string;
    description: string;
    created_at:string;
    updated_at:string
  }

  const videos = useRecoilValue<PostProps[] | []>(videosSelector);
 



  return (
    <div className="h-screen flex flex-col items-center p-4 overflow-x-hidden overflow-y-scroll scrollbar-hide mt-12">
      {videos.length > 0 ? (
        videos.map((video: PostProps, index: Key | null | undefined) => (
          <div key={index}>
            <PostComp
              id={video.id}
              videoUrl={video.video_url}
              title={video.title}
              description={video.description}
              createdAt={video.created_at}
              updatedAt ={video.updated_at}
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