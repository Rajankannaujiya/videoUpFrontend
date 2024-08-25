import { useState } from "react";
import Alert from "./common/Alert";
import Button from "./common/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isRefresh } from "../state/userRecoil";


interface MyPostComp {
  id: string;
  type: string;
  title: string;
  videoUrl?: string;
  imageUrl?: string;
  description: string;
}

function MyPostComp({
  id,
  type,
  title,
  videoUrl,
  imageUrl,
  description,
}: MyPostComp) {


  const [isClicked, setIsClicked] = useState<boolean>(false);

  const [refreshPage, setRefreshPage] = useRecoilState(isRefresh);

  if (refreshPage) {
    // Refresh the page or re-render the component
    window.location.reload();
    console.log("I got refresh")
    // or
    setRefreshPage(false); // reset the state
  }



  const navigate= useNavigate();

  function handleImageDelete(){
    setIsClicked(!isClicked)
  }



  function handleClick(){
    setIsClicked(!isClicked)
  }



  function handleVideoDelete() {

    try {
      console.log("hii there");
    } catch (error) {
      <Alert
        textColor={"orange"}
        alertType={"warning"}
        alertContent={"something went wrong please try again later"}
      />;
    } finally {
      setIsClicked(false);
    }
  }

  return (
    <div className="z-10 max-w-screen-sm w-full bg-slate-100 m-4 p-4  rounded-sm border-2 shadow-sm sm:flex-col sm:m-2">
      <div className="flex justify-between">
        <div className="text-lg font-semibold text-gray-800 mb-2 m-6">
          {title}
        </div>
        <div className="z-0 relative">
        <svg 
        onClick={handleClick} // Toggle state on click
        className="mb-2 m-6 w-6 h-6 text-gray-800 cursor-pointer"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 8"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
        />
      </svg>

      {/* Conditionally render the button */}
      {isClicked && (
        <div className="absolute  bg-white shadow-md rounded-md">
          <Button buttonFor={"Update"} colour={"gray"} onClick={()=>{
            setRefreshPage(!isRefresh)
            navigate(`/update/${id}`)
          }} />
          <Button buttonFor={"Delete"} colour={"red"} onClick={type === "video"? handleVideoDelete:handleImageDelete }/>
        </div>
      )}
        </div>
      </div>
      <div className="overflow-hidden rounded w-full mb-4">
        {type === "video" && videoUrl && (
          <video
            src={videoUrl}
            className="w-full sm:h-[400px] h-[250px] object-fit rounded hover:shadow-xl transition-shadow duration-300"
            autoPlay
            controls
          />
        )}

        {type === "image" && imageUrl && (
          <img
            src={imageUrl}
            className="w-full sm:h-[400px] h-[300px] object-fit rounded hover:shadow-xl transition-shadow duration-300"
          />
        )}
      </div>
      <div className="text-gray-600 text-md leading-relaxed font-medium">
        {description.length > 100
          ? description.slice(0, 100) + "..."
          : description}
      </div>
    </div>
  );
}

export default MyPostComp;
