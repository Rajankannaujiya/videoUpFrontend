import { Link } from "react-router-dom";
import Avatar from "./common/Avatar";

interface VideoCompProps {
  id: string;
  type?: string;
  title: string;
  videoUrl?: string;
  imageUrl?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  username: string;
}

function PostComp({
  id,
  title,
  type,
  username,
  videoUrl,
  imageUrl,
  description,
  createdAt,
  updatedAt,
}: VideoCompProps) {
  console.log("this is", id, title, description, type, imageUrl);
  return (
    <Link to={`/post/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex flex-col">
          <div className="flex">
            <div>
              <Avatar name="AuthorName" />
            </div>

            <div className="m-2 pb-2.5 font-serif font-semibold">
              {username}
            </div>
          </div>

          <div className="flex sm:flex-col">
            <div className="p-1 sm:flex">
              <div className="mb-2 p-2 flex font-light">Uploaded at: </div>
              <p className="mb-2 p-2 font-extralight">
                {new Date(updatedAt).toLocaleDateString()}
              </p>
              <div className="mb-2 p-2 flex font-light">Uploaded Time: </div>
              <p className="mb-2 p-2 font-extralight">
                {new Date(updatedAt).toLocaleTimeString()}
              </p>
            </div>

            <div className=" mb-4 p-1 sm:flex">
              <div className="mb-2 p-2 font-light">Created at: </div>
              <p className="mb-2 p-2 font-extralight">
                {new Date(createdAt).toLocaleDateString()}
              </p>
              <div className="mb-2 p-2 font-light">Created at: </div>
              <p className="mb-2 p-2 font-extralight">
                {new Date(createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
        <div className="text-lg font-semibold text-gray-800 mb-2">{title}</div>
        <div className="overflow-hidden rounded w-full mb-4">
          {type === "video" && videoUrl && (
            <video
              src={videoUrl}
              className="w-full h-[400px] object-fit rounded hover:shadow-xl transition-shadow duration-300"
              autoPlay
              controls
            />
          )}

          {type === "image" && imageUrl && (
            <img
              src={imageUrl}
              className="w-full h-[400px] object-fit rounded hover:shadow-xl transition-shadow duration-300"
            />
          )}
        </div>
     
        <div className="text-gray-600 text-md leading-relaxed font-medium">
          {description.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </div>
      </div>
    </Link>
  );
}

export default PostComp;
