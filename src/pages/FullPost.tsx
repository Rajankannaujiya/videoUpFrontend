import { useNavigate, useParams } from "react-router-dom";
import FullPostComp from "../components/FullPostComp";
import { useRecoilValueLoadable } from "recoil";
import { isAuthenticated, singleImageSelector, singleVideoSelector } from "../state/userRecoil";
import { useEffect, useState } from "react";
import Spinner from "../components/common/Spinner";

function FullPost() {
  interface FullPostCompProps {
    id: string;
    type?: string;
    title: string;
    video_url?: string;
    duration:string;
    image_url?: string;
    description: string;
    publishedDate: string;
    updatedDate: string;
    username: string;
  }

  const { id } = useParams();

  const [image, setImage] = useState<FullPostCompProps[] | []>([]);
  const [video, setVideo] = useState<FullPostCompProps[] | []>([]);

  const imageLoadable = useRecoilValueLoadable(singleImageSelector(id ?? ""));
  const { state: imageState, contents: imageContents } = imageLoadable;

  // Load video data
  const videoLoadable = useRecoilValueLoadable(singleVideoSelector(id ?? ""));
  const { state: videoState, contents: videoContents } = videoLoadable;

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
    if (imageState === "hasValue") {
      console.log("Image content loaded", imageContents);
      setImage(imageContents);
    }
  }, [imageState, imageContents]);

  // Handle video data
  useEffect(() => {
    if (videoState === "hasValue") {
      console.log("Video content loaded", videoContents);
      setVideo(videoContents);
    }
  }, [videoState, videoContents]);


  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex justify-center lg:w-[80%]">
        {image && image.length > 0 ? (
          image.map((onePost: FullPostCompProps) => (
            <div key={onePost.id}>
              <FullPostComp
                title={onePost.title}
                description={onePost.description}
                image_url={onePost.image_url}
                username={onePost.username}
                updatedDate={onePost.updatedDate}
                publishedDate={onePost.publishedDate}
              />
            </div>
          ))
        ) : video && video.length > 0 ? (
          video.map((oneVideo: FullPostCompProps) => (
            <div key={oneVideo.id}>
              <FullPostComp
                title={oneVideo.title}
                description={oneVideo.description}
                video_url={oneVideo.video_url}
                username={oneVideo.username}
                updatedDate={oneVideo.updatedDate}
                publishedDate={oneVideo.publishedDate}
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

export default FullPost;
