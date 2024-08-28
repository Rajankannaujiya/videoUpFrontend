
import Avatar from "./common/Avatar";



interface FullPostCompProps{
  type?:string;
  title:string;
  video_url?:string;
  image_url?:string;
  duration?:string;
  description:string;
  publishedDate:string;
  updatedDate:string;
  username:string
}
function FullPostComp({video_url,title,description,image_url,username,publishedDate,updatedDate}:FullPostCompProps) {

  return (
 
         <div className="p-4 border-b  pb-4 w-ful object-cover mt-16 cursor-pointer">
          <div className="m-2 pb-2 font-semibold">
            Author
          </div>
          <div className="flex mb-2">
            <div className="pr-2 ">
              <Avatar name={username}/>
            </div>
            <div className="pr-2  mr-1 mt-2 font-bold font-sans ">
              {username}
            </div>
          </div>
          <div className="flex mb-2" >
          <div className="pr-2  mr-1">
            {publishedDate}
          </div>
          <div className="pr-2 mr-1">
            {updatedDate}
          </div>
          </div>
          <div className="text-lg font-semibold text-gray-800 mb-2">
        {title}
    </div>
      <div className="overflow-hidden rounded object-cover mb-4">
       {video_url && <div>
       <video 
            src={video_url}
            className="max-w-full max-h-[500px] lg:w-[1200px] lg:h-[600px] md:w-[600px] md:h-[400px]  rounded hover:shadow-xl transition-shadow duration-300" 
            autoPlay  
            controls 
        />
     
        </div>
}
      { image_url && <div>
          <img src={image_url} alt="image"  className=" max-w-full max-h-[500px] lg:w-[1200px] lg:h-[600px] md:w-[600px] md:h-[400px] w-fullrounded hover:shadow-xl transition-shadow duration-300"  />
        </div>
}
    </div>
    <div className="text-gray-600 text-md leading-relaxed">
     {(description.length)>100?description.slice(0, 100) + "...":description}
    </div>
  </div>
  )
}

export default FullPostComp